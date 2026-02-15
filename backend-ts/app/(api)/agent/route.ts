import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem';
import { monadTestnet } from 'viem/chains';
import { MONACLAW_AGENT_REGISTRY_ABI, MONACLAW_AGENT_REGISTRY_ADDRESS } from './constants';
import { GoogleGenerativeAI } from '@google/generative-ai';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { agentId, input } = body;

    if (!agentId) {
      return NextResponse.json({ error: 'agentId is required' }, { status: 400, headers: corsHeaders });
    }

    console.log(`🤖 Monaclaw: Processing request for agent #${agentId}`);

    // 1. Fetch Agent from Blockchain
    const publicClient = createPublicClient({
      chain: monadTestnet,
      transport: http(process.env.VITE_PUBLIC_MONAD_RPC_URL)
    });

    console.log(`🔗 Looking up agent metadata on-chain...`);
    const agentData = await publicClient.readContract({
      address: MONACLAW_AGENT_REGISTRY_ADDRESS,
      abi: MONACLAW_AGENT_REGISTRY_ABI,
      functionName: 'getAgent',
      args: [BigInt(agentId)]
    }) as any;

    if (!agentData || !agentData.isActive) {
      return NextResponse.json({ error: 'Agent not found or inactive' }, { status: 404, headers: corsHeaders });
    }

    // 2. Fetch Description from IPFS
    let metadataURI = agentData.metadataURI;
    const IPFS_GATEWAY = "https://gateway.pinata.cloud/ipfs/";

    if (metadataURI.startsWith('ipfs://')) {
      metadataURI = metadataURI.replace('ipfs://', IPFS_GATEWAY);
    }

    console.log(`🌐 Fetching agent metadata from IPFS: ${metadataURI}`);
    const metaResponse = await fetch(metadataURI);
    if (!metaResponse.ok) {
      throw new Error(`Failed to fetch metadata from IPFS: ${metaResponse.statusText}`);
    }
    const metadata = await metaResponse.json();

    const agentStrategy = metadata.strategy || metadata.readme || "You are a helpful assistant.";
    console.log(`📝 Strategy/Instructions: "${agentStrategy.substring(0, 50)}..."`);

    // 3. Execute logic (Using Gemini as the engine)
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        message: `Missing API key`,
      }, { status: 500, headers: corsHeaders });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    console.log(`🧠 Executing agent logic with Gemini...`);

    const prompt = `
      You are an AI Agent running on Monaclaw.
      Your task is to execute based on your official strategy.
      
      AGENT STRATEGY:
      "${agentStrategy}"
      
      USER INPUT:
      "${input}"
      
      Perform the task exactly as described in your strategy. Return ONLY the direct result. 
      No conversational filler, no explanations. Just the output.
    `;

    const result = await model.generateContent(prompt);
    const resultOutput = result.response.text().trim();

    console.log(`✨ Agent Output: ${resultOutput.substring(0, 50)}...`);

    return NextResponse.json({
      success: true,
      message: `Agent #${agentId} processed via Gemini AI`,
      data: {
        timestamp: new Date().toISOString(),
        output: resultOutput,
        strategyUsed: agentStrategy,
      }
    }, { headers: corsHeaders });

  } catch (error: any) {
    console.error('Agent Processing error:', error);
    return NextResponse.json(
      { error: `Failed to process agent: ${error.message}` },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Monaclaw Agent Processing API Ready" }, { headers: corsHeaders });
}

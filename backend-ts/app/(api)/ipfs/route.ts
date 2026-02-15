import { NextRequest, NextResponse } from 'next/server';

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_API_KEY;

if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
  console.warn('Pinata API keys not configured. IPFS uploads will fail.');
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, pinata_api_key, pinata_secret_api_key',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const avatar = formData.get('avatar') as File | null;
    const metadataStr = formData.get('metadata') as string | null;
    const readme = formData.get('readme') as string | null;

    if (!metadataStr) {
      return NextResponse.json({ error: 'Metadata is required' }, { status: 400, headers: corsHeaders });
    }

    const agentMetadata = JSON.parse(metadataStr);
    let imageIpfsUrl = '';

    // 1. Pin Image if present
    if (avatar) {
      const imageFormData = new FormData();
      imageFormData.append('file', avatar);
      imageFormData.append('pinataMetadata', JSON.stringify({ name: `Avatar - ${agentMetadata.agentName || 'Agent'}` }));

      const pinataImageResponse = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          'pinata_api_key': PINATA_API_KEY!,
          'pinata_secret_api_key': PINATA_SECRET_KEY!,
        },
        body: imageFormData,
      });

      if (!pinataImageResponse.ok) {
        const errorData = await pinataImageResponse.text();
        console.error('Pinata image pin error:', errorData);
        return NextResponse.json({ error: 'Failed to upload image to IPFS', details: errorData }, { status: 500, headers: corsHeaders });
      }

      const pinataImageData = await pinataImageResponse.json();
      imageIpfsUrl = `ipfs://${pinataImageData.IpfsHash}`;
    }

    // 2. Prepare final metadata
    const finalMetadata = {
      ...agentMetadata,
      image: imageIpfsUrl,
      readme: readme || '',
      version: '1.0.0',
      createdAt: new Date().toISOString(),
    };

    // 3. Pin Metadata JSON
    const pinataJsonResponse = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'pinata_api_key': PINATA_API_KEY!,
        'pinata_secret_api_key': PINATA_SECRET_KEY!,
      },
      body: JSON.stringify({
        pinataContent: finalMetadata,
        pinataMetadata: {
          name: `${agentMetadata.agentName} - Agent Metadata`,
        },
      }),
    });

    if (!pinataJsonResponse.ok) {
      const errorData = await pinataJsonResponse.text();
      console.error('Pinata JSON pin error:', errorData);
      return NextResponse.json({ error: 'Failed to upload metadata to IPFS', details: errorData }, { status: 500, headers: corsHeaders });
    }

    const pinataJsonData = await pinataJsonResponse.json();
    const cid = pinataJsonData.IpfsHash;

    return NextResponse.json({
      success: true,
      cid,
      ipfsUrl: `ipfs://${cid}`,
      gatewayUrl: `https://gateway.pinata.cloud/ipfs/${cid}`,
      metadata: finalMetadata,
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Agent deployment IPFS error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405, headers: corsHeaders });
}
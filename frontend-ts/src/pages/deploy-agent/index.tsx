import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload,ChevronDown, Pencil } from "lucide-react";

// --- UI Components (Assumed standard Shadcn/Tailwind) ---
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

// --- Schema Definition ---
// Using strings instead of enums as requested
const formSchema = z.object({
  // Step 1: User Information
  agentName: z.string().min(1, { message: "Agent Name is required" }),
  tokenSymbol: z.string().min(2, { message: "Symbol must be 2+ chars" }).max(10, "Symbol too long"),
  strategyType: z.string().min(1, { message: "Select a strategy type" }),
  avatar: z.any().optional(), // We'll handle the file object manually

  // Step 2: Agent Setup
  tradingGoal: z.string().min(1, { message: "Select a trading goal" }),
  strategyDescription: z.string().min(10, { message: "Description must be at least 10 chars" }),
  riskLevel: z.string().min(1, { message: "Select a risk level" }),
  tradingInterval: z.string().min(1, { message: "Required" }),
  minPosition: z.string().min(1, { message: "Required" }), // Keeping as string for input, parse later if needed
  profitTarget: z.string().min(1, { message: "Required" }),
  stopLoss: z.string().min(1, { message: "Required" }),
});

export default function DeployAgentPage() {
  const [currentTab, setCurrentTab] = useState(0);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agentName: "",
      tokenSymbol: "",
      strategyType: "",
      tradingGoal: "Grow portfolio aggressively", // Default selection
      strategyDescription: "Buy when price breaks resistance & sell when momentum slows",
      riskLevel: "Low",
      tradingInterval: "1h",
      minPosition: "10",
      profitTarget: "40",
      stopLoss: "40",
    },
  });

  // --- Handlers ---

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("avatar", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const nextTab = async () => {
    let valid = false;
    if (currentTab === 0) {
      valid = await form.trigger(["agentName", "tokenSymbol", "strategyType"]);
    } else if (currentTab === 1) {
      valid = await form.trigger([
        "tradingGoal", "strategyDescription", "riskLevel", "tradingInterval", "minPosition", "profitTarget", "stopLoss"
      ]);
    }
    
    if (valid) setCurrentTab((prev) => prev + 1);
  };

  const prevTab = () => setCurrentTab((prev) => prev - 1);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Final Agent Payload:", data);
    alert("Agent deployed! Check console for data.");
    navigate("/dashboard");
  };

  // --- Helper Components for Selection Tiles ---

  const StrategyCard = ({ label, desc, value }: { label: string; desc: string; value: string }) => {
    const isSelected = form.watch("strategyType") === value;
    return (
      <div
        onClick={() => form.setValue("strategyType", value)}
        className={`cursor-pointer p-4 rounded-lg border text-left transition-all ${
          isSelected
            ? "bg-blue-50 border-blue-500 ring-1 ring-blue-500"
            : "bg-blue-50/30 border-blue-100 hover:border-blue-300"
        }`}
      >
        <h4 className={`font-semibold text-sm ${isSelected ? "text-[#007BFF]" : "text-blue-900"}`}>{label}</h4>
        <p className="text-xs text-blue-400 mt-1">{desc}</p>
      </div>
    );
  };

  const RiskCard = ({ label, desc, value }: { label: string; desc: string; value: string }) => {
    const isSelected = form.watch("riskLevel") === value;
    return (
      <div
        onClick={() => form.setValue("riskLevel", value)}
        className={`cursor-pointer p-4 rounded-lg border text-left transition-all ${
          isSelected
            ? "bg-blue-500 border-[#007BFF] text-white"
            : "bg-blue-50 border-blue-200 text-blue-900 hover:bg-blue-100"
        }`}
      >
        <h4 className="font-semibold text-sm">{label}</h4>
        <p className={`text-[10px] mt-1 ${isSelected ? "text-blue-100" : "text-blue-400"}`}>{desc}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-10  text-slate-800">
      <div className="w-full max-w-4xl">
        
        {/* Progress Bar (Optional Visual) */}
        <div className="flex gap-2 mb-8 w-32">
            <div className={`h-1 flex-1 rounded-full ${currentTab >= 0 ? "bg-[#007BFF]" : "bg-gray-200"}`}></div>
            <div className={`h-1 flex-1 rounded-full ${currentTab >= 1 ? "bg-[#007BFF]" : "bg-gray-200"}`}></div>
            <div className={`h-1 flex-1 rounded-full ${currentTab >= 2 ? "bg-[#007BFF]" : "bg-gray-200"}`}></div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            
            {/* --- STEP 1: USER INFORMATION --- */}
            {currentTab === 0 && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div>
                  <h1 className="text-3xl font-medium text-slate-900 mb-2">Create Agents</h1>
                  <h2 className="text-lg font-semibold text-slate-700">User Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {/* Left Column: Inputs */}
                  <div className="md:col-span-2 space-y-6">
                    <FormField
                      control={form.control}
                      name="agentName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-500">Agent Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g , CryptoBeast" className="rounded-xl border-gray-200 bg-gray-50/50" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tokenSymbol"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-500">Token Symbol (2-10 chars)</FormLabel>
                          <FormControl>
                            <Input placeholder="$ Pepes" className="rounded-xl border-gray-200 bg-gray-50/50" {...field} />
                          </FormControl>
                          <div className="text-xs text-gray-400">This will be your agent's token on Monad (Deployed via Nad. fun)</div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <FormLabel className="text-gray-500 uppercase text-xs font-bold mb-4 block">STRATEGY TYPE</FormLabel>
                      <div className="grid grid-cols-2 gap-4">
                        <StrategyCard label="Crypto" desc="Blockchain & Crypto market" value="Crypto" />
                        <StrategyCard label="Politics" desc="Election & government policy" value="Politics" />
                        <StrategyCard label="Technology" desc="Technology and trends" value="Technology" />
                        <StrategyCard label="Entertainment" desc="Pop culture & Media" value="Entertainment" />
                        <StrategyCard label="Memes" desc="Vibes and lucrative" value="Memes" />
                      </div>
                      <FormMessage>{form.formState.errors.strategyType?.message}</FormMessage>
                    </div>
                  </div>

                  {/* Right Column: Avatar Upload */}
                  <div className="md:col-span-1">
                    <FormLabel className="text-gray-500 uppercase text-xs mb-2 block">AVATAR (optional)</FormLabel>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-blue-200 rounded-2xl h-64 flex flex-col items-center justify-center text-center p-6 cursor-pointer hover:bg-blue-50 transition-colors relative overflow-hidden"
                    >
                      {avatarPreview ? (
                         <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                      ) : (
                        <>
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-500">
                             <Upload size={20} />
                          </div>
                          <p className="text-xs text-gray-500">upload an avatar for your agent<br/>png, jpg, max 5mb.</p>
                        </>
                      )}
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/png, image/jpeg" 
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="button" onClick={nextTab} className="bg-[#007BFF] hover:bg-blue-700 text-white rounded-xl px-8 py-6">
                    Continue
                  </Button>
                  <Button type="button" variant="outline" className="rounded-xl px-8 py-6 border-gray-200 text-gray-600">
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* --- STEP 2: AGENT SETUP --- */}
            {currentTab === 1 && (
              <div className="space-y-8 animate-in fade-in duration-500">
                 <div>
                  <h1 className="text-3xl font-medium text-slate-900 mb-6">Agent Setup</h1>
                  <h2 className="text-lg font-bold text-slate-700 mb-4">Trading Configuration</h2>
                </div>

                {/* Trading Goal */}
                <FormField
                  control={form.control}
                  name="tradingGoal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-500">What's Your Trading Goal?</FormLabel>
                      <div className="flex flex-wrap gap-3 mt-2">
                         {["Grow portfolio aggressively", "Test strategies", "Steady passive income"].map((goal) => (
                           <button
                             key={goal}
                             type="button"
                             onClick={() => field.onChange(goal)}
                             className={`px-4 py-2 rounded-full text-sm border flex items-center gap-2 transition-all ${
                               field.value === goal 
                               ? "bg-[#007BFF] text-white border-[#007BFF]" 
                               : "bg-white text-gray-500 border-gray-200 hover:border-blue-300"
                             }`}
                           >
                             <div className={`w-2 h-2 rounded-full ${field.value === goal ? "bg-white" : "bg-gray-300"}`}></div>
                             {goal}
                           </button>
                         ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Strategy Description */}
                <FormField
                  control={form.control}
                  name="strategyDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-500">Choose your strategy</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Textarea 
                            className="pr-10 pt-4 rounded-xl border-gray-200 bg-white min-h-15 resize-none flex items-center" 
                            {...field} 
                          />
                          <div className="absolute right-3 top-3 text-blue-500 p-1 bg-blue-50 rounded-md">
                            <Pencil size={14} />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Risk Level */}
                <div className="space-y-3">
                   <FormLabel className="text-gray-800 font-semibold text-lg">Risk Level</FormLabel>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <RiskCard label="Low" desc="Conversion 75%. Max 3 position" value="Low" />
                      <RiskCard label="Medium" desc="Conversion 60%. Max 5 position" value="Medium" />
                      <RiskCard label="High" desc="Aggressively 50% min valid." value="High" />
                   </div>
                </div>

                {/* Numeric Inputs Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                   <FormField
                      control={form.control}
                      name="tradingInterval"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase text-gray-500 font-bold">TRADING INTERVAL</FormLabel>
                          <FormControl>
                             <div className="relative">
                               <Input {...field} className="bg-blue-50/50 border-blue-100 text-slate-700" />
                               <ChevronDown className="absolute right-3 top-3 text-gray-400 w-4 h-4" />
                             </div>
                          </FormControl>
                        </FormItem>
                      )}
                   />
                   <FormField
                      control={form.control}
                      name="minPosition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase text-gray-500 font-bold">MIN POSITION (USDC)</FormLabel>
                          <FormControl>
                             <Input {...field} className="bg-blue-50/50 border-blue-100 text-slate-700" />
                          </FormControl>
                        </FormItem>
                      )}
                   />
                   <FormField
                      control={form.control}
                      name="profitTarget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase text-gray-500 font-bold">PROFIT</FormLabel>
                          <FormControl>
                             <Input {...field} className="bg-white border-gray-200 text-slate-700" />
                          </FormControl>
                        </FormItem>
                      )}
                   />
                   <FormField
                      control={form.control}
                      name="stopLoss"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase text-gray-500 font-bold">STOP LOSS</FormLabel>
                          <FormControl>
                             <Input {...field} className="bg-white border-gray-200 text-slate-700" />
                          </FormControl>
                        </FormItem>
                      )}
                   />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="button" onClick={nextTab} className="bg-[#007BFF] hover:bg-blue-700 text-white rounded-xl px-8 py-6">
                    Continue
                  </Button>
                  <Button type="button" onClick={prevTab} variant="outline" className="rounded-xl px-8 py-6 border-gray-200 text-gray-600">
                    Back
                  </Button>
                </div>
              </div>
            )}

            {/* --- STEP 3: SUMMARY --- */}
            {currentTab === 2 && (
              <div className="space-y-8 animate-in fade-in duration-500">
                
                {/* Summary Card */}
                <div className="bg-blue-50/50 rounded-2xl p-8 border border-blue-100">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-6">Agent Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Name</span>
                      <span className="text-[#007BFF] font-medium">{form.getValues("agentName")}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Token</span>
                      <span className="text-[#007BFF] font-medium">{form.getValues("tokenSymbol")}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Strategy</span>
                      <span className="text-[#007BFF] font-medium">{form.getValues("strategyType")}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Risk Level</span>
                      <span className="text-[#007BFF] font-medium">{form.getValues("riskLevel")}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Interval</span>
                      <span className="text-[#007BFF] font-medium">{form.getValues("tradingInterval")}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Max Position</span>
                      <span className="text-[#007BFF] font-medium">{form.getValues("minPosition")}</span>
                    </div>
                  </div>
                </div>

                {/* What Next Box */}
                <div className="bg-blue-50/50 rounded-2xl p-8 border border-blue-100 border-dashed">
                   <h3 className="text-sm font-bold text-gray-700 uppercase mb-4">WHAT NEXT:</h3>
                   <ul className="space-y-3 text-sm text-gray-500">
                     <li>Your agent's token will be deployed on Monad via Nad.Fun</li>
                     <li>A Safe wallet will be created on Polygon for trading</li>
                     <li>You'll get a deposit address to fund your agent</li>
                     <li>Trading starts automatically once funded ($10+ USDC)</li>
                   </ul>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="bg-[#007BFF] hover:bg-blue-700 text-white rounded-xl px-8 py-6 w-32">
                    Continue
                  </Button>
                  <Button type="button" onClick={prevTab} variant="outline" className="rounded-xl px-8 py-6 border-gray-200 text-gray-600 w-32">
                    Back
                  </Button>
                </div>
              </div>
            )}

          </form>
        </Form>
      </div>
    </div>
  );
}
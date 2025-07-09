
"use client"
import * as React from "react"
import { Line, LineChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceLine } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"
import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/glass-card";
import { Gem, Landmark, BrainCircuit, CreditCard, TrendingUp, Target, ShieldCheck, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LambdaXiVONIcon } from "@/components/icons";

const economicPillars = [
    {
        icon: <Gem className="h-8 w-8 text-primary" />,
        title: "Subscription Revenue",
        description: "Predictable, recurring revenue from Pro & Enterprise tiers. The foundational layer of the economy.",
    },
    {
        icon: <BrainCircuit className="h-8 w-8 text-primary" />,
        title: "Usage-Based Revenue",
        description: "Pay-as-you-go billing for AI Agent Actions via ΞCredits. Revenue scales directly with user activity and value delivered.",
    },
    {
        icon: <Landmark className="h-8 w-8 text-primary" />,
        title: "Marketplace Revenue",
        description: "A 15-20% commission on all third-party applications sold through the Armory Marketplace. A growth engine powered by our developer ecosystem.",
    },
    {
        icon: <CreditCard className="h-8 w-8 text-primary" />,
        title: "Financial Services Revenue",
        description: "High-margin transactional revenue, including a non-negotiable 18% Transmutation Tithe on all real-world payments made via the Sovereign's Sigil.",
    }
];

const unitEconomics = [
    {
        icon: <TrendingUp className="h-10 w-10 text-primary" />,
        title: "LTV:CAC Ratio",
        value: "> 5:1",
        note: "Our model demonstrates a path to an exceptionally strong ratio due to high ARPA growth and low-cost viral acquisition channels.",
    },
    {
        icon: <ShieldCheck className="h-10 w-10 text-primary" />,
        title: "CAC Payback Period",
        value: "< 18 Months",
        note: "Our product-led motion and viral loops are engineered to drive this period down significantly as the platform scales.",
    },
    {
        icon: <Target className="h-10 w-10 text-primary" />,
        title: "Monthly Customer Churn",
        value: "< 1.5%",
        note: "Achieved via the Nudge-Lock Engine, which creates extreme product stickiness and makes leaving the ecosystem logistically impractical.",
    },
    {
        icon: <DollarSign className="h-10 w-10 text-primary" />,
        title: "ARPA (Annual)",
        value: "$3.1k ➔ $6.4k+",
        note: "Projected to grow from ~$3,150 (Year 1) to over $6,400 (Year 5). Growth is driven by tier upgrades and increased usage.",
    }
];

const trajectoryData = [
    { month: 0, revenue: 0, ebitda: -2.5 },
    { month: 4, revenue: 0.5, ebitda: -1.5 },
    { month: 8, revenue: 1.2, ebitda: 0.1 },
    { month: 12, revenue: 2.5, ebitda: 0.8 },
    { month: 16, revenue: 4, ebitda: 1.5 },
    { month: 20, revenue: 6, ebitda: 2.4 },
    { month: 24, revenue: 8.8, ebitda: 3.2 },
    { month: 28, revenue: 12, ebitda: 5.8 },
    { month: 32, revenue: 16, ebitda: 9.5 },
    { month: 36, revenue: 22, ebitda: 14.7 },
];

const chartConfig = {
    revenue: { label: "Total Revenue ($M)", color: "hsl(var(--primary))" },
    ebitda: { label: "EBITDA ($M)", color: "hsl(var(--accent))" },
};

function DataRoomDialog() {
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real application, you would handle form submission here.
        // For this prototype, we'll just show the success state.
        setSubmitted(true);
    };

    // Reset form state when dialog is closed
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            // Use a timeout to avoid seeing the form flash before closing
            setTimeout(() => {
                setSubmitted(false);
            }, 300);
        }
    };

    return (
        <Dialog onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button size="lg" className="font-headline text-lg mt-8">[ Request Access to the Data Room ]</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-background/80 backdrop-blur-lg border-primary/20">
                {submitted ? (
                     <div className="text-center py-8">
                        <DialogHeader>
                             <DialogTitle className="font-headline text-glow text-2xl">Request Received</DialogTitle>
                             <DialogDescription className="text-foreground/70 pt-4">
                                Your credentials have been submitted for verification. We will be in contact shortly. The gateway remains open.
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle className="font-headline text-glow text-2xl">Access the Dossier</DialogTitle>
                            <DialogDescription className="text-foreground/70">
                                Provide your credentials to begin the vetting process. Access is restricted to accredited investors and strategic partners.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="grid gap-4 pt-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="text-foreground/80">
                                    Name
                                </Label>
                                <Input id="name" placeholder="John Doe" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="firm" className="text-foreground/80">
                                    Firm
                                </Label>
                                <Input id="firm" placeholder="Sovereign Ventures" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-foreground/80">
                                    Email
                                </Label>
                                <Input id="email" type="email" placeholder="architect@sv.com" required />
                            </div>
                            <Button type="submit" className="w-full font-headline mt-4">Submit Request</Button>
                        </form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default function TreasuryContent() {
  const thesisSection = useScrollAnimation();
  const modelSection = useScrollAnimation();
  const economicsSection = useScrollAnimation();
  const trajectorySection = useScrollAnimation();
  const askSection = useScrollAnimation();
  const gatewaySection = useScrollAnimation();

  return (
    <div className="container mx-auto px-4">
      <PageHeader
        title="The Treasury"
        subtitle="An Invitation to the Engine Room of the Post-SaaS Economy."
      >
        <div className="flex justify-center mt-8">
            <LambdaXiVONIcon className="h-48 w-48 opacity-50 text-primary" />
        </div>
      </PageHeader>

      <section className="py-16" ref={thesisSection.ref}>
        <div className={cn("max-w-4xl mx-auto text-center", thesisSection.isInView ? "animate-fade-in-up" : "opacity-0")}>
          <h2 className="font-headline text-3xl font-semibold md:text-4xl text-glow mb-6">The Convergence: A $200B Market Failure Meets a $52B Technological Shift.</h2>
          <div className="text-lg text-foreground/80 space-y-6">
            <p>
                The modern enterprise is crippled by the "SaaS Paradox"—a chaotic, fragmented ecosystem that results in an average of <span className="text-primary font-bold">$135,000 in wasted annual spending per company</span>. This defines our <span className="text-primary font-bold">Total Addressable Market of $186.97 Billion</span> in global SMB software spending.
            </p>
            <p>
                Simultaneously, the rise of the Agentic Economy, projected to become a <span className="text-primary font-bold">$52.62 Billion market by 2030</span> with a staggering <span className="text-primary font-bold">46.3% CAGR</span>, provides the technological catalyst for a paradigm shift.
            </p>
            <p className="font-bold text-foreground/90">
                ΛΞVON OS is positioned at the precise intersection of this market failure and technological revolution. We are not competing within the broken SaaS market; we are systematically replacing it.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16" ref={modelSection.ref}>
        <div className={cn("max-w-5xl mx-auto", modelSection.isInView ? "animate-fade-in-up" : "opacity-0")}>
            <h2 className="text-center font-headline text-3xl font-semibold md:text-4xl text-glow mb-12">A Self-Reinforcing Economic Engine.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {economicPillars.map((pillar, index) => (
                    <div
                    key={pillar.title}
                    className={cn(modelSection.isInView ? "animate-fade-in-up" : "opacity-0")}
                    style={{ animationDelay: `${200 + index * 150}ms` }}
                    >
                        <GlassCard className="p-8 h-full">
                            <div className="flex items-start gap-4">
                                <div className="mt-1">{pillar.icon}</div>
                                <div>
                                    <h3 className="font-headline text-2xl font-bold mb-2 text-primary">{pillar.title}</h3>
                                    <p className="text-foreground/70">{pillar.description}</p>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                ))}
            </div>
        </div>
      </section>
      
      <section className="py-16" ref={economicsSection.ref}>
        <div className={cn("max-w-6xl mx-auto", economicsSection.isInView ? "animate-fade-in-up" : "opacity-0")}>
            <h2 className="text-center font-headline text-3xl font-semibold md:text-4xl text-glow mb-12">Engineered for Ruthless Efficiency.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {unitEconomics.map((item, index) => (
                    <div 
                        key={item.title} 
                        className={cn(economicsSection.isInView ? "animate-fade-in-up" : "opacity-0")}
                        style={{ animationDelay: `${200 + index * 150}ms` }}
                    >
                        <GlassCard className="p-8 h-full">
                           <div className="flex items-start gap-6">
                                {item.icon}
                                <div className="flex-1">
                                    <h3 className="font-headline text-xl font-bold text-foreground/80">{item.title}</h3>
                                    <p className="font-code text-4xl font-bold text-glow">{item.value}</p>
                                    <p className="text-sm text-foreground/70 mt-4">{item.note}</p>
                                </div>
                           </div>
                        </GlassCard>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <section className="py-16" ref={trajectorySection.ref}>
        <div className={cn("max-w-5xl mx-auto", trajectorySection.isInView ? "animate-fade-in-up" : "opacity-0")}>
            <h2 className="text-center font-headline text-3xl font-semibold md:text-4xl text-glow mb-6">From Burn to Sovereignty in Under 12 Months.</h2>
            <GlassCard className="p-6">
                <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
                  <LineChart data={trajectoryData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis dataKey="month" unit=" mo" tickLine={false} axisLine={false} tickMargin={10} />
                      <YAxis unit="$M" tickLine={false} axisLine={false} tickMargin={10} />
                      <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" name="Total Revenue ($M)" strokeWidth={3} dot={{r: 4, fill: "hsl(var(--background))", stroke: "hsl(var(--primary))"}} />
                      <Line type="monotone" dataKey="ebitda" stroke="var(--color-ebitda)" name="EBITDA ($M)" strokeWidth={2} strokeDasharray="5 5" dot={{r: 4, fill: "hsl(var(--background))", stroke: "hsl(var(--accent))"}} />
                      <ReferenceLine x={8} strokeDasharray="3 3" stroke="hsl(var(--foreground))" label={{ value: "EBITDA Positive", position: "insideTopRight", fill: "hsl(var(--foreground))", className:"text-xs font-headline" }} />
                  </LineChart>
                </ChartContainer>
            </GlassCard>
        </div>
      </section>

      <section className="py-16" ref={askSection.ref}>
        <div className={cn("max-w-4xl mx-auto text-center", askSection.isInView ? "animate-fade-in-up" : "opacity-0")}>
          <h2 className="font-headline text-3xl font-semibold md:text-4xl text-glow mb-6">The Engine is Built. This is the Fuel.</h2>
          <p className="text-lg text-foreground/80">
            We have identified a strategic need for a <span className="text-primary font-bold">Seed/Series A funding round of $25 Million to $40 Million</span>.
          </p>
          <div className="mt-8 text-left text-foreground/80 space-y-4 max-w-2xl mx-auto">
             <p>This is not operational capital; it is acceleration capital. It will be deployed to finance the first 24-36 months of our aggressive go-to-market strategy and achieve three specific milestones:</p>
             <ul className="list-decimal list-inside space-y-2 pl-4">
                <li><span className="font-bold">Win the Developers:</span> Execute our developer-first GTM strategy to build an insurmountable ecosystem moat.</li>
                <li><span className="font-bold">Weaponize the Nudge-Lock Engine:</span> Fully implement and refine the psychological systems designed to drive elite retention and LTV.</li>
                <li><span className="font-bold">Achieve Market Dominance:</span> Fund the programmatic marketing and brand-building necessary to position ΛΞVON OS as the definitive, category-leading solution to the SaaS Paradox.</li>
             </ul>
          </div>
        </div>
      </section>
      
       <section className="text-center py-24" ref={gatewaySection.ref}>
        <div className={cn(gatewaySection.isInView ? "animate-fade-in-up" : "opacity-0")}>
            <GlassCard className="max-w-3xl mx-auto p-8 md:p-12 animate-glow-primary">
                <h2 className="font-headline text-3xl font-semibold md:text-4xl text-glow">The Dossier.</h2>
                <p className="mt-4 text-lg text-foreground/80 mb-6 max-w-2xl mx-auto">
                    Detailed financial models, go-to-market plans, and technical architecture documents are available for accredited investors and partners.
                </p>
                <DataRoomDialog />
            </GlassCard>
        </div>
      </section>

    </div>
  );

    




import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/glass-card";
import { ArrowRight } from "lucide-react";
import { 
  BeepSigil, 
  LoomSigil, 
  AegisSigil, 
  KlepsydraSigil, 
  MicroAppsSigil, 
  PantheonSigil, 
  ArmorySigil, 
  ObeliskMarketplaceSigil 
} from "@/components/AethericSigils";


const components = [
  {
    icon: <BeepSigil className="h-16 w-16" />,
    name: "BEEP",
    description: "The command core. Your loyal priesthood. BEEP translates your intent into action, orchestrating the OS through natural language.",
  },
  {
    icon: <MicroAppsSigil className="h-16 w-16" />,
    name: "Micro-Apps",
    description: "Atomic units of utility. Summoned spirits. These are not static applications but on-demand tools manifested to perform specific tasks.",
  },
  {
    icon: <LoomSigil className="h-16 w-16" />,
    name: "Loom Studio",
    description: "The Architect's Sanctum. The forge. A powerful interface to design, observe, and debug the complex workflows that power your autonomous agents.",
  },
  {
    icon: <AegisSigil className="h-16 w-16" />,
    name: "Aegis",
    description: "Your always-on bodyguard. A vigilant security layer providing brainless, enterprise-grade protection for your entire digital domain.",
  },
  {
    icon: <KlepsydraSigil className="h-16 w-16" />,
    name: "KLEPSYDRA Engine",
    description: "The economic heart. The abacus of fates. It governs the flow of resources and transforms work into a compelling, strategic endeavor.",
  },
  {
    icon: <ArmorySigil className="h-16 w-16" />,
    name: "ΛΞVON Armory Marketplace",
    description: "The sanctified repository for Micro-Apps and Chaos Cards.",
  },
  {
    icon: <ObeliskMarketplaceSigil className="h-16 w-16" />,
    name: "Obelisk Marketplace",
    description: "The vault of manifested sovereignty for real-world asset transmutation.",
  }
];

export default function PantheonPage() {
  return (
    <div className="container mx-auto px-4">
      <PageHeader
        title="The Pantheon"
        subtitle="Behold the instruments of your new domain. The old world is a maze of disparate tools. The Pantheon presents a unified vision, unveiling each instrument of sovereignty to show you the whole machine."
      />
      <div className="flex justify-center mb-16">
        <PantheonSigil className="h-48 w-48"/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-16 perspective-container">
        {components.map((component) => (
          <GlassCard key={component.name} className="flex flex-col p-8">
            <div className="flex justify-center mb-6 h-16 w-16 mx-auto">
                {component.icon}
            </div>
            <h3 className="font-headline text-2xl font-bold text-center mb-3 text-glow">{component.name}</h3>
            <p className="text-foreground/70 text-center flex-grow mb-6">{component.description}</p>
            <Link href="/docs" className="inline-flex items-center justify-center text-accent font-bold group mt-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
              <span className="transition-all group-hover:text-glow">Consult the Scriptorium</span>
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

import { useState } from "react";
import { ArrowUpRight, Fingerprint, Globe2, Mail, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const signals = [
  { icon: Mail, label: "Message", detail: "Urgent request", title: "Pressure to act quickly", body: "An unexpected deadline can be a warning sign. Verify the request through a trusted channel." },
  { icon: Globe2, label: "Domain", detail: "Lookalike address", title: "A familiar name. An unfamiliar address.", body: "Small spelling changes can disguise an untrusted sender. Check the full address, not just the display name." },
  { icon: Fingerprint, label: "Identity", detail: "Credential request", title: "A request that deserves a second look", body: "Never share passwords through an unsolicited message. Go directly to the provider’s official website." },
];

export function IntelligenceVisual() {
  const [active, setActive] = useState(0);
  const selected = signals[active];
  return <div className="cy-intelligence" aria-label="Illustrative security signal analysis">
    <div className="flex items-center justify-between border-b border-cy-line pb-4 font-mono text-[10px] uppercase text-cy-mute"><span>Signal → Context → Decision</span><span className="text-cy-signal">Illustrative analysis</span></div>
    <div className="cy-map">
      <svg className="cy-map-lines" viewBox="0 0 500 280" preserveAspectRatio="none" aria-hidden="true">
        <path d="M80 50H170Q190 50 190 70V120Q190 140 210 140H250M80 140H250M80 230H170Q190 230 190 210V160Q190 140 210 140M290 140H420" />
        <path className="cy-moving-line" d="M80 140H420" />
        <circle cx="270" cy="140" r="76" className="cy-map-ring"/><circle cx="270" cy="140" r="100" className="cy-map-ring"/>
      </svg>
      <div className="cy-signal-list">{signals.map((s, i) => <Button key={s.label} variant="ghost" onClick={() => setActive(i)} aria-pressed={active === i} className={`cy-signal-node ${active === i ? "cy-node-active" : ""}`}><s.icon size={15}/><span>{s.label}<small>{s.detail}</small></span></Button>)}</div>
      <div className="cy-core"><Search size={24} strokeWidth={1.3}/><span>CYVANCE</span><small>INTELLIGENCE</small></div>
      <div className="cy-output"><span className="h-1.5 w-1.5 rounded-full bg-cy-aqua"/><span>Clearer<br/>next steps</span><ArrowUpRight size={16}/></div>
    </div>
    <div className="cy-insight" key={active}><span className="font-mono text-[10px] uppercase text-cy-signal">Finding 0{active + 1} / 03</span><h3 className="mt-2 text-base font-medium">{selected.title}</h3><p className="mt-2 text-sm leading-relaxed text-cy-mute">{selected.body}</p></div>
  </div>;
}
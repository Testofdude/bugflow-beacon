import { useState } from "react";
import { ArrowRight, Check, ChevronRight, FileText, Link2, Mail, ScanLine, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

const examples = {
  message: { sender: "billing-support@acc0unt-verify.example", subject: "Action required: account verification", text: "Your account will be suspended in 24 hours. Confirm your password at the link below to avoid interruption.", findings: ["Lookalike sender domain", "Artificial urgency", "Request for credentials"], recommendation: "Do not follow the link. Verify the request through the provider’s official website." },
  url: { sender: "https://secure-acc0unt.example/verify", subject: "An address worth checking", text: "A link styled as an account verification page. The domain contains a character substitution and does not establish a trusted relationship with the provider.", findings: ["Character substitution", "Unverified destination", "Account-verification pretext"], recommendation: "Navigate to the known official address yourself. Do not enter credentials on this page." },
};

export function SecurityDemo() {
  const [mode, setMode] = useState<"message" | "url">("message");
  const [tab, setTab] = useState<"findings" | "steps">("findings");
  const data = examples[mode];
  return <div className="cy-demo overflow-hidden rounded-lg border border-cy-line bg-cy-night text-cy-text">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cy-line px-5 py-4"><div className="flex items-center gap-2 text-sm font-medium"><ScanLine size={17} className="text-cy-signal"/>Sentinel <span className="text-cy-mute">/ Analysis workspace</span></div><span className="font-mono text-[10px] uppercase text-cy-mute">Concept demonstration</span></div>
    <div className="grid md:grid-cols-[1fr_1.05fr]">
      <div className="border-b border-cy-line p-5 md:border-b-0 md:border-r sm:p-7">
        <div role="group" aria-label="Example type" className="flex gap-1 border-b border-cy-line pb-4">{(["message", "url"] as const).map(m => <Button key={m} variant="ghost" size="sm" aria-pressed={mode === m} onClick={() => setMode(m)} className={`cy-demo-tab ${mode === m ? "cy-tab-active" : ""}`}>{m === "message" ? <Mail/> : <Link2/>}{m === "message" ? "Message example" : "URL example"}</Button>)}</div>
        <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase text-cy-mute"><FileText size={13}/>Sample input · fictional data</div>
        <p className="mt-5 break-all font-mono text-xs text-cy-signal">{data.sender}</p><h4 className="mt-4 text-base font-medium">{data.subject}</h4><p className="mt-4 text-sm leading-7 text-cy-mute">{data.text}</p>
        <div className="mt-7 flex items-center gap-2 border-t border-cy-line pt-4 text-xs text-cy-mute"><Check size={13} className="text-cy-aqua"/>Sample loaded <ArrowRight size={13} className="ml-auto"/></div>
      </div>
      <div className="p-5 sm:p-7">
        <div className="flex items-center gap-2 text-xs text-cy-caution"><TriangleAlert size={15}/>Needs closer review</div><h4 className="mt-3 text-xl font-medium">From warning signs to context.</h4>
        <div role="group" aria-label="Analysis view" className="mt-5 flex gap-5 border-b border-cy-line">{(["findings", "steps"] as const).map(t => <Button key={t} variant="ghost" size="sm" aria-pressed={tab === t} onClick={() => setTab(t)} className={`cy-result-tab ${tab === t ? "cy-result-active" : ""}`}>{t === "findings" ? "Warning signs" : "Recommended action"}</Button>)}</div>
        <div className="cy-results" aria-live="polite" key={`${mode}-${tab}`}>{tab === "findings" ? <ol>{data.findings.map((f, i) => <li className="flex items-center gap-3 border-b border-cy-line py-5 text-sm" key={f}><span className="font-mono text-[10px] text-cy-mute">0{i+1}</span>{f}<ChevronRight size={14} className="ml-auto text-cy-mute"/></li>)}</ol> : <div className="py-6"><span className="font-mono text-[10px] uppercase text-cy-aqua">Verify independently</span><p className="mt-3 text-sm leading-7">{data.recommendation}</p><p className="mt-4 text-xs leading-relaxed text-cy-mute">A warning sign is not proof of malicious activity. Context and independent verification matter.</p></div>}</div>
      </div>
    </div>
    <div className="border-t border-cy-line px-5 py-3 text-[11px] leading-relaxed text-cy-mute">Illustrative concept only. Sentinel is in development; this preview does not analyze submitted content or provide live threat detection.</div>
  </div>;
}
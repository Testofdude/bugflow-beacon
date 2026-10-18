import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const interests = ["Security Risk Assessment", "Threat Intelligence", "Security Awareness", "Security Consulting", "Cyvance Products", "General Enquiry"];

const schema = z.object({
  full_name: z.string().trim().min(1, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  company: z.string().trim().max(160).optional(),
  interest: z.enum(interests as [string, ...string[]], { errorMap: () => ({ message: "Please choose an area of interest" }) }),
  message: z.string().trim().min(10, "Please write at least 10 characters").max(4000),
});

const field = "mt-2 w-full rounded-md border border-cy-paperline bg-transparent px-3.5 py-3 text-[15px] text-cy-paperink outline-none transition-colors placeholder:text-cy-papermute/60 focus:border-cy-paperink focus:ring-2 focus:ring-cy-signal/30";

export const ContactForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("website")) return; // honeypot
    const raw = Object.fromEntries(fd) as Record<string, string>;
    const parsed = schema.safeParse({ ...raw, company: raw.company || undefined });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as string] ??= i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    const d = parsed.data;
    const { error } = await supabase.from("contact_enquiries").insert({ full_name: d.full_name, email: d.email, company: d.company ?? null, interest: d.interest, message: d.message });
    if (error) return setStatus("error");
    setStatus("sent");
    (e.target as HTMLFormElement).reset();
  };

  if (status === "sent")
    return (
      <div role="status" className="rounded-lg border border-cy-paperline p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cy-signal">Enquiry received</p>
        <p className="mt-3 text-xl font-medium text-cy-paperink">Thank you — your message has been submitted.</p>
        <p className="mt-2 text-cy-papermute">We'll review your enquiry and reply to the email address you provided.</p>
        <Button variant="link" onClick={() => setStatus("idle")} className="mt-6 p-0 text-cy-paperink">Send another enquiry</Button>
      </div>
    );

  const Err = ({ n }: { n: string }) => (errors[n] ? <p id={`${n}-err`} className="mt-1.5 text-sm text-destructive">{errors[n]}</p> : null);
  const aria = (n: string) => ({ "aria-invalid": !!errors[n], "aria-describedby": errors[n] ? `${n}-err` : undefined });

  return (
    <form onSubmit={submit} noValidate className="grid gap-6 sm:grid-cols-2">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label className="text-sm font-medium text-cy-paperink">Full name *<input name="full_name" autoComplete="name" className={field} {...aria("full_name")} /><Err n="full_name" /></label>
      <label className="text-sm font-medium text-cy-paperink">Business email *<input name="email" type="email" autoComplete="email" className={field} {...aria("email")} /><Err n="email" /></label>
      <label className="text-sm font-medium text-cy-paperink">Company or organization<input name="company" autoComplete="organization" className={field} /></label>
      <label className="text-sm font-medium text-cy-paperink">Area of interest *
        <select name="interest" defaultValue="" className={field} {...aria("interest")}>
          <option value="" disabled>Select an option</option>
          {interests.map((i) => <option key={i}>{i}</option>)}
        </select><Err n="interest" />
      </label>
      <label className="text-sm font-medium text-cy-paperink sm:col-span-2">Message *<textarea name="message" rows={5} className={field} {...aria("message")} /><Err n="message" /></label>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-xs leading-relaxed text-cy-papermute">We use the information you submit only to understand and respond to your enquiry. See our <a href="/privacy" className="underline underline-offset-2">Privacy Policy</a>.</p>
        <Button type="submit" variant="sitePaper" disabled={status === "sending"} className="group h-12 px-6">
          {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />} {status === "sending" ? "Sending…" : "Send enquiry"}{status !== "sending" && <ArrowRight className="transition-transform group-hover:translate-x-1"/>}
        </Button>
      </div>
      {status === "error" && <p role="alert" className="text-sm text-destructive sm:col-span-2">Your enquiry could not be sent. Please try again in a moment.</p>}
    </form>
  );
};

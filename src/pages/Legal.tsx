import { useEffect } from "react";
import { Nav, Footer } from "@/components/site/SiteChrome";

const content = {
  privacy: {
    title: "Privacy Policy",
    sections: [
      ["Information we collect", "When you submit the contact form, we collect your name, email address, organization (if provided), area of interest, and message."],
      ["How we use it", "We use this information only to understand and respond to your enquiry. We do not sell your information."],
      ["Retention and requests", "Enquiries are stored securely. To request access to or deletion of your information, reply to any message from us."],
    ],
  },
  terms: {
    title: "Terms of Use",
    sections: [
      ["Use of this website", "This website provides general information about Cyvance Security and its services. It is not professional security advice for your specific circumstances."],
      ["Products in development", "Products described as in development or exploratory are not available and may change or not be released."],
      ["Changes", "These terms may be updated before publication and over time."],
    ],
  },
};

const Legal = ({ kind }: { kind: "privacy" | "terms" }) => {
  const c = content[kind];
  useEffect(() => { document.title = `${c.title} | Cyvance Security`; window.scrollTo(0, 0); }, [c.title]);
  return (
    <div className="cy-site min-h-screen bg-cy-ink text-cy-text">
      <Nav />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-36">
        <p className="inline-block rounded-full border border-cy-signal/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-cy-signal">Draft — pending legal review</p>
        <h1 className="mt-6 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{c.title}</h1>
        <div className="mt-12 space-y-10">
          {c.sections.map(([h, p]) => (
            <section key={h} className="border-t border-cy-line pt-6">
              <h2 className="text-lg font-medium">{h}</h2>
              <p className="mt-3 leading-relaxed text-cy-mute">{p}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Legal;

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
const logoUrl = "/cyvance-logo.png";

export const Logo = () => <Link to="/" className="cy-logo flex items-center gap-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cy-signal" aria-label="Cyvance Security home"><img src={logoUrl} width="44" height="44" alt="" className="h-11 w-11 object-contain"/><span className="cy-wordmark text-sm text-cy-text">CYVANCE<small>SECURITY</small></span></Link>;
const links = [{ href: "/#services", label: "Solutions", id: "services" }, { href: "/#products", label: "Technology", id: "products" }, { href: "/#about", label: "Company", id: "about" }];
export const CtaLink = ({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "ghost" | "paper" }) => <Button asChild variant={variant === "primary" ? "site" : variant === "paper" ? "sitePaper" : "siteOutline"} className="group h-12 px-5"><a href={href}>{children}<ArrowRight className="transition-transform duration-200 group-hover:translate-x-1"/></a></Button>;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const location = useLocation();
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const f = () => {
      setScrolled(window.scrollY > 16);
      const visual = document.querySelector<HTMLElement>(".cy-hero-visual");
      if (visual && !reduceMotion) visual.style.translate = `0 ${Math.min(window.scrollY, 600) * 0.06}px`;
    };
    f(); window.addEventListener("scroll", f, { passive: true });
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) setActive(e.target.id); }), { rootMargin: "-20% 0px -55% 0px" });
    ["top", "services", "products", "about", "contact"].forEach(id => { const node = document.getElementById(id); if(node) observer.observe(node); });
    return () => { window.removeEventListener("scroll", f); observer.disconnect(); };
  }, [location.pathname]);
  useEffect(() => { if(!open) return; const close = (e: KeyboardEvent) => { if(e.key === "Escape") setOpen(false); }; window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, [open]);
  return <header className={`cy-header fixed inset-x-0 top-0 z-50 ${scrolled || open ? "cy-header-solid" : ""}`}><nav className="cy-container flex h-20 items-center justify-between gap-5" aria-label="Main"><Logo/><ul className="hidden items-center gap-9 md:flex">{links.map(l => <li key={l.id}><a href={l.href} className={`cy-navlink ${active === l.id ? "cy-nav-active" : ""}`} aria-current={active === l.id ? "location" : undefined}>{l.label}</a></li>)}</ul><div className="hidden md:block"><CtaLink href="/#contact" variant="ghost">Talk to our team</CtaLink></div><Button variant="ghost" size="icon" className="text-cy-text hover:bg-cy-surface md:hidden" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>{open ? <X/> : <Menu/>}</Button></nav>{open && <div id="mobile-menu" className="cy-menu border-t border-cy-line bg-cy-ink px-6 pb-6 md:hidden"><ul>{links.map(l => <li key={l.id}><a onClick={() => setOpen(false)} href={l.href} className="cy-navlink block border-b border-cy-line py-5">{l.label}</a></li>)}</ul><div className="mt-5" onClick={() => setOpen(false)}><CtaLink href="/#contact">Talk to our team</CtaLink></div></div>}</header>;
}
export const Footer = () => <footer className="border-t border-cy-line bg-cy-ink"><div className="cy-container grid gap-12 py-16 md:grid-cols-[2fr_1fr_1fr]"><div className="max-w-sm"><Logo/><p className="mt-6 text-sm leading-7 text-cy-mute">Practical security expertise.<br/>Thoughtful technology. Clearer decisions.</p></div><div><p className="cy-label text-cy-mute">Explore</p><ul className="mt-5 space-y-4 text-sm">{[...links, {href: "/#contact", label: "Contact", id: "contact"}].map(l => <li key={l.id}><a className="cy-footer-link" href={l.href}>{l.label}<ArrowUpRight size={13}/></a></li>)}</ul></div><div><p className="cy-label text-cy-mute">Information</p><ul className="mt-5 space-y-4 text-sm">{[["/privacy", "Privacy policy"], ["/terms", "Terms of use"], ["/auth", "Team sign in"]].map(([href, title]) => <li key={href}><Link className="cy-footer-link" to={href}>{title}<ArrowUpRight size={13}/></Link></li>)}</ul></div></div><div className="cy-container flex flex-wrap items-center justify-between gap-4 border-t border-cy-line py-6 text-xs text-cy-mute"><span>© {new Date().getFullYear()} Cyvance Security. All rights reserved.</span><span>Security, with perspective.</span></div></footer>;

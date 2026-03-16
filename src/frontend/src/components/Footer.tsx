import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ backgroundColor: "var(--obsidian)" }}>
      {/* Gold gradient top border */}
      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, transparent, var(--gold), transparent)",
        }}
      />
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/assets/uploads/Gemini_Generated_Image_ubdf1aubdf1aubdf-removebg-preview-1--1.png"
                alt="Gemora Global"
                className="h-10 w-10 object-contain"
              />
              <span
                className="text-lg font-serif tracking-widest"
                style={{ color: "var(--gold)", letterSpacing: "0.15em" }}
              >
                Gemora Global
              </span>
            </div>
            <p className="text-sm text-foreground/50 leading-relaxed max-w-xs">
              Premium imitation jewellery manufacturer and exporter from Jaipur,
              India. Trusted by wholesalers and boutiques worldwide.
            </p>
            <div className="mt-6 pt-6 border-t border-[oklch(0.18_0_0)]">
              <p className="text-xs text-foreground/30 tracking-widest uppercase">
                Jaipur, Rajasthan, India
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="section-label mb-6">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              {(
                [
                  ["Home", "/"],
                  ["About Us", "/about"],
                  ["Collections", "/collections"],
                  ["Wholesale & Export", "/wholesale"],
                  ["Why Choose Us", "/why-us"],
                  ["Global Markets", "/markets"],
                  ["Gallery", "/gallery"],
                  ["Contact", "/contact"],
                ] as [string, string][]
              ).map(([label, to]) => (
                <Link
                  key={to}
                  to={to}
                  className="text-xs text-foreground/50 hover:text-[var(--gold)] transition-colors tracking-wider uppercase"
                  style={{ letterSpacing: "0.12em" }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="section-label mb-6">Contact Us</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin
                  size={14}
                  className="mt-0.5 shrink-0"
                  style={{ color: "var(--gold)" }}
                />
                <span className="text-sm text-foreground/50">
                  B 66 MAA Hinglaj Nagar, Gandhi Path West,
                  <br />
                  Vaishali Nagar, Jaipur 302021, India
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} style={{ color: "var(--gold)" }} />
                <a
                  href="https://wa.me/917976341419"
                  className="text-sm text-foreground/50 hover:text-[var(--gold)] transition-colors"
                >
                  +91 79763 41419
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} style={{ color: "var(--gold)" }} />
                <a
                  href="mailto:globalgemora@gmail.com"
                  className="text-sm text-foreground/50 hover:text-[var(--gold)] transition-colors"
                >
                  globalgemora@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[oklch(0.18_0_0)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/30 tracking-wider">
            © {year} Gemora Global. All rights reserved.
          </p>
          <p className="text-xs text-foreground/25">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--gold)] transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

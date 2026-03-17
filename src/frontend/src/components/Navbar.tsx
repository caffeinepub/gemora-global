import logoUrl from "@/assets/uploads/Gemini_Generated_Image_ubdf1aubdf1aubdf-removebg-preview-1-1-1.png";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", to: "/", ocid: "nav.home_link" },
  { label: "About", to: "/about", ocid: "nav.link" },
  { label: "Collections", to: "/collections", ocid: "nav.collections_link" },
  { label: "Wholesale", to: "/wholesale", ocid: "nav.wholesale_link" },
  { label: "Why Us", to: "/why-us", ocid: "nav.link" },
  { label: "Markets", to: "/markets", ocid: "nav.link" },
  { label: "Gallery", to: "/gallery", ocid: "nav.link" },
  { label: "Blog", to: "/blog", ocid: "nav.blog_link" },
  { label: "Contact", to: "/contact", ocid: "nav.contact_link" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "shadow-md border-b backdrop-blur-sm" : "border-b"
      }`}
      style={{
        backgroundColor: scrolled
          ? "oklch(0.28 0.065 240 / 0.92)"
          : "oklch(0.28 0.065 240)",
        borderColor: "oklch(0.30 0.07 210 / 0.5)",
      }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 no-underline">
          <img
            src={logoUrl}
            alt="Gemora Global"
            className="h-14 w-14 object-contain animate-float"
          />
          <span
            className="text-xl font-serif tracking-widest"
            style={{ color: "oklch(0.92 0.02 80)", letterSpacing: "0.15em" }}
          >
            Gemora Global
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-ocid={link.ocid}
              className="text-xs font-sans tracking-widest uppercase transition-colors duration-200 relative"
              style={{ letterSpacing: "0.12em", color: "oklch(0.78 0.04 210)" }}
              activeProps={{ style: { color: "var(--gold)" } }}
              onMouseEnter={() => setHoveredLink(link.to)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {link.label}
              <span
                style={{
                  position: "absolute",
                  bottom: "-4px",
                  left: 0,
                  height: "1px",
                  width: hoveredLink === link.to ? "100%" : "0%",
                  backgroundColor: "var(--teal)",
                  transition: "width 0.3s ease",
                  display: "block",
                }}
              />
            </Link>
          ))}
          <Link to="/contact">
            <Button
              data-ocid="nav.get_quote_button"
              className="text-xs tracking-widest uppercase h-9 px-5 btn-shimmer"
              style={{
                backgroundColor: "var(--gold)",
                color: "oklch(0.15 0.05 240)",
                fontFamily: "'Jost', sans-serif",
                fontWeight: 600,
                letterSpacing: "0.15em",
                borderRadius: 0,
              }}
            >
              Get Quote
            </Button>
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          data-ocid="nav.mobile_menu_toggle"
          className="lg:hidden p-2"
          style={{ color: "oklch(0.78 0.04 210)" }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t"
            style={{
              backgroundColor: "oklch(0.30 0.07 240)",
              borderColor: "oklch(0.30 0.07 210 / 0.5)",
            }}
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-xs tracking-widest uppercase transition-colors py-1"
                  style={{
                    letterSpacing: "0.15em",
                    color: "oklch(0.78 0.04 210)",
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/contact" onClick={() => setMenuOpen(false)}>
                <Button
                  className="text-xs tracking-widest uppercase h-9 w-full"
                  style={{
                    backgroundColor: "var(--gold)",
                    color: "oklch(0.15 0.05 240)",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    borderRadius: 0,
                  }}
                >
                  Get Quote
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

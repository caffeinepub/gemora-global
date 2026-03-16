import bridalImg from "@/assets/generated/bridal-collection.dim_600x600.jpg";
import heroImg from "@/assets/generated/hero-light.dim_1920x900.jpg";
import minimalImg from "@/assets/generated/minimal-collection.dim_600x600.jpg";
import necklaceImg from "@/assets/generated/necklace-collection.dim_600x600.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Award, Globe, Package, Users } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "50+", label: "Countries Exported" },
  { value: "10,000+", label: "Designs" },
  { value: "500+", label: "Happy Clients" },
];

const featuredCollections = [
  {
    title: "Statement Necklaces",
    desc: "Layered, choker, and collar necklaces for every occasion and market segment.",
    img: necklaceImg,
  },
  {
    title: "Bridal Jewellery",
    desc: "Traditional and contemporary bridal sets crafted for weddings across cultures.",
    img: bridalImg,
  },
  {
    title: "Minimal Fashion",
    desc: "Delicate everyday pieces perfect for boutiques and modern lifestyle brands.",
    img: minimalImg,
  },
];

const whyItems = [
  {
    icon: Award,
    title: "Premium Finishing",
    desc: "18K gold plating with tarnish-resistant coating",
  },
  {
    icon: Globe,
    title: "Global Exports",
    desc: "Shipping to 50+ countries with full documentation",
  },
  {
    icon: Package,
    title: "Bulk Supply",
    desc: "MOQ from 50 pieces, flexible order sizes",
  },
  {
    icon: Users,
    title: "Private Label",
    desc: "Custom branding and packaging available",
  },
];

const markets = [
  { flag: "🇫🇷", name: "France" },
  { flag: "🇦🇪", name: "UAE" },
  { flag: "🇺🇸", name: "USA" },
  { flag: "🇬🇧", name: "UK" },
  { flag: "🇪🇺", name: "Europe" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImg}')` }}
        />
        {/* Sophisticated gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(250,245,235,0.3) 0%, rgba(250,245,235,0.65) 50%, rgba(250,245,235,0.8) 100%)",
          }}
        />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-label mb-6"
            style={{ color: "var(--gold-dark)" }}
          >
            Est. 2005 · Jaipur, India
          </motion.p>

          <h1
            className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-6"
            style={{ fontWeight: 300, color: "oklch(0.18 0 0)" }}
          >
            <motion.span
              style={{ display: "block" }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Premium Imitation Jewellery
            </motion.span>
            <motion.span
              style={{ display: "block", color: "var(--gold-dark)" }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
            >
              Manufacturer &amp; Exporter
            </motion.span>
            <motion.span
              style={{ display: "block" }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              from India
            </motion.span>
          </h1>

          {/* Decorative gold line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              height: "1px",
              background: "var(--gold)",
              opacity: 0.4,
              transformOrigin: "left",
              marginBottom: "1.5rem",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg mb-10 leading-relaxed"
            style={{ color: "oklch(0.35 0 0)" }}
          >
            Trusted by wholesalers, boutiques and distributors across Europe,
            UAE, USA &amp; UK
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/gallery">
              <div
                style={{ animation: "glow-pulse 2.5s ease-in-out infinite" }}
              >
                <Button
                  data-ocid="hero.view_catalogue_button"
                  size="lg"
                  className="text-xs tracking-widest uppercase px-8 h-12 btn-shimmer"
                  style={{
                    backgroundColor: "var(--gold)",
                    color: "var(--obsidian)",
                    fontWeight: 500,
                    letterSpacing: "0.15em",
                    borderRadius: 0,
                  }}
                >
                  View Catalogue
                </Button>
              </div>
            </Link>
            <Link to="/contact">
              <Button
                data-ocid="hero.contact_wholesale_button"
                size="lg"
                variant="outline"
                className="text-xs tracking-widest uppercase px-8 h-12"
                style={{
                  borderRadius: 0,
                  letterSpacing: "0.15em",
                  borderColor: "oklch(0.25 0 0)",
                  color: "oklch(0.18 0 0)",
                }}
              >
                Contact for Wholesale
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section
        style={{ backgroundColor: "var(--obsidian-mid)" }}
        className="py-14 border-y border-[oklch(0.2_0_0)]"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div
                  className="font-serif text-4xl md:text-5xl shimmer-text"
                  style={{ fontWeight: 300 }}
                >
                  {s.value}
                </div>
                <div className="section-label mt-2">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-24" style={{ backgroundColor: "var(--obsidian)" }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-label mb-4">Explore Our Work</p>
            <h2
              className="font-serif text-4xl md:text-5xl text-foreground"
              style={{ fontWeight: 300 }}
            >
              Featured Collections
            </h2>
            <div className="gold-divider mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCollections.map((col, i) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden aspect-square relative">
                  <img
                    src={col.img}
                    alt={col.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                    <span className="font-serif text-lg text-white tracking-wide">
                      {col.title}
                    </span>
                  </div>
                </div>
                <div className="pt-5 pb-3 border-b border-[oklch(0.2_0_0)]">
                  <h3
                    className="font-serif text-xl"
                    style={{ color: "var(--gold-light)", fontWeight: 400 }}
                  >
                    {col.title}
                  </h3>
                  <p className="text-sm text-foreground/50 mt-2 leading-relaxed">
                    {col.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/collections">
              <Button
                variant="outline"
                className="text-xs tracking-widest uppercase px-8 h-11 border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black"
                style={{ borderRadius: 0, letterSpacing: "0.15em" }}
              >
                View All Collections <ArrowRight size={14} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Marquee strip */}
      <div
        style={{
          backgroundColor: "var(--gold)",
          overflow: "hidden",
          whiteSpace: "nowrap",
          padding: "10px 0",
        }}
      >
        <motion.div
          style={{ display: "inline-block" }}
          animate={{ x: [0, -1200] }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <span
            className="text-xs tracking-widest uppercase text-black font-sans"
            style={{ letterSpacing: "0.2em" }}
          >
            Premium Imitation Jewellery &nbsp;&bull;&nbsp; Manufactured in India
            &nbsp;&bull;&nbsp; Exported Worldwide &nbsp;&bull;&nbsp; 10,000+
            Designs &nbsp;&bull;&nbsp; 50+ Countries &nbsp;&bull;&nbsp; 15 Years
            of Excellence &nbsp;&bull;&nbsp; Private Label Available
            &nbsp;&bull;&nbsp; MOQ 50 Pieces &nbsp;&bull;&nbsp; Premium
            Imitation Jewellery &nbsp;&bull;&nbsp; Manufactured in India
            &nbsp;&bull;&nbsp; Exported Worldwide &nbsp;&bull;&nbsp; 10,000+
            Designs &nbsp;&bull;&nbsp; 50+ Countries &nbsp;&bull;&nbsp; 15 Years
            of Excellence &nbsp;&bull;&nbsp; Private Label Available
            &nbsp;&bull;&nbsp; MOQ 50 Pieces &nbsp;&bull;&nbsp;
          </span>
        </motion.div>
      </div>

      {/* Why Choose Us teaser */}
      <section
        style={{ backgroundColor: "var(--obsidian-mid)" }}
        className="py-24"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-label mb-4">Our Promise</p>
            <h2
              className="font-serif text-4xl md:text-5xl text-foreground"
              style={{ fontWeight: 300 }}
            >
              Why Choose Gemora Global
            </h2>
            <div className="gold-divider mt-6" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{
                  boxShadow: "0 0 30px rgba(201,168,76,0.2)",
                  borderColor: "var(--gold)",
                }}
                className="text-center p-8 border border-[oklch(0.2_0_0)] transition-colors duration-300"
              >
                <item.icon
                  size={28}
                  style={{ color: "var(--gold)" }}
                  className="mx-auto mb-4"
                />
                <h3
                  className="font-serif text-lg mb-2"
                  style={{ color: "var(--gold-light)" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-foreground/50 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Markets */}
      <section
        style={{ backgroundColor: "var(--obsidian)" }}
        className="py-20 border-y border-[oklch(0.18_0_0)]"
      >
        <div className="container mx-auto px-6 text-center">
          <p className="section-label mb-8">Trusted Worldwide</p>
          <div className="flex flex-wrap justify-center gap-10">
            {markets.map((m) => (
              <div key={m.name} className="flex flex-col items-center gap-2">
                <span className="text-4xl">{m.flag}</span>
                <span
                  className="text-xs tracking-widest uppercase text-foreground/60"
                  style={{ letterSpacing: "0.15em" }}
                >
                  {m.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section
        className="py-24 text-center"
        style={{ backgroundColor: "var(--obsidian-mid)" }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label mb-4">Start Sourcing Today</p>
            <h2
              className="font-serif text-4xl md:text-5xl mb-6 text-foreground"
              style={{ fontWeight: 300 }}
            >
              Ready to Source Premium Jewellery?
            </h2>
            <div className="gold-divider mb-8" />
            <p className="text-foreground/50 mb-10 max-w-lg mx-auto text-sm leading-relaxed">
              Connect with our export team to discuss MOQ, pricing, private
              label options and worldwide shipping.
            </p>
            <Link to="/contact">
              <div
                className="relative inline-block"
                style={{ animation: "glow-pulse 2.5s ease-in-out infinite" }}
              >
                <Button
                  data-ocid="home.contact_cta_button"
                  size="lg"
                  className="text-xs tracking-widest uppercase px-10 h-12 btn-shimmer"
                  style={{
                    backgroundColor: "var(--gold)",
                    color: "var(--obsidian)",
                    fontWeight: 500,
                    letterSpacing: "0.15em",
                    borderRadius: 0,
                  }}
                >
                  Contact for Wholesale
                </Button>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

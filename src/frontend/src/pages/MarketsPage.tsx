import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

const markets = [
  {
    flag: "🇫🇷",
    name: "France",
    desc: "Parisian boutiques and French fashion retailers love our minimal and contemporary collections. Strong demand for delicate gold-plated jewellery.",
  },
  {
    flag: "🇦🇪",
    name: "UAE",
    desc: "The GCC market has a strong appetite for statement jewellery, bridal sets and kundan work. Dubai and Abu Dhabi retailers are key buyers.",
  },
  {
    flag: "🇺🇸",
    name: "USA",
    desc: "American boutiques, Etsy wholesale buyers and fashion retailers across New York, LA and Chicago stock our minimal and trendy collections.",
  },
  {
    flag: "🇬🇧",
    name: "UK",
    desc: "British jewellery boutiques and Asian wedding markets in London and Birmingham are among our strongest repeat customers.",
  },
  {
    flag: "🇩🇪",
    name: "Germany",
    desc: "German fashion retailers value our consistent quality and precise craftsmanship. Strong demand for minimalist and Art Deco inspired pieces.",
  },
  {
    flag: "🇦🇺",
    name: "Australia",
    desc: "Australian boutiques and online jewellery brands source our minimal and bohemian collections for the local fashion market.",
  },
  {
    flag: "🇨🇦",
    name: "Canada",
    desc: "Canadian multi-cultural wedding market drives demand for our bridal collections. Growing interest from Toronto and Vancouver boutiques.",
  },
];

export default function MarketsPage() {
  return (
    <div>
      <PageHero
        label="Worldwide Presence"
        title="Our Global Reach"
        subtitle="Exported to 50+ countries across 6 continents"
      />

      <section
        style={{ backgroundColor: "var(--obsidian-mid)" }}
        className="py-24"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {markets.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-8 border border-[oklch(0.2_0_0)] hover:border-[var(--gold)] transition-colors duration-300"
              >
                <div className="text-4xl mb-4">{m.flag}</div>
                <h3
                  className="font-serif text-2xl mb-3"
                  style={{ color: "var(--gold-light)", fontWeight: 400 }}
                >
                  {m.name}
                </h3>
                <p className="text-sm text-foreground/50 leading-relaxed">
                  {m.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center py-16 border border-[oklch(0.2_0_0)]"
          >
            <p className="section-label mb-4">Expand Your Market</p>
            <h2
              className="font-serif text-4xl md:text-5xl mb-6 text-foreground"
              style={{ fontWeight: 300 }}
            >
              Become Our Distributor
            </h2>
            <div className="gold-divider mb-8" />
            <p className="text-foreground/50 text-sm leading-relaxed max-w-lg mx-auto mb-8">
              We are actively seeking exclusive distributors and wholesale
              partners in key markets. Competitive margin structures and
              marketing support available.
            </p>
            <Link to="/contact">
              <Button
                size="lg"
                className="text-xs tracking-widest uppercase px-10 h-12"
                style={{
                  backgroundColor: "var(--gold)",
                  color: "var(--obsidian)",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  borderRadius: 0,
                }}
              >
                Get In Touch
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

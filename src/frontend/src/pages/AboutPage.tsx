import manufacturingImg from "@/assets/generated/manufacturing.dim_800x500.jpg";
import imgFlatlay from "@/assets/generated/product-flatlay.dim_600x600.jpg";
import PageHero from "@/components/PageHero";
import { motion } from "motion/react";

const stats = [
  { value: "15", label: "Years of Craftsmanship" },
  { value: "50+", label: "Countries Exported" },
  { value: "10,000+", label: "Unique Designs" },
  { value: "500+", label: "Global Clients" },
];

const expertiseCards = [
  {
    title: "Manufacturing Excellence",
    desc: "State-of-the-art facilities in Surat equipped with advanced plating, stone-setting, and finishing machinery. Every piece undergoes rigorous quality checks before packaging.",
  },
  {
    title: "Quality Control",
    desc: "Multi-stage inspection from raw material sourcing to finished product. We use only hypoallergenic metals and certified safe coatings for international markets.",
  },
  {
    title: "Global Export Capability",
    desc: "Experienced export team handling customs documentation, compliance, and logistics to 50+ countries. We work with leading freight partners for reliable delivery.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        label="Who We Are"
        title="Our Story"
        subtitle="Two decades of craftsmanship from the jewellery capital of India"
      />

      {/* Story Section */}
      <section
        style={{ backgroundColor: "var(--obsidian-mid)" }}
        className="py-24"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="section-label mb-5">Founded in Surat</p>
              <h2
                className="font-serif text-4xl md:text-5xl mb-8 text-foreground"
                style={{ fontWeight: 300 }}
              >
                Rooted in Tradition,
                <br />
                <span style={{ color: "var(--gold)" }}>
                  Built for the World
                </span>
              </h2>
              <div className="gold-divider-left mb-8" />
              <p className="text-foreground/60 text-sm leading-relaxed mb-5">
                Founded in 2005 in Surat — India's undisputed jewellery capital
                — Gemora Global began as a small workshop with a single vision:
                to deliver world-class imitation jewellery at accessible price
                points.
              </p>
              <p className="text-foreground/60 text-sm leading-relaxed mb-5">
                Over fifteen years, we've grown into a full-scale manufacturing
                and export operation, shipping to boutiques, wholesalers, and
                distributors across six continents. Our 200-strong team combines
                traditional Indian craftsmanship with modern production
                standards.
              </p>
              <p className="text-foreground/60 text-sm leading-relaxed">
                Every season we introduce 500+ new designs inspired by global
                runway trends, traditional Indian motifs, and the evolving
                tastes of international buyers.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="overflow-hidden"
            >
              <img
                src={manufacturingImg}
                alt="Gemora Global Manufacturing"
                className="w-full object-cover"
                style={{ filter: "brightness(0.9) contrast(1.05)" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = imgFlatlay;
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        style={{ backgroundColor: "var(--obsidian)" }}
        className="py-16 border-y border-[oklch(0.18_0.055_240)]"
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

      {/* Expertise Cards */}
      <section
        style={{ backgroundColor: "var(--obsidian-mid)" }}
        className="py-24"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-label mb-4">Our Strengths</p>
            <h2
              className="font-serif text-4xl md:text-5xl text-foreground"
              style={{ fontWeight: 300 }}
            >
              Manufacturing Expertise
            </h2>
            <div className="gold-divider mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expertiseCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{
                  boxShadow: "0 0 25px rgba(201,168,76,0.15)",
                  borderColor: "var(--gold)",
                }}
                className="p-8 border border-[oklch(0.28_0.065_240)] transition-colors duration-300"
              >
                <div
                  className="w-8 h-px mb-6"
                  style={{ backgroundColor: "var(--gold)" }}
                />
                <h3
                  className="font-serif text-xl mb-4"
                  style={{ color: "var(--gold-light)", fontWeight: 400 }}
                >
                  {card.title}
                </h3>
                <p className="text-sm text-foreground/50 leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

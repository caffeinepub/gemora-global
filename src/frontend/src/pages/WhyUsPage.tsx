import PageHero from "@/components/PageHero";
import {
  Box,
  DollarSign,
  Globe,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";

const values = [
  {
    icon: DollarSign,
    title: "Competitive Pricing",
    desc: "Direct factory pricing with no middlemen. Our pricing is among the most competitive for the quality delivered, making your margins healthy.",
  },
  {
    icon: Sparkles,
    title: "Premium Finishing",
    desc: "18K gold plating, rhodium coating, tarnish-resistant treatment — every piece is finished to the highest standard for international markets.",
  },
  {
    icon: Globe,
    title: "Reliable Export Partner",
    desc: "15+ years of export experience. We know customs, compliance, and documentation for every major importing country.",
  },
  {
    icon: TrendingUp,
    title: "Trendy Designs",
    desc: "Our in-house design team tracks global fashion weeks and social media trends to create collections that sell.",
  },
  {
    icon: Box,
    title: "Custom Packaging",
    desc: "Branded jewellery boxes, velvet pouches, hangtags, and packaging inserts — all customisable to your brand identity.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    desc: "Multi-stage QC inspection with photo documentation before shipping. We stand behind every piece we send out.",
  },
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Boutique Owner, London UK",
    flag: "🇬🇧",
    quote:
      "We've been sourcing from Gemora Global for 4 years. The quality is consistently excellent and delivery times are always reliable. Our customers love the bridal range.",
  },
  {
    name: "Fatima Al-Rashid",
    role: "Wholesale Distributor, Dubai UAE",
    flag: "🇦🇪",
    quote:
      "Best imitation jewellery supplier we've worked with. Private label packaging was seamless and the designs are always on-trend. Highly recommend for GCC market buyers.",
  },
  {
    name: "Marie Dupont",
    role: "Fashion Retailer, Paris France",
    flag: "🇫🇷",
    quote:
      "The minimal fashion collection is a perfect fit for our Parisian boutique clientele. Gemora Global understands what international buyers want — elegant, quality, affordable.",
  },
];

export default function WhyUsPage() {
  return (
    <div>
      <PageHero
        label="Our Advantage"
        title="Why Choose Gemora Global"
        subtitle="Six compelling reasons international buyers choose us season after season"
      />

      {/* Value Props */}
      <section
        style={{ backgroundColor: "var(--obsidian-mid)" }}
        className="py-24"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-8 border border-[oklch(0.28_0.065_240)] hover:border-[var(--gold)] transition-colors duration-300 group"
              >
                <v.icon
                  size={30}
                  style={{ color: "var(--gold)" }}
                  className="mb-5"
                />
                <h3
                  className="font-serif text-xl mb-3"
                  style={{ color: "var(--gold-light)", fontWeight: 400 }}
                >
                  {v.title}
                </h3>
                <p className="text-sm text-foreground/50 leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="text-center mb-14">
            <p className="section-label mb-4">Client Voices</p>
            <h2
              className="font-serif text-4xl md:text-5xl text-foreground"
              style={{ fontWeight: 300 }}
            >
              What Our Buyers Say
            </h2>
            <div className="gold-divider mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="p-8 border border-[oklch(0.28_0.065_240)]"
              >
                <div className="text-3xl mb-4">{t.flag}</div>
                <p className="text-sm text-foreground/60 leading-relaxed mb-6 italic font-serif">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-[oklch(0.28_0.065_240)] pt-4">
                  <p
                    className="font-serif text-sm"
                    style={{ color: "var(--gold-light)" }}
                  >
                    {t.name}
                  </p>
                  <p className="text-xs text-foreground/40 mt-1 tracking-wider">
                    {t.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

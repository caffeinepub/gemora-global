import { motion } from "motion/react";

interface PageHeroProps {
  label?: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({ label, title, subtitle }: PageHeroProps) {
  return (
    <section
      className="pt-40 pb-28 text-center"
      style={{ backgroundColor: "var(--obsidian)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="container mx-auto px-6"
      >
        {label && (
          <div className="flex items-center gap-6 justify-center mb-6">
            <div
              style={{
                flex: 1,
                maxWidth: "80px",
                height: "1px",
                background:
                  "linear-gradient(to right, transparent, var(--gold))",
              }}
            />
            <p className="section-label">{label}</p>
            <div
              style={{
                flex: 1,
                maxWidth: "80px",
                height: "1px",
                background:
                  "linear-gradient(to left, transparent, var(--gold))",
              }}
            />
          </div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1
            className="font-serif text-4xl md:text-6xl text-foreground mb-4"
            style={{ fontWeight: 300 }}
          >
            {title}
          </h1>
        </motion.div>
        <div className="gold-divider mt-6 mb-3" />
        <div className="flex justify-center mt-3">
          <span
            style={{
              color: "var(--gold)",
              fontSize: "0.5rem",
              letterSpacing: "0.5em",
            }}
          >
            ◆
          </span>
        </div>
        {subtitle && (
          <p className="text-foreground/60 text-sm tracking-wide max-w-xl mx-auto leading-relaxed mt-6">
            {subtitle}
          </p>
        )}
      </motion.div>
    </section>
  );
}

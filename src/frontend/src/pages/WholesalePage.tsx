import wholesaleImg from "@/assets/generated/wholesale-export.dim_800x500.jpg";
import PageHero from "@/components/PageHero";
import { useActor } from "@/hooks/useActor";
import { Globe, Layers, Package, Tag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { InquiryType } from "../backend";

const cards = [
  {
    icon: Package,
    title: "Minimum Order Quantity",
    subtitle: "From 50 Pieces",
    desc: "Flexible MOQ starting from just 50 pieces per design, scaling to full container loads for large distributors.",
  },
  {
    icon: Layers,
    title: "Bulk Supply",
    subtitle: "Volume Discounts",
    desc: "Tiered pricing with competitive discounts at 100, 500, and 1000+ pieces. Special rates for repeat buyers.",
  },
  {
    icon: Tag,
    title: "Private Label",
    subtitle: "Your Brand, Our Quality",
    desc: "Custom branding, hangtags, packaging inserts and jewellery boxes with your logo. No minimum for packaging design.",
  },
  {
    icon: Globe,
    title: "Worldwide Shipping",
    subtitle: "Door-to-Door Delivery",
    desc: "DHL, FedEx, sea freight, and air cargo options. Full export documentation, insurance, and tracking provided.",
  },
];

const steps = [
  {
    n: "01",
    title: "Inquiry",
    desc: "Send us your requirements via WhatsApp, email or our contact form.",
  },
  {
    n: "02",
    title: "Quote",
    desc: "Receive a detailed price quote within 24 hours with samples if needed.",
  },
  {
    n: "03",
    title: "Confirm Order",
    desc: "Review and confirm order details, designs and packaging requirements.",
  },
  {
    n: "04",
    title: "Production",
    desc: "We begin manufacturing with quality checks at every stage.",
  },
  {
    n: "05",
    title: "Delivery",
    desc: "Packed and shipped with full documentation and live tracking.",
  },
];

const countries = [
  "United Kingdom",
  "United States",
  "United Arab Emirates",
  "France",
  "Germany",
  "Australia",
  "Canada",
  "Italy",
  "Spain",
  "Netherlands",
  "Belgium",
  "Switzerland",
  "Sweden",
  "Norway",
  "Denmark",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "South Africa",
  "Singapore",
  "Malaysia",
  "New Zealand",
  "Other",
];

const baseInputStyle: React.CSSProperties = {
  backgroundColor: "oklch(0.14 0.04 240)",
  color: "var(--foreground)",
  padding: "0.75rem 1rem",
  width: "100%",
  fontSize: "0.875rem",
  outline: "none",
  transition: "border-color 0.25s",
  borderRadius: 0,
  appearance: "none" as const,
};

function fieldStyle(focused: boolean): React.CSSProperties {
  return {
    ...baseInputStyle,
    border: `1px solid ${focused ? "var(--gold)" : "oklch(0.30 0.06 240)"}`,
  };
}

export default function WholesalePage() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    phone: "",
    whatsapp: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await actor?.submitInquiry(
        form.name,
        form.email,
        form.company,
        form.country,
        form.phone,
        form.whatsapp,
        form.message,
        InquiryType.wholesale,
      );
      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        company: "",
        country: "",
        phone: "",
        whatsapp: "",
        message: "",
      });
    } catch {
      setError(
        "Failed to send inquiry. Please try again or contact us directly.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHero
        label="B2B Export Partner"
        title="Wholesale & Export"
        subtitle="Your trusted manufacturing and export partner from Jaipur, India"
      />

      <section
        style={{ backgroundColor: "var(--obsidian-mid)" }}
        className="py-24"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="section-label mb-5">Export Ready</p>
              <h2
                className="font-serif text-4xl md:text-5xl mb-6 text-foreground"
                style={{ fontWeight: 300 }}
              >
                Seamless Global
                <br />
                <span style={{ color: "var(--gold)" }}>Supply Chain</span>
              </h2>
              <div className="gold-divider-left mb-8" />
              <p className="text-foreground/60 text-sm leading-relaxed mb-4">
                Gemora Global is fully equipped for international B2B trade. We
                handle everything from custom order configuration and design
                adaptation to export documentation and last-mile delivery.
              </p>
              <p className="text-foreground/60 text-sm leading-relaxed">
                Our dedicated export team has experience with import
                requirements across the EU, GCC, UK, USA, and Australia —
                ensuring your shipment clears customs smoothly every time.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <img
                src={wholesaleImg}
                alt="Wholesale Export"
                className="w-full object-cover"
              />
            </motion.div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 border border-[oklch(0.28_0.065_240)] hover:border-[var(--gold)] transition-colors duration-300"
              >
                <card.icon
                  size={28}
                  style={{ color: "var(--gold)" }}
                  className="mb-5"
                />
                <h3
                  className="font-serif text-lg mb-1"
                  style={{ color: "var(--gold-light)", fontWeight: 400 }}
                >
                  {card.title}
                </h3>
                <p className="text-xs section-label mb-3">{card.subtitle}</p>
                <p className="text-sm text-foreground/50 leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Process Timeline */}
          <div className="text-center mb-14">
            <p className="section-label mb-4">How It Works</p>
            <h2
              className="font-serif text-4xl md:text-5xl text-foreground"
              style={{ fontWeight: 300 }}
            >
              Our Order Process
            </h2>
            <div className="gold-divider mt-6" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div
                  className="w-14 h-14 flex items-center justify-center mx-auto mb-4 font-serif text-2xl border"
                  style={{
                    borderColor: "var(--gold)",
                    color: "var(--gold)",
                    fontWeight: 300,
                  }}
                >
                  {step.n}
                </div>
                <h3
                  className="font-serif text-lg mb-2"
                  style={{ color: "var(--gold-light)", fontWeight: 400 }}
                >
                  {step.title}
                </h3>
                <p className="text-xs text-foreground/50 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wholesale Inquiry Form */}
      <section style={{ backgroundColor: "var(--obsidian)" }} className="py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <p className="section-label mb-4">Get In Touch</p>
            <h2
              className="font-serif text-4xl md:text-5xl text-foreground"
              style={{ fontWeight: 300 }}
            >
              Request a{" "}
              <span style={{ color: "var(--gold)" }}>Wholesale Quote</span>
            </h2>
            <div className="gold-divider mt-6" />
            <p className="text-foreground/50 text-sm mt-6 leading-relaxed">
              Fill in the form below and our export team will respond within 24
              hours with pricing, MOQ details, and samples.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              data-ocid="wholesale.success_state"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16 border"
              style={{ borderColor: "var(--gold)" }}
            >
              <div
                className="w-16 h-16 flex items-center justify-center mx-auto mb-6 border font-serif text-3xl"
                style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
              >
                ✓
              </div>
              <h3
                className="font-serif text-2xl mb-3"
                style={{ color: "var(--gold-light)", fontWeight: 300 }}
              >
                Inquiry Sent Successfully
              </h3>
              <p className="text-foreground/50 text-sm mb-8">
                Thank you for reaching out. Our export team will contact you
                within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs section-label hover:opacity-80 transition-opacity"
                style={{ color: "var(--gold)" }}
              >
                Send Another Inquiry
              </button>
            </motion.div>
          ) : (
            <motion.form
              data-ocid="wholesale.modal"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="inq-name"
                    className="block text-xs section-label mb-2"
                  >
                    Full Name <span style={{ color: "var(--gold)" }}>*</span>
                  </label>
                  <input
                    id="inq-name"
                    data-ocid="wholesale.input"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField("")}
                    placeholder="Your full name"
                    style={fieldStyle(focusedField === "name")}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="inq-email"
                    className="block text-xs section-label mb-2"
                  >
                    Email Address{" "}
                    <span style={{ color: "var(--gold)" }}>*</span>
                  </label>
                  <input
                    id="inq-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField("")}
                    placeholder="your@email.com"
                    style={fieldStyle(focusedField === "email")}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="inq-company"
                    className="block text-xs section-label mb-2"
                  >
                    Company Name
                  </label>
                  <input
                    id="inq-company"
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("company")}
                    onBlur={() => setFocusedField("")}
                    placeholder="Your company"
                    style={fieldStyle(focusedField === "company")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="inq-country"
                    className="block text-xs section-label mb-2"
                  >
                    Country
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      id="inq-country"
                      data-ocid="wholesale.select"
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("country")}
                      onBlur={() => setFocusedField("")}
                      style={{
                        ...fieldStyle(focusedField === "country"),
                        paddingRight: "2.5rem",
                      }}
                    >
                      <option
                        value=""
                        style={{ backgroundColor: "oklch(0.14 0.04 240)" }}
                      >
                        Select country
                      </option>
                      {countries.map((c) => (
                        <option
                          key={c}
                          value={c}
                          style={{ backgroundColor: "oklch(0.14 0.04 240)" }}
                        >
                          {c}
                        </option>
                      ))}
                    </select>
                    <div
                      style={{
                        position: "absolute",
                        right: "1rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                        color: "var(--gold)",
                        fontSize: "0.65rem",
                      }}
                    >
                      ▼
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="inq-phone"
                    className="block text-xs section-label mb-2"
                  >
                    Phone
                  </label>
                  <input
                    id="inq-phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField("")}
                    placeholder="+1 234 567 8900"
                    style={fieldStyle(focusedField === "phone")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="inq-whatsapp"
                    className="block text-xs section-label mb-2"
                  >
                    WhatsApp Number
                  </label>
                  <input
                    id="inq-whatsapp"
                    type="tel"
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("whatsapp")}
                    onBlur={() => setFocusedField("")}
                    placeholder="447911123456"
                    style={fieldStyle(focusedField === "whatsapp")}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="inq-message"
                  className="block text-xs section-label mb-2"
                >
                  Message / Requirements{" "}
                  <span style={{ color: "var(--gold)" }}>*</span>
                </label>
                <textarea
                  id="inq-message"
                  data-ocid="wholesale.textarea"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField("")}
                  placeholder="Describe your product requirements, quantity, categories of interest, target market, etc."
                  rows={5}
                  style={fieldStyle(focusedField === "message")}
                  required
                />
              </div>

              {error && (
                <p
                  data-ocid="wholesale.error_state"
                  className="text-xs"
                  style={{ color: "oklch(0.65 0.18 25)" }}
                >
                  {error}
                </p>
              )}

              <div className="pt-2">
                <button
                  data-ocid="wholesale.submit_button"
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 text-sm tracking-widest font-medium uppercase transition-opacity duration-300"
                  style={{
                    backgroundColor: "var(--gold)",
                    color: "var(--obsidian)",
                    opacity: submitting ? 0.6 : 1,
                    cursor: submitting ? "not-allowed" : "pointer",
                    border: "none",
                    borderRadius: 0,
                  }}
                >
                  {submitting ? "Sending Inquiry..." : "Send Inquiry"}
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  );
}

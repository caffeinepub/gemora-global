import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { Loader2, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { InquiryType } from "../backend";

const countries = [
  "United Kingdom",
  "United States",
  "United Arab Emirates",
  "France",
  "Germany",
  "Australia",
  "Canada",
  "Netherlands",
  "Belgium",
  "Switzerland",
  "Spain",
  "Italy",
  "Singapore",
  "Malaysia",
  "South Africa",
  "Saudi Arabia",
  "Kuwait",
  "Qatar",
  "New Zealand",
  "Japan",
  "Other",
];

const WA_ICON = (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="white"
    role="img"
    aria-label="WhatsApp"
    className="mr-3"
  >
    <title>WhatsApp</title>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function ContactPage() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    phone: "",
    whatsapp: "",
    message: "",
    inquiryType: "wholesale" as "wholesale" | "catalogue" | "general",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      const typeMap: Record<string, InquiryType> = {
        wholesale: InquiryType.wholesale,
        catalogue: InquiryType.catalogue,
        general: InquiryType.general,
      };
      await actor?.submitInquiry(
        form.name,
        form.email,
        form.company,
        form.country,
        form.phone,
        form.whatsapp,
        form.message,
        typeMap[form.inquiryType],
      );
      setSuccess(true);
      toast.success("Inquiry sent! We'll be in touch within 24 hours.");
    } catch {
      toast.error("Failed to send. Please try WhatsApp instead.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHero
        label="Reach Out"
        title="Get In Touch"
        subtitle="Our export team responds within 24 hours on business days"
      />

      <section
        style={{ backgroundColor: "var(--obsidian-mid)" }}
        className="py-24"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="section-label mb-5">Direct Contact</p>
              <h2
                className="font-serif text-3xl md:text-4xl mb-8 text-foreground"
                style={{ fontWeight: 300 }}
              >
                Let's Start a
                <br />
                <span style={{ color: "var(--gold)" }}>Conversation</span>
              </h2>
              <div className="gold-divider-left mb-10" />

              <div className="flex flex-col gap-6 mb-10">
                <div className="flex items-start gap-4">
                  <MapPin
                    size={18}
                    style={{ color: "var(--gold)" }}
                    className="mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="section-label mb-1">Address</p>
                    <p className="text-sm text-foreground/60">
                      B 66 MAA Hinglaj Nagar, Gandhi Path West,
                      <br />
                      Vaishali Nagar, Jaipur 302021, India
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone
                    size={18}
                    style={{ color: "var(--gold)" }}
                    className="mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="section-label mb-1">WhatsApp / Phone</p>
                    <a
                      href="https://wa.me/917976341419"
                      data-ocid="contact.whatsapp_button"
                      className="text-sm text-foreground/60 hover:text-[var(--gold)] transition-colors"
                    >
                      +91 79763 41419
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail
                    size={18}
                    style={{ color: "var(--gold)" }}
                    className="mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="section-label mb-1">Email</p>
                    <a
                      href="mailto:globalgemora@gmail.com"
                      className="text-sm text-foreground/60 hover:text-[var(--gold)] transition-colors"
                    >
                      globalgemora@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/917976341419?text=Hello%2C%20I'm%20interested%20in%20wholesale%20jewellery."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="text-xs tracking-widest uppercase px-8 h-12 mb-10"
                  style={{
                    backgroundColor: "#25D366",
                    color: "white",
                    borderRadius: 0,
                    letterSpacing: "0.15em",
                  }}
                >
                  {WA_ICON}
                  Chat on WhatsApp
                </Button>
              </a>

              {/* Map */}
              <div className="border border-[oklch(0.30_0.06_240)] overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.1!2d75.7377!3d26.9124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db3b0a0a0a0a1%3A0x0!2sVaishali+Nagar%2C+Jaipur%2C+Rajasthan!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Vaishali Nagar, Jaipur, India"
                  data-ocid="contact.map_marker"
                />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {success ? (
                <div
                  className="h-full flex flex-col items-center justify-center text-center p-12 border border-[oklch(0.28_0.065_240)]"
                  data-ocid="contact.success_state"
                >
                  <div className="text-5xl mb-6">✉️</div>
                  <h3
                    className="font-serif text-2xl mb-3"
                    style={{ color: "var(--gold)", fontWeight: 400 }}
                  >
                    Inquiry Sent!
                  </h3>
                  <p className="text-sm text-foreground/60 leading-relaxed mb-8 max-w-xs">
                    Thank you for reaching out. Our export team will contact you
                    within 24 hours.
                  </p>
                  <Button
                    onClick={() => setSuccess(false)}
                    className="text-xs tracking-widest uppercase px-8 h-10"
                    style={{
                      backgroundColor: "var(--gold)",
                      color: "var(--obsidian)",
                      borderRadius: 0,
                      letterSpacing: "0.15em",
                    }}
                  >
                    Send Another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <p className="section-label mb-3">Send an Inquiry</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label
                        className="section-label"
                        style={{ color: "oklch(0.65 0.02 240)" }}
                      >
                        Name *
                      </Label>
                      <Input
                        data-ocid="contact.name_input"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        placeholder="Your name"
                        required
                        style={{
                          backgroundColor: "var(--obsidian)",
                          border: "1px solid oklch(0.30 0.06 240)",
                          borderRadius: 0,
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label
                        className="section-label"
                        style={{ color: "oklch(0.65 0.02 240)" }}
                      >
                        Email *
                      </Label>
                      <Input
                        data-ocid="contact.email_input"
                        type="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        placeholder="your@email.com"
                        required
                        style={{
                          backgroundColor: "var(--obsidian)",
                          border: "1px solid oklch(0.30 0.06 240)",
                          borderRadius: 0,
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label
                      className="section-label"
                      style={{ color: "oklch(0.65 0.02 240)" }}
                    >
                      Company Name
                    </Label>
                    <Input
                      value={form.company}
                      onChange={(e) => set("company", e.target.value)}
                      placeholder="Your company"
                      style={{
                        backgroundColor: "var(--obsidian)",
                        border: "1px solid oklch(0.30 0.06 240)",
                        borderRadius: 0,
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label
                        className="section-label"
                        style={{ color: "oklch(0.65 0.02 240)" }}
                      >
                        Country
                      </Label>
                      <Select onValueChange={(v) => set("country", v)}>
                        <SelectTrigger
                          style={{
                            backgroundColor: "var(--obsidian)",
                            border: "1px solid oklch(0.30 0.06 240)",
                            borderRadius: 0,
                          }}
                        >
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent
                          style={{
                            backgroundColor: "var(--obsidian-mid)",
                            borderRadius: 0,
                          }}
                        >
                          {countries.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label
                        className="section-label"
                        style={{ color: "oklch(0.65 0.02 240)" }}
                      >
                        Phone
                      </Label>
                      <Input
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        placeholder="+1 234 567 8900"
                        style={{
                          backgroundColor: "var(--obsidian)",
                          border: "1px solid oklch(0.30 0.06 240)",
                          borderRadius: 0,
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label
                      className="section-label"
                      style={{ color: "oklch(0.65 0.02 240)" }}
                    >
                      WhatsApp Number
                    </Label>
                    <Input
                      value={form.whatsapp}
                      onChange={(e) => set("whatsapp", e.target.value)}
                      placeholder="e.g. 447911123456 (with country code)"
                      style={{
                        backgroundColor: "var(--obsidian)",
                        border: "1px solid oklch(0.30 0.06 240)",
                        borderRadius: 0,
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label
                      className="section-label"
                      style={{ color: "oklch(0.65 0.02 240)" }}
                    >
                      Inquiry Type
                    </Label>
                    <Select
                      defaultValue="wholesale"
                      onValueChange={(v) => set("inquiryType", v)}
                    >
                      <SelectTrigger
                        style={{
                          backgroundColor: "var(--obsidian)",
                          border: "1px solid oklch(0.30 0.06 240)",
                          borderRadius: 0,
                        }}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent
                        style={{
                          backgroundColor: "var(--obsidian-mid)",
                          borderRadius: 0,
                        }}
                      >
                        <SelectItem value="wholesale">
                          Wholesale Inquiry
                        </SelectItem>
                        <SelectItem value="catalogue">
                          Catalogue Request
                        </SelectItem>
                        <SelectItem value="general">General Query</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label
                      className="section-label"
                      style={{ color: "oklch(0.65 0.02 240)" }}
                    >
                      Message *
                    </Label>
                    <Textarea
                      data-ocid="contact.message_input"
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      placeholder="Tell us about your requirements — product types, quantities, markets..."
                      rows={5}
                      required
                      style={{
                        backgroundColor: "var(--obsidian)",
                        border: "1px solid oklch(0.30 0.06 240)",
                        borderRadius: 0,
                        resize: "none",
                      }}
                    />
                  </div>

                  <Button
                    type="submit"
                    data-ocid="contact.submit_button"
                    disabled={submitting}
                    size="lg"
                    className="text-xs tracking-widest uppercase h-12"
                    style={{
                      backgroundColor: "var(--gold)",
                      color: "var(--obsidian)",
                      fontWeight: 500,
                      letterSpacing: "0.15em",
                      borderRadius: 0,
                    }}
                  >
                    {submitting && (
                      <Loader2 size={14} className="mr-2 animate-spin" />
                    )}
                    {submitting ? "Sending..." : "Send Inquiry"}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

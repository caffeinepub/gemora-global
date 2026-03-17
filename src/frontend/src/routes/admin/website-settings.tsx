import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { useGetAllContentBlocks } from "@/hooks/useQueries";
import {
  Globe,
  Home,
  Info,
  MessageSquare,
  Search,
  Settings,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CARD = "bg-white rounded-lg shadow-md border border-gray-100";

function Section({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="font-serif text-base font-medium text-gray-800 pb-2 border-b border-gray-100">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Field({
  label,
  children,
}: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
        {label}
      </Label>
      {children}
    </div>
  );
}

export default function AdminWebsiteSettings() {
  const { actor } = useActor();
  const { data: contentBlocks } = useGetAllContentBlocks();

  const getBlock = (key: string) =>
    contentBlocks?.find((b) => b.key === key)?.value ?? "";

  const [homepage, setHomepage] = useState({
    heroTitle: "",
    subtitle: "",
    tagline: "",
  });
  const [contact, setContact] = useState({
    phone: "",
    email: "",
    address: "",
    whatsapp: "",
  });
  const [exportPage, setExportPage] = useState({ title: "", description: "" });
  const [seo, setSeo] = useState({ metaTitle: "", metaDesc: "", keywords: "" });
  const [catalogue, setCatalogue] = useState({ pdfUrl: "", driveUrl: "" });
  const [saving, setSaving] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: getBlock is derived from contentBlocks
  useEffect(() => {
    if (!contentBlocks) return;
    setHomepage({
      heroTitle: getBlock("heroTitle"),
      subtitle: getBlock("heroSubtitle"),
      tagline: getBlock("heroTagline"),
    });
    setContact({
      phone: getBlock("phone"),
      email: getBlock("email"),
      address: getBlock("address"),
      whatsapp: getBlock("whatsappNumber"),
    });
    setExportPage({
      title: getBlock("exportTitle"),
      description: getBlock("exportDescription"),
    });
    setSeo({
      metaTitle: getBlock("metaTitle"),
      metaDesc: getBlock("metaDescription"),
      keywords: getBlock("seoKeywords"),
    });
    setCatalogue({
      pdfUrl: getBlock("cataloguePdfUrl"),
      driveUrl: getBlock("catalogueDriveUrl"),
    });
  }, [contentBlocks]);

  const handleSave = async (section: string, data: Record<string, string>) => {
    if (!actor) {
      toast.error("Not connected to backend");
      return;
    }
    setSaving(true);
    try {
      await Promise.all(
        Object.entries(data).map(([key, value]) =>
          actor.setContentBlock(key, value),
        ),
      );
      toast.success(`${section} settings saved`);
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "text-sm text-gray-800 bg-gray-50 border-gray-200 placeholder:text-gray-400 focus:border-[#C6A55C]";

  return (
    <div className="p-6 space-y-6">
      <div>
        <p className="section-label mb-1">Configuration</p>
        <h1
          className="font-serif text-3xl"
          style={{ color: "var(--gold)", fontWeight: 300 }}
        >
          Website Settings
        </h1>
      </div>

      <motion.div
        className={`${CARD} overflow-hidden`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <Tabs defaultValue="homepage">
          <div className="border-b border-gray-100">
            <TabsList className="bg-transparent h-auto p-0 gap-0">
              {[
                {
                  value: "homepage",
                  label: "Homepage",
                  icon: Home,
                  ocid: "website_settings.homepage_tab",
                },
                {
                  value: "contact",
                  label: "Contact Info",
                  icon: MessageSquare,
                  ocid: "website_settings.contact_tab",
                },
                {
                  value: "export",
                  label: "Export Page",
                  icon: Globe,
                  ocid: "website_settings.seo_tab",
                },
                {
                  value: "seo",
                  label: "SEO",
                  icon: Search,
                  ocid: "website_settings.seo_tab",
                },
                {
                  value: "catalogue",
                  label: "Catalogue",
                  icon: Settings,
                  ocid: "website_settings.catalogue_tab",
                },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  data-ocid={tab.ocid}
                  className="px-4 py-3 text-xs font-medium rounded-none border-b-2 border-transparent data-[state=active]:border-[#C6A55C] data-[state=active]:text-[#C6A55C] text-gray-500 gap-1.5"
                >
                  <tab.icon size={12} />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Homepage */}
          <TabsContent value="homepage" className="p-6">
            <Section title="Homepage Content">
              <Field label="Hero Title">
                <Input
                  className={inputClass}
                  value={homepage.heroTitle}
                  onChange={(e) =>
                    setHomepage((p) => ({ ...p, heroTitle: e.target.value }))
                  }
                  placeholder="Premium Imitation Jewellery..."
                />
              </Field>
              <Field label="Subtitle">
                <Input
                  className={inputClass}
                  value={homepage.subtitle}
                  onChange={(e) =>
                    setHomepage((p) => ({ ...p, subtitle: e.target.value }))
                  }
                  placeholder="Crafted for Global Buyers"
                />
              </Field>
              <Field label="Tagline">
                <Input
                  className={inputClass}
                  value={homepage.tagline}
                  onChange={(e) =>
                    setHomepage((p) => ({ ...p, tagline: e.target.value }))
                  }
                  placeholder="Your tagline here..."
                />
              </Field>
            </Section>
            <div className="mt-5 flex justify-end">
              <Button
                data-ocid="website_settings.save_button"
                onClick={() =>
                  handleSave("Homepage", {
                    heroTitle: homepage.heroTitle,
                    heroSubtitle: homepage.subtitle,
                    heroTagline: homepage.tagline,
                  })
                }
                disabled={saving}
                className="text-xs"
                style={{ backgroundColor: "#C6A55C", color: "#fff" }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </TabsContent>

          {/* Contact */}
          <TabsContent value="contact" className="p-6">
            <Section title="Contact Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Phone">
                  <Input
                    className={inputClass}
                    value={contact.phone}
                    onChange={(e) =>
                      setContact((p) => ({ ...p, phone: e.target.value }))
                    }
                    placeholder="+91 7976341419"
                  />
                </Field>
                <Field label="Email">
                  <Input
                    className={inputClass}
                    value={contact.email}
                    onChange={(e) =>
                      setContact((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="globalgemora@gmail.com"
                  />
                </Field>
                <Field label="WhatsApp Number">
                  <Input
                    className={inputClass}
                    value={contact.whatsapp}
                    onChange={(e) =>
                      setContact((p) => ({ ...p, whatsapp: e.target.value }))
                    }
                    placeholder="+917976341419"
                  />
                </Field>
              </div>
              <Field label="Address">
                <Textarea
                  className={inputClass}
                  value={contact.address}
                  onChange={(e) =>
                    setContact((p) => ({ ...p, address: e.target.value }))
                  }
                  placeholder="B 66 MAA Hinglaj Nagar..."
                  rows={2}
                />
              </Field>
            </Section>
            <div className="mt-5 flex justify-end">
              <Button
                data-ocid="website_settings.save_button"
                onClick={() =>
                  handleSave("Contact", {
                    phone: contact.phone,
                    email: contact.email,
                    address: contact.address,
                    whatsappNumber: contact.whatsapp,
                  })
                }
                disabled={saving}
                className="text-xs"
                style={{ backgroundColor: "#C6A55C", color: "#fff" }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </TabsContent>

          {/* Export Page */}
          <TabsContent value="export" className="p-6">
            <Section title="Export Page Content">
              <Field label="Page Title">
                <Input
                  className={inputClass}
                  value={exportPage.title}
                  onChange={(e) =>
                    setExportPage((p) => ({ ...p, title: e.target.value }))
                  }
                  placeholder="Wholesale & Export"
                />
              </Field>
              <Field label="Description">
                <Textarea
                  className={inputClass}
                  value={exportPage.description}
                  onChange={(e) =>
                    setExportPage((p) => ({
                      ...p,
                      description: e.target.value,
                    }))
                  }
                  rows={4}
                  placeholder="We export premium imitation jewellery..."
                />
              </Field>
            </Section>
            <div className="mt-5 flex justify-end">
              <Button
                data-ocid="website_settings.save_button"
                onClick={() =>
                  handleSave("Export Page", {
                    exportTitle: exportPage.title,
                    exportDescription: exportPage.description,
                  })
                }
                disabled={saving}
                className="text-xs"
                style={{ backgroundColor: "#C6A55C", color: "#fff" }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </TabsContent>

          {/* SEO */}
          <TabsContent value="seo" className="p-6">
            <Section title="SEO Settings">
              <Field label="Meta Title">
                <Input
                  className={inputClass}
                  value={seo.metaTitle}
                  onChange={(e) =>
                    setSeo((p) => ({ ...p, metaTitle: e.target.value }))
                  }
                  placeholder="Gemora Global – Imitation Jewellery Exporter"
                />
              </Field>
              <Field label="Meta Description">
                <Textarea
                  className={inputClass}
                  value={seo.metaDesc}
                  onChange={(e) =>
                    setSeo((p) => ({ ...p, metaDesc: e.target.value }))
                  }
                  rows={3}
                  placeholder="Premium fashion jewellery manufacturer and exporter from Jaipur..."
                />
              </Field>
              <Field label="Keywords">
                <Input
                  className={inputClass}
                  value={seo.keywords}
                  onChange={(e) =>
                    setSeo((p) => ({ ...p, keywords: e.target.value }))
                  }
                  placeholder="imitation jewellery exporter, fashion jewellery wholesale..."
                />
              </Field>
            </Section>
            <div className="mt-5 flex justify-end">
              <Button
                data-ocid="website_settings.save_button"
                onClick={() =>
                  handleSave("SEO", {
                    metaTitle: seo.metaTitle,
                    metaDescription: seo.metaDesc,
                    seoKeywords: seo.keywords,
                  })
                }
                disabled={saving}
                className="text-xs"
                style={{ backgroundColor: "#C6A55C", color: "#fff" }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </TabsContent>

          {/* Catalogue */}
          <TabsContent value="catalogue" className="p-6">
            <Section title="Catalogue Links">
              <Field label="PDF Download URL">
                <Input
                  className={inputClass}
                  value={catalogue.pdfUrl}
                  onChange={(e) =>
                    setCatalogue((p) => ({ ...p, pdfUrl: e.target.value }))
                  }
                  placeholder="https://drive.google.com/..."
                />
              </Field>
              <Field label="Google Drive Link">
                <Input
                  className={inputClass}
                  value={catalogue.driveUrl}
                  onChange={(e) =>
                    setCatalogue((p) => ({ ...p, driveUrl: e.target.value }))
                  }
                  placeholder="https://drive.google.com/..."
                />
              </Field>
            </Section>
            <div className="mt-5 flex justify-end">
              <Button
                data-ocid="website_settings.save_button"
                onClick={() =>
                  handleSave("Catalogue", {
                    cataloguePdfUrl: catalogue.pdfUrl,
                    catalogueDriveUrl: catalogue.driveUrl,
                  })
                }
                disabled={saving}
                className="text-xs"
                style={{ backgroundColor: "#C6A55C", color: "#fff" }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}

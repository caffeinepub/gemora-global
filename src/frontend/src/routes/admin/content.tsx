import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { useGetAllContentBlocks } from "@/hooks/useQueries";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CONTENT_FIELDS = [
  {
    key: "hero_title",
    label: "Hero Title",
    hint: "Main headline shown in the hero section",
    rows: 2,
  },
  {
    key: "hero_subtitle",
    label: "Hero Subtitle",
    hint: "Supporting text below the hero title",
    rows: 2,
  },
  {
    key: "about_description",
    label: "About Description",
    hint: "Company overview on the About Us page",
    rows: 5,
  },
  {
    key: "tagline",
    label: "Brand Tagline",
    hint: "Short tagline used across the site",
    rows: 1,
  },
  {
    key: "export_page_title",
    label: "Export Page Title",
    hint: "Main title on Wholesale & Export page",
    rows: 1,
  },
  {
    key: "export_page_description",
    label: "Export Page Description",
    hint: "Description on export page",
    rows: 3,
  },
  {
    key: "contact_phone",
    label: "Phone Number",
    hint: "Contact phone shown on Contact page",
    rows: 1,
  },
  {
    key: "contact_email",
    label: "Email Address",
    hint: "Contact email shown on site",
    rows: 1,
  },
  {
    key: "contact_address",
    label: "Address",
    hint: "Company address shown on Contact page",
    rows: 2,
  },
  {
    key: "whatsapp_number",
    label: "WhatsApp Number",
    hint: "WhatsApp number for floating chat button (with country code, e.g. 917976341419)",
    rows: 1,
  },
  {
    key: "catalogue_pdf_url",
    label: "Catalogue PDF URL",
    hint: "Direct URL to downloadable catalogue PDF",
    rows: 1,
  },
];

export default function AdminContent() {
  const { data: blocks, isLoading } = useGetAllContentBlocks();
  const { actor } = useActor();
  const qc = useQueryClient();
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (blocks) {
      const map: Record<string, string> = {};
      for (const b of blocks) {
        map[b.key] = b.value;
      }
      for (const f of CONTENT_FIELDS) {
        if (!(f.key in map)) map[f.key] = "";
      }
      setValues(map);
    }
  }, [blocks]);

  const handleSave = async () => {
    if (!actor) return;
    setSaving(true);
    try {
      const origMap: Record<string, string> = {};
      for (const b of blocks ?? []) {
        origMap[b.key] = b.value;
      }
      const changed = CONTENT_FIELDS.filter(
        (f) => values[f.key] !== (origMap[f.key] ?? ""),
      );
      await Promise.all(
        changed.map((f) => actor.setContentBlock(f.key, values[f.key] ?? "")),
      );
      qc.invalidateQueries({ queryKey: ["contentBlocks"] });
      toast.success(
        changed.length > 0 ? "Content saved" : "No changes to save",
      );
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-10">
        <div>
          <p className="section-label mb-2">Manage</p>
          <h1
            className="font-serif text-3xl"
            style={{ color: "var(--gold)", fontWeight: 300 }}
          >
            Content
          </h1>
          <div className="gold-divider-left mt-4" />
        </div>
        <Button
          data-ocid="content.save_button"
          onClick={handleSave}
          disabled={saving || isLoading}
          className="h-10 text-xs tracking-widest uppercase px-6"
          style={{
            backgroundColor: "var(--gold)",
            color: "var(--obsidian)",
            fontWeight: 500,
            letterSpacing: "0.12em",
            borderRadius: 0,
          }}
        >
          {saving ? (
            <>
              <Loader2 size={13} className="mr-2 animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Save size={13} className="mr-2" /> Save Changes
            </>
          )}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-6" data-ocid="content.loading_state">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              className="h-24"
              style={{ backgroundColor: "oklch(0.18 0.055 240)" }}
            />
          ))}
        </div>
      ) : (
        <div
          className="border p-8"
          style={{
            backgroundColor: "var(--obsidian-mid)",
            borderColor: "oklch(0.22 0.06 240)",
          }}
        >
          <p className="text-sm text-foreground/50 mb-8 leading-relaxed">
            Edit the site's content blocks. Changes are applied across all pages
            where these texts appear. Click{" "}
            <span style={{ color: "var(--gold)" }}>Save Changes</span> to
            publish.
          </p>

          <div className="flex flex-col gap-8">
            {CONTENT_FIELDS.map((field) => (
              <div key={field.key} className="flex flex-col gap-2">
                <div>
                  <Label
                    className="section-label"
                    style={{ color: "var(--gold)" }}
                  >
                    {field.label}
                  </Label>
                  <p className="text-xs text-foreground/40 mt-0.5">
                    {field.hint}
                  </p>
                </div>
                <Textarea
                  data-ocid="content.textarea"
                  value={values[field.key] ?? ""}
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      [field.key]: e.target.value,
                    }))
                  }
                  rows={field.rows}
                  placeholder={`Enter ${field.label.toLowerCase()}...`}
                  style={{
                    backgroundColor: "var(--obsidian)",
                    borderColor: "oklch(0.30 0.06 240)",
                    borderRadius: 0,
                    resize: "vertical",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

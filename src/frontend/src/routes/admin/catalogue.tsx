import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useActor } from "@/hooks/useActor";
import { useGetAllContentBlocks } from "@/hooks/useQueries";
import { useQueryClient } from "@tanstack/react-query";
import { Download, ExternalLink, FileText, Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CATALOGUE_FIELDS = [
  {
    key: "catalogue_title",
    label: "Download Section Title",
    placeholder: "Download Our Wholesale Catalogue",
    type: "text",
  },
  {
    key: "catalogue_pdf_url",
    label: "PDF Direct URL",
    placeholder: "https://example.com/catalogue.pdf",
    type: "text",
  },
  {
    key: "catalogue_drive_url",
    label: "Google Drive Link",
    placeholder: "https://drive.google.com/file/d/...",
    type: "text",
  },
];

export default function AdminCatalogue() {
  const { data: blocks, isLoading } = useGetAllContentBlocks();
  const { actor } = useActor();
  const qc = useQueryClient();
  const [values, setValues] = useState<Record<string, string>>({});
  const [enabled, setEnabled] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (blocks) {
      const map: Record<string, string> = {};
      for (const b of blocks) map[b.key] = b.value;
      setValues(map);
      setEnabled((map.catalogue_download_enabled ?? "true") === "true");
    }
  }, [blocks]);

  const handleSave = async () => {
    if (!actor) return;
    setSaving(true);
    try {
      const saves: Promise<void>[] = [];
      for (const f of CATALOGUE_FIELDS) {
        saves.push(actor.setContentBlock(f.key, values[f.key] ?? ""));
      }
      saves.push(
        actor.setContentBlock(
          "catalogue_download_enabled",
          enabled ? "true" : "false",
        ),
      );
      await Promise.all(saves);
      qc.invalidateQueries({ queryKey: ["contentBlocks"] });
      toast.success("Catalogue settings saved");
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const pdfUrl = values.catalogue_pdf_url ?? "";
  const driveUrl = values.catalogue_drive_url ?? "";
  const title = values.catalogue_title || "Download Our Wholesale Catalogue";

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-10">
        <div>
          <p className="section-label mb-2">Manage</p>
          <h1
            className="font-serif text-3xl"
            style={{ color: "var(--gold)", fontWeight: 300 }}
          >
            Catalogue
          </h1>
          <div className="gold-divider-left mt-4" />
        </div>
        <Button
          data-ocid="catalogue.save_button"
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
              <Save size={13} className="mr-2" /> Save Settings
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Config panel */}
        <div
          className="border p-6"
          style={{
            backgroundColor: "var(--obsidian-mid)",
            borderColor: "oklch(0.22 0.06 240)",
          }}
        >
          <h2
            className="font-serif text-lg mb-6"
            style={{ color: "var(--gold-light)", fontWeight: 400 }}
          >
            Catalogue Settings
          </h2>

          {isLoading ? (
            <div
              className="flex flex-col gap-4"
              data-ocid="catalogue.loading_state"
            >
              {[1, 2, 3].map((i) => (
                <Skeleton
                  key={i}
                  className="h-16"
                  style={{ backgroundColor: "oklch(0.18 0.055 240)" }}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {/* Enabled toggle */}
              <div
                className="flex items-center justify-between py-3 border-b"
                style={{ borderColor: "oklch(0.22 0.06 240)" }}
              >
                <div>
                  <Label
                    className="section-label"
                    style={{ color: "var(--gold)" }}
                  >
                    Download Section Visible
                  </Label>
                  <p className="text-xs text-foreground/40 mt-0.5">
                    Show or hide the catalogue download button on the site
                  </p>
                </div>
                <Switch
                  data-ocid="catalogue.switch"
                  checked={enabled}
                  onCheckedChange={setEnabled}
                />
              </div>

              {CATALOGUE_FIELDS.map((f) => (
                <div key={f.key} className="flex flex-col gap-1.5">
                  <Label
                    className="section-label"
                    style={{ color: "oklch(0.55 0 0)" }}
                  >
                    {f.label}
                  </Label>
                  <Input
                    data-ocid="catalogue.input"
                    value={values[f.key] ?? ""}
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        [f.key]: e.target.value,
                      }))
                    }
                    placeholder={f.placeholder}
                    style={{
                      backgroundColor: "var(--obsidian)",
                      borderColor: "oklch(0.30 0.06 240)",
                      borderRadius: 0,
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Preview */}
        <div
          className="border p-6"
          style={{
            backgroundColor: "var(--obsidian-mid)",
            borderColor: "oklch(0.22 0.06 240)",
          }}
        >
          <h2
            className="font-serif text-lg mb-6"
            style={{ color: "var(--gold-light)", fontWeight: 400 }}
          >
            Download Button Preview
          </h2>

          <div
            className="border p-6 flex flex-col items-center gap-4"
            style={{
              borderColor: "oklch(0.28 0.08 78)",
              backgroundColor: "var(--obsidian)",
              opacity: enabled ? 1 : 0.5,
            }}
          >
            <FileText
              size={28}
              style={{ color: "var(--gold)", opacity: 0.7 }}
            />
            <p
              className="font-serif text-base text-center"
              style={{ color: "var(--gold-light)", fontWeight: 300 }}
            >
              {title}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              {pdfUrl ? (
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    data-ocid="catalogue.primary_button"
                    className="w-full h-10 text-xs tracking-widest uppercase gap-2"
                    style={{
                      backgroundColor: "var(--gold)",
                      color: "var(--obsidian)",
                      borderRadius: 0,
                      letterSpacing: "0.12em",
                    }}
                  >
                    <Download size={13} /> Download PDF
                  </Button>
                </a>
              ) : (
                <Button
                  disabled
                  className="flex-1 h-10 text-xs tracking-widest uppercase gap-2"
                  style={{
                    backgroundColor: "var(--gold)",
                    color: "var(--obsidian)",
                    borderRadius: 0,
                    opacity: 0.4,
                    letterSpacing: "0.12em",
                  }}
                >
                  <Download size={13} /> Download PDF
                </Button>
              )}
              {driveUrl && (
                <a href={driveUrl} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="h-10 text-xs tracking-widest uppercase gap-2"
                    style={{
                      borderColor: "oklch(0.35 0.08 78)",
                      color: "oklch(0.65 0.08 78)",
                      borderRadius: 0,
                    }}
                  >
                    <ExternalLink size={13} /> View on Drive
                  </Button>
                </a>
              )}
            </div>
            {!enabled && (
              <p className="text-xs text-foreground/40 mt-1">
                Hidden on public site
              </p>
            )}
          </div>

          <p className="text-xs text-foreground/30 mt-4 leading-relaxed">
            This section appears on the Gallery page when enabled. Set a PDF URL
            or Google Drive link to activate the download button.
          </p>
        </div>
      </div>
    </div>
  );
}

import imgBracelets from "@/assets/generated/product-bracelets.dim_600x600.jpg";
import imgBridal from "@/assets/generated/product-bridal.dim_600x600.jpg";
import imgDetail from "@/assets/generated/product-detail-1.dim_600x600.jpg";
import imgEarrings from "@/assets/generated/product-earrings.dim_600x600.jpg";
import imgFlatlay from "@/assets/generated/product-flatlay.dim_600x600.jpg";
import imgHeroCollection from "@/assets/generated/product-hero-collection.dim_1400x800.jpg";
import imgMinimal from "@/assets/generated/product-minimal.dim_600x600.jpg";
import imgNecklaces from "@/assets/generated/product-necklaces.dim_600x600.jpg";
import imgRings from "@/assets/generated/product-rings.dim_600x600.jpg";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@/hooks/useActor";
import { useGetProducts } from "@/hooks/useQueries";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const STATIC_IMAGES = [
  { src: imgHeroCollection, label: "Featured Collection", filter: "all" },
  { src: imgNecklaces, label: "Necklaces", filter: "necklaces" },
  { src: imgEarrings, label: "Earrings", filter: "earrings" },
  { src: imgBracelets, label: "Bracelets", filter: "bracelets" },
  { src: imgRings, label: "Rings", filter: "all" },
  { src: imgBridal, label: "Bridal Collection", filter: "bridal" },
  { src: imgMinimal, label: "Minimal Fashion", filter: "minimal" },
  { src: imgDetail, label: "Detail Shot", filter: "all" },
  { src: imgFlatlay, label: "Flat Lay Editorial", filter: "all" },
];

const FILTER_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "necklaces", label: "Necklaces" },
  { id: "earrings", label: "Earrings" },
  { id: "bracelets", label: "Bracelets" },
  { id: "bridal", label: "Bridal" },
  { id: "minimal", label: "Minimal" },
];

export default function GalleryPage() {
  const { actor } = useActor();
  const { data: products, isLoading: productsLoading } = useGetProducts();
  const [activeFilter, setActiveFilter] = useState("all");
  const [catalogueOpen, setCatalogueOpen] = useState(false);
  const [catName, setCatName] = useState("");
  const [catEmail, setCatEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const productImages = (() => {
    if (!products || products.length === 0) return STATIC_IMAGES;
    const mapped = products
      .filter((p) => p.imageUrls.length > 0)
      .map((p) => ({
        src: p.imageUrls[0],
        label: p.name,
        filter: p.category.toLowerCase(),
      }));
    return mapped.length > 0 ? mapped : STATIC_IMAGES;
  })();

  const filtered =
    activeFilter === "all"
      ? productImages
      : productImages.filter(
          (img) => img.filter === activeFilter || img.filter === "all",
        );

  const handleCatalogueSubmit = async () => {
    if (!catName.trim() || !catEmail.trim()) {
      toast.error("Please fill in your name and email.");
      return;
    }
    setSubmitting(true);
    try {
      await actor?.submitCatalogueRequest(catName.trim(), catEmail.trim());
      setSubmitted(true);
      toast.success("Catalogue request sent! We'll email you shortly.");
    } catch {
      toast.error("Something went wrong. Please try WhatsApp instead.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHero
        label="Explore Our Work"
        title="Product Gallery"
        subtitle="A visual showcase of our collections available for wholesale"
      />

      <section style={{ backgroundColor: "var(--obsidian)" }} className="py-16">
        <div className="container mx-auto px-6">
          {/* Filters + Download Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
            <div className="flex flex-wrap gap-2 justify-center">
              {FILTER_CATEGORIES.map((f) => (
                <button
                  type="button"
                  key={f.id}
                  data-ocid="gallery.filter_tab"
                  onClick={() => setActiveFilter(f.id)}
                  className="text-xs tracking-widest uppercase px-5 py-2.5 transition-all duration-200"
                  style={{
                    letterSpacing: "0.12em",
                    backgroundColor:
                      activeFilter === f.id ? "var(--gold)" : "transparent",
                    color:
                      activeFilter === f.id
                        ? "var(--obsidian)"
                        : "oklch(0.65 0 0)",
                    border: "1px solid",
                    borderColor:
                      activeFilter === f.id ? "var(--gold)" : "oklch(0.25 0 0)",
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <Button
              data-ocid="gallery.download_catalogue_button"
              onClick={() => {
                setCatalogueOpen(true);
                setSubmitted(false);
                setCatName("");
                setCatEmail("");
              }}
              className="text-xs tracking-widest uppercase px-7 h-10 shrink-0"
              style={{
                backgroundColor: "var(--gold)",
                color: "var(--obsidian)",
                fontWeight: 500,
                letterSpacing: "0.15em",
                borderRadius: 0,
              }}
            >
              Download Catalogue
            </Button>
          </div>

          {productsLoading ? (
            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              data-ocid="gallery.loading_state"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Skeleton
                  key={i}
                  className="aspect-square"
                  style={{ backgroundColor: "oklch(0.18 0 0)" }}
                />
              ))}
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              <AnimatePresence>
                {filtered.map((img) => (
                  <motion.div
                    key={img.src}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="group overflow-hidden relative"
                  >
                    <img
                      src={img.src}
                      alt={img.label}
                      className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = imgFlatlay;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span
                        className="text-xs text-white tracking-widest uppercase"
                        style={{ letterSpacing: "0.12em" }}
                      >
                        {img.label}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Catalogue Modal */}
      <Dialog open={catalogueOpen} onOpenChange={setCatalogueOpen}>
        <DialogContent
          className="max-w-md"
          style={{
            backgroundColor: "var(--obsidian-mid)",
            borderColor: "oklch(0.25 0 0)",
            borderRadius: 0,
          }}
        >
          <DialogHeader>
            <DialogTitle
              className="font-serif text-2xl"
              style={{ color: "var(--gold)", fontWeight: 400 }}
            >
              Download Catalogue
            </DialogTitle>
          </DialogHeader>

          {submitted ? (
            <div
              className="py-8 text-center"
              data-ocid="catalogue_modal.success_state"
            >
              <div className="text-4xl mb-4">✉️</div>
              <p
                className="font-serif text-lg mb-2"
                style={{ color: "var(--gold-light)" }}
              >
                Thank you!
              </p>
              <p className="text-sm text-foreground/60">
                We'll send the catalogue to your email within 24 hours.
              </p>
              <Button
                data-ocid="catalogue_modal.close_button"
                onClick={() => setCatalogueOpen(false)}
                className="mt-6 text-xs tracking-widest uppercase h-10 px-8"
                style={{
                  backgroundColor: "var(--gold)",
                  color: "var(--obsidian)",
                  borderRadius: 0,
                  letterSpacing: "0.12em",
                }}
              >
                Close
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-foreground/60">
                Enter your details and we'll email you our full product
                catalogue.
              </p>
              <div className="flex flex-col gap-2">
                <Label
                  className="section-label"
                  style={{ color: "oklch(0.6 0 0)" }}
                >
                  Name
                </Label>
                <Input
                  data-ocid="catalogue_modal.name_input"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  placeholder="Your full name"
                  style={{
                    backgroundColor: "var(--obsidian)",
                    border: "1px solid oklch(0.25 0 0)",
                    borderRadius: 0,
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  className="section-label"
                  style={{ color: "oklch(0.6 0 0)" }}
                >
                  Email
                </Label>
                <Input
                  data-ocid="catalogue_modal.email_input"
                  type="email"
                  value={catEmail}
                  onChange={(e) => setCatEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={{
                    backgroundColor: "var(--obsidian)",
                    border: "1px solid oklch(0.25 0 0)",
                    borderRadius: 0,
                  }}
                />
              </div>
              <div className="flex gap-3 mt-2">
                <Button
                  data-ocid="catalogue_modal.submit_button"
                  onClick={handleCatalogueSubmit}
                  disabled={submitting}
                  className="flex-1 text-xs tracking-widest uppercase h-10"
                  style={{
                    backgroundColor: "var(--gold)",
                    color: "var(--obsidian)",
                    borderRadius: 0,
                    letterSpacing: "0.12em",
                  }}
                >
                  {submitting && (
                    <Loader2 size={14} className="mr-2 animate-spin" />
                  )}
                  {submitting ? "Sending..." : "Send Catalogue"}
                </Button>
                <Button
                  data-ocid="catalogue_modal.close_button"
                  variant="outline"
                  onClick={() => setCatalogueOpen(false)}
                  className="flex-1 text-xs tracking-widest uppercase h-10"
                  style={{
                    borderColor: "var(--gold)",
                    color: "var(--gold)",
                    borderRadius: 0,
                    letterSpacing: "0.12em",
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

import imgBracelets from "@/assets/generated/product-bracelets.dim_600x600.jpg";
import imgBridal from "@/assets/generated/product-bridal.dim_600x600.jpg";
import imgDetail from "@/assets/generated/product-detail-1.dim_600x600.jpg";
import imgEarrings from "@/assets/generated/product-earrings.dim_600x600.jpg";
import imgFlatlay from "@/assets/generated/product-flatlay.dim_600x600.jpg";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetProducts } from "@/hooks/useQueries";
import { motion } from "motion/react";
import { useState } from "react";

const CATEGORIES = [
  "Necklaces",
  "Earrings",
  "Bracelets",
  "Rings",
  "Bridal",
  "Minimal",
];

const FALLBACK_PRODUCTS: Record<
  string,
  { name: string; desc: string; img: string }[]
> = {
  Necklaces: [
    {
      name: "Layered Gold Necklace",
      desc: "Multi-strand 18K gold-plated layered necklace.",
      img: imgNecklaces,
    },
    {
      name: "Floral Choker Set",
      desc: "Intricate floral motif choker with matching pendant chain.",
      img: imgDetail,
    },
    {
      name: "Statement Collar",
      desc: "Bold collar necklace with kundan stone embellishment.",
      img: imgNecklaces,
    },
    {
      name: "Delicate Pendant Chain",
      desc: "Fine 24-inch chain with teardrop pendant.",
      img: imgMinimal,
    },
  ],
  Earrings: [
    {
      name: "Chandelier Drop Earrings",
      desc: "Dramatic cascading drops with crystal accents.",
      img: imgEarrings,
    },
    {
      name: "Jhumka Classic Set",
      desc: "Traditional Indian jhumka bell earrings in antique gold finish.",
      img: imgEarrings,
    },
    {
      name: "Geometric Stud Pair",
      desc: "Modern hexagonal studs in matte gold.",
      img: imgMinimal,
    },
    {
      name: "Pearl Hoop Earrings",
      desc: "Lustrous faux pearl hoops, a perennial bestseller.",
      img: imgFlatlay,
    },
  ],
  Bracelets: [
    {
      name: "Stacked Bangle Set",
      desc: "Set of 6 bangles in mixed gold tones.",
      img: imgBracelets,
    },
    {
      name: "Cuff Bracelet",
      desc: "Wide cuff with engraved floral pattern.",
      img: imgBracelets,
    },
    {
      name: "Charm Bracelet",
      desc: "Adjustable chain with interchangeable charms.",
      img: imgFlatlay,
    },
    {
      name: "Tennis Bracelet",
      desc: "CZ stone tennis bracelet in white gold finish.",
      img: imgMinimal,
    },
  ],
  Rings: [
    {
      name: "Floral Cocktail Ring",
      desc: "Large statement ring with resin flower and gold finish.",
      img: imgRings,
    },
    {
      name: "Stack Ring Set",
      desc: "Set of 5 thin bands for stacking.",
      img: imgRings,
    },
    {
      name: "Vintage Signet Ring",
      desc: "Oval signet with engraved crest.",
      img: imgDetail,
    },
    {
      name: "Gemstone Solitaire",
      desc: "Faux sapphire solitaire in 4-prong setting.",
      img: imgRings,
    },
  ],
  Bridal: [
    {
      name: "Bridal Necklace Set",
      desc: "Complete bridal set: necklace, earrings, maang tikka.",
      img: imgBridal,
    },
    {
      name: "Kundan Rani Haar",
      desc: "Traditional long rani haar with kundan settings.",
      img: imgBridal,
    },
    {
      name: "Polki Wedding Set",
      desc: "Polki-inspired bridal jewellery in antique gold.",
      img: imgNecklaces,
    },
    {
      name: "Contemporary Bridal",
      desc: "Modern minimalist bridal set for Western weddings.",
      img: imgMinimal,
    },
  ],
  Minimal: [
    {
      name: "Thin Chain Necklace",
      desc: "Delicate 20-inch chain, everyday wear.",
      img: imgMinimal,
    },
    {
      name: "Bar Stud Earrings",
      desc: "Sleek horizontal bar studs.",
      img: imgMinimal,
    },
    {
      name: "Dainty Anklet",
      desc: "Fine anklet chain with tiny star charm.",
      img: imgFlatlay,
    },
    {
      name: "Layering Set Bundle",
      desc: "3-piece layering bundle: necklace, bracelet, ring.",
      img: imgFlatlay,
    },
  ],
};

export default function CollectionsPage() {
  const { data: allProducts, isLoading } = useGetProducts();
  const [inquiryCategory, setInquiryCategory] = useState<string | null>(null);

  const getProductsForCategory = (cat: string) => {
    if (allProducts && allProducts.length > 0) {
      const filtered = allProducts.filter(
        (p) => p.category.toLowerCase() === cat.toLowerCase(),
      );
      if (filtered.length > 0)
        return filtered.map((p) => ({
          name: p.name,
          desc: p.description,
          img: p.imageUrls[0] || imgFlatlay,
        }));
    }
    return FALLBACK_PRODUCTS[cat] ?? [];
  };

  return (
    <div>
      <PageHero
        label="Wholesale Collections"
        title="Our Collections"
        subtitle="Explore 6 curated categories with 10,000+ designs available for wholesale"
      />

      <section style={{ backgroundColor: "var(--obsidian)" }} className="py-16">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="Necklaces">
            <TabsList
              className="flex flex-wrap gap-1 h-auto p-1 mb-12 w-full justify-center"
              style={{
                backgroundColor: "var(--obsidian-mid)",
                borderRadius: 0,
              }}
            >
              {CATEGORIES.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  data-ocid="collections.tab"
                  className="text-xs tracking-widest uppercase px-5 py-2.5 data-[state=active]:text-black"
                  style={{ borderRadius: 0, letterSpacing: "0.12em" }}
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>

            {CATEGORIES.map((cat) => {
              const products = getProductsForCategory(cat);
              return (
                <TabsContent key={cat} value={cat}>
                  {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[1, 2, 3, 4].map((i) => (
                        <Skeleton
                          key={i}
                          className="h-72"
                          style={{ backgroundColor: "oklch(0.18 0 0)" }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {products.map((product, i) => (
                        <motion.div
                          key={product.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.08 }}
                          className="border border-[oklch(0.2_0_0)] hover:border-[var(--gold)] transition-colors duration-300 group"
                        >
                          <div className="overflow-hidden aspect-square relative">
                            <img
                              src={product.img}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              loading="lazy"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = imgFlatlay;
                              }}
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                              <span className="font-serif text-base text-white tracking-wide">
                                {product.name}
                              </span>
                            </div>
                          </div>
                          <div className="p-5">
                            <h3
                              className="font-serif text-base mb-2"
                              style={{
                                color: "var(--gold-light)",
                                fontWeight: 400,
                              }}
                            >
                              {product.name}
                            </h3>
                            <p className="text-xs text-foreground/50 leading-relaxed mb-4">
                              {product.desc}
                            </p>
                            <Button
                              size="sm"
                              data-ocid={`collections.inquiry_button.${i + 1}`}
                              onClick={() =>
                                setInquiryCategory(`${cat} — ${product.name}`)
                              }
                              className="w-full text-xs tracking-widest uppercase h-9"
                              style={{
                                backgroundColor: "transparent",
                                border: "1px solid var(--gold)",
                                color: "var(--gold)",
                                borderRadius: 0,
                                letterSpacing: "0.12em",
                              }}
                            >
                              Wholesale Inquiry
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      {/* Inquiry Modal */}
      <Dialog
        open={!!inquiryCategory}
        onOpenChange={(o) => !o && setInquiryCategory(null)}
      >
        <DialogContent
          data-ocid="inquiry_modal.dialog"
          className="max-w-md"
          style={{
            backgroundColor: "oklch(0.18 0 0)",
            borderColor: "var(--gold)",
            borderRadius: 0,
          }}
        >
          <DialogHeader>
            <DialogTitle
              className="font-serif text-2xl"
              style={{ color: "var(--gold)", fontWeight: 400 }}
            >
              Wholesale Inquiry
            </DialogTitle>
          </DialogHeader>
          <div
            className="text-sm leading-relaxed mb-4"
            style={{ color: "white" }}
          >
            You are inquiring about:{" "}
            <span style={{ color: "var(--gold-light)" }}>
              {inquiryCategory}
            </span>
          </div>
          <p
            className="text-sm mb-6 leading-relaxed"
            style={{ color: "white" }}
          >
            Please use our contact page to send a detailed wholesale inquiry, or
            reach us directly on WhatsApp for fastest response.
          </p>
          <div className="flex gap-3">
            <a
              href={`https://wa.me/917976341419?text=Hello%2C%20I'm%20interested%20in%20wholesale%20inquiry%20for%3A%20${encodeURIComponent(inquiryCategory || "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button
                className="w-full text-xs tracking-widest uppercase h-10"
                style={{
                  backgroundColor: "#25D366",
                  color: "white",
                  borderRadius: 0,
                  letterSpacing: "0.12em",
                }}
              >
                WhatsApp
              </Button>
            </a>
            <Button
              data-ocid="inquiry_modal.close_button"
              variant="outline"
              onClick={() => setInquiryCategory(null)}
              className="flex-1 text-xs tracking-widest uppercase h-10"
              style={{
                borderColor: "var(--gold)",
                color: "var(--gold)",
                borderRadius: 0,
                letterSpacing: "0.12em",
              }}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

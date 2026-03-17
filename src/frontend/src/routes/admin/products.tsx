import { ExternalBlob } from "@/backend";
import type { Product } from "@/backend.d";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { useDeleteProduct, useGetProducts } from "@/hooks/useQueries";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Pencil, Plus, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const CATEGORIES = [
  "Necklaces",
  "Earrings",
  "Bracelets",
  "Rings",
  "Bridal",
  "Minimal",
];

type FormState = {
  name: string;
  description: string;
  category: string;
  moq: string;
  priceRange: string;
  imageUrls: string[];
};

const emptyForm: FormState = {
  name: "",
  description: "",
  category: "",
  moq: "",
  priceRange: "",
  imageUrls: [],
};

export default function AdminProducts() {
  const { data: products, isLoading } = useGetProducts();
  const { actor } = useActor();
  const qc = useQueryClient();
  const deleteMutation = useDeleteProduct();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<bigint | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openAdd = () => {
    setEditProduct(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditProduct(p);
    setForm({
      name: p.name,
      description: p.description,
      category: p.category,
      moq: p.moq,
      priceRange: p.priceRange,
      imageUrls: p.imageUrls,
    });
    setDialogOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadProgress(0);
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) =>
        setUploadProgress(pct),
      );
      const url = blob.getDirectURL();
      setForm((prev) => ({ ...prev, imageUrls: [...prev.imageUrls, url] }));
      toast.success("Image uploaded");
    } catch {
      toast.error("Image upload failed");
    } finally {
      setUploadProgress(null);
    }
  };

  const handleSave = async () => {
    if (!actor) return;
    if (!form.name.trim() || !form.category || !form.moq.trim()) {
      toast.error("Name, category and MOQ are required.");
      return;
    }
    setSaving(true);
    try {
      if (editProduct) {
        await actor.updateProduct(
          editProduct.id,
          form.name,
          form.description,
          form.category,
          form.moq,
          form.priceRange,
          form.imageUrls,
        );
        toast.success("Product updated");
      } else {
        await actor.addProduct(
          form.name,
          form.description,
          form.category,
          form.moq,
          form.priceRange,
          form.imageUrls,
        );
        toast.success("Product added");
      }
      qc.invalidateQueries({ queryKey: ["products"] });
      setDialogOpen(false);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: bigint) => {
    await deleteMutation.mutateAsync(id);
    setDeleteConfirmId(null);
    toast.success("Product deleted");
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
            Products
          </h1>
          <div className="gold-divider-left mt-4" />
        </div>
        <Button
          data-ocid="products.open_modal_button"
          onClick={openAdd}
          className="h-10 text-xs tracking-widest uppercase px-6"
          style={{
            backgroundColor: "var(--gold)",
            color: "var(--obsidian)",
            fontWeight: 500,
            letterSpacing: "0.12em",
            borderRadius: 0,
          }}
        >
          <Plus size={14} className="mr-2" /> Add Product
        </Button>
      </div>

      {isLoading ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          data-ocid="products.loading_state"
        >
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              className="h-48"
              style={{ backgroundColor: "oklch(0.18 0.055 240)" }}
            />
          ))}
        </div>
      ) : !products || products.length === 0 ? (
        <div
          className="text-center py-20 border"
          style={{
            borderColor: "oklch(0.22 0.06 240)",
            backgroundColor: "var(--obsidian-mid)",
          }}
          data-ocid="products.empty_state"
        >
          <p
            className="font-serif text-xl mb-2"
            style={{ color: "var(--gold-light)", fontWeight: 300 }}
          >
            No products yet
          </p>
          <p className="text-sm text-foreground/40 mb-6">
            Add your first jewellery product to the catalogue
          </p>
          <Button
            onClick={openAdd}
            className="h-10 text-xs tracking-widest uppercase px-6"
            style={{
              backgroundColor: "var(--gold)",
              color: "var(--obsidian)",
              borderRadius: 0,
            }}
          >
            <Plus size={14} className="mr-2" /> Add First Product
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((p, i) => (
            <div
              key={String(p.id)}
              data-ocid={`products.card.${i + 1}`}
              className="border flex flex-col"
              style={{
                backgroundColor: "var(--obsidian-mid)",
                borderColor: "oklch(0.22 0.06 240)",
              }}
            >
              {p.imageUrls[0] ? (
                <img
                  src={p.imageUrls[0]}
                  alt={p.name}
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/assets/jewellery-hero.jpg";
                  }}
                />
              ) : (
                <div
                  className="w-full h-40 flex items-center justify-center"
                  style={{ backgroundColor: "oklch(0.14 0.03 240)" }}
                >
                  <span className="text-foreground/20 text-xs tracking-widest uppercase">
                    No Image
                  </span>
                </div>
              )}
              <div className="p-4 flex-1 flex flex-col">
                <p
                  className="font-serif text-base mb-1"
                  style={{ color: "var(--gold-light)", fontWeight: 400 }}
                >
                  {p.name}
                </p>
                <p className="text-xs text-foreground/40 mb-2">{p.category}</p>
                {p.priceRange && (
                  <p
                    className="text-xs mb-1"
                    style={{ color: "var(--gold)", opacity: 0.85 }}
                  >
                    {p.priceRange}
                  </p>
                )}
                <p className="text-xs text-foreground/40 mb-3">MOQ: {p.moq}</p>
                <div className="flex gap-2 mt-auto">
                  <Button
                    data-ocid={`products.edit_button.${i + 1}`}
                    size="sm"
                    variant="outline"
                    onClick={() => openEdit(p)}
                    className="flex-1 h-8 text-xs"
                    style={{
                      borderColor: "oklch(0.3 0.06 240)",
                      color: "oklch(0.65 0 0)",
                      borderRadius: 0,
                    }}
                  >
                    <Pencil size={12} className="mr-1" /> Edit
                  </Button>
                  <Button
                    data-ocid={`products.delete_button.${i + 1}`}
                    size="sm"
                    variant="outline"
                    onClick={() => setDeleteConfirmId(p.id)}
                    className="h-8 text-xs px-3"
                    style={{
                      borderColor: "oklch(0.4 0.15 29)",
                      color: "oklch(0.65 0.15 29)",
                      borderRadius: 0,
                    }}
                  >
                    <Trash2 size={12} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          data-ocid="products.dialog"
          className="max-w-lg"
          style={{
            backgroundColor: "var(--obsidian-mid)",
            borderColor: "oklch(0.30 0.06 240)",
            borderRadius: 0,
          }}
        >
          <DialogHeader>
            <DialogTitle
              className="font-serif text-xl"
              style={{ color: "var(--gold)", fontWeight: 400 }}
            >
              {editProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-2">
            <div className="flex flex-col gap-1.5">
              <Label
                className="section-label"
                style={{ color: "oklch(0.55 0 0)" }}
              >
                Product Name *
              </Label>
              <Input
                data-ocid="products.input"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="e.g. Layered Gold Necklace"
                style={{
                  backgroundColor: "var(--obsidian)",
                  borderColor: "oklch(0.30 0.06 240)",
                  borderRadius: 0,
                }}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                className="section-label"
                style={{ color: "oklch(0.55 0 0)" }}
              >
                Description
              </Label>
              <Textarea
                data-ocid="products.textarea"
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                placeholder="Describe the product..."
                rows={3}
                style={{
                  backgroundColor: "var(--obsidian)",
                  borderColor: "oklch(0.30 0.06 240)",
                  borderRadius: 0,
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label
                  className="section-label"
                  style={{ color: "oklch(0.55 0 0)" }}
                >
                  Category *
                </Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm((p) => ({ ...p, category: v }))}
                >
                  <SelectTrigger
                    data-ocid="products.select"
                    style={{
                      backgroundColor: "var(--obsidian)",
                      borderColor: "oklch(0.30 0.06 240)",
                      borderRadius: 0,
                    }}
                  >
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      backgroundColor: "var(--obsidian-mid)",
                      borderColor: "oklch(0.30 0.06 240)",
                      borderRadius: 0,
                    }}
                  >
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label
                  className="section-label"
                  style={{ color: "oklch(0.55 0 0)" }}
                >
                  MOQ *
                </Label>
                <Input
                  value={form.moq}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, moq: e.target.value }))
                  }
                  placeholder="e.g. 50 pieces"
                  style={{
                    backgroundColor: "var(--obsidian)",
                    borderColor: "oklch(0.30 0.06 240)",
                    borderRadius: 0,
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                className="section-label"
                style={{ color: "oklch(0.55 0 0)" }}
              >
                Price Range
              </Label>
              <Input
                value={form.priceRange}
                onChange={(e) =>
                  setForm((p) => ({ ...p, priceRange: e.target.value }))
                }
                placeholder="e.g. ₹200–₹500 per piece"
                style={{
                  backgroundColor: "var(--obsidian)",
                  borderColor: "oklch(0.30 0.06 240)",
                  borderRadius: 0,
                }}
              />
            </div>

            {/* Image upload */}
            <div className="flex flex-col gap-1.5">
              <Label
                className="section-label"
                style={{ color: "oklch(0.55 0 0)" }}
              >
                Product Images
              </Label>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                data-ocid="products.upload_button"
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadProgress !== null}
                className="h-10 text-xs tracking-widest uppercase"
                style={{
                  borderColor: "oklch(0.3 0 0)",
                  color: "oklch(0.65 0 0)",
                  borderRadius: 0,
                }}
              >
                {uploadProgress !== null ? (
                  <>
                    <Loader2 size={13} className="mr-2 animate-spin" />{" "}
                    Uploading {uploadProgress}%
                  </>
                ) : (
                  <>
                    <Upload size={13} className="mr-2" /> Upload Image
                  </>
                )}
              </Button>
              {form.imageUrls.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {form.imageUrls.map((url, idx) => (
                    <div key={url} className="relative w-16 h-16">
                      <img
                        src={url}
                        alt="product"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setForm((p) => ({
                            ...p,
                            imageUrls: p.imageUrls.filter((_, i) => i !== idx),
                          }))
                        }
                        className="absolute -top-1.5 -right-1.5 w-4 h-4 text-white text-xs flex items-center justify-center"
                        style={{ backgroundColor: "oklch(0.45 0.2 29)" }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="mt-2 gap-2">
            <Button
              data-ocid="products.cancel_button"
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="text-xs tracking-widest uppercase h-10 px-6"
              style={{
                borderColor: "oklch(0.3 0 0)",
                color: "oklch(0.55 0 0)",
                borderRadius: 0,
              }}
            >
              Cancel
            </Button>
            <Button
              data-ocid="products.save_button"
              onClick={handleSave}
              disabled={saving}
              className="text-xs tracking-widest uppercase h-10 px-6"
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
                "Save Product"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog
        open={deleteConfirmId !== null}
        onOpenChange={() => setDeleteConfirmId(null)}
      >
        <DialogContent
          data-ocid="products.delete_dialog"
          className="max-w-sm"
          style={{
            backgroundColor: "var(--obsidian-mid)",
            borderColor: "oklch(0.30 0.06 240)",
            borderRadius: 0,
          }}
        >
          <DialogHeader>
            <DialogTitle
              className="font-serif text-xl"
              style={{ color: "oklch(0.7 0.15 29)", fontWeight: 400 }}
            >
              Delete Product
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-foreground/60 mt-2">
            Are you sure you want to delete this product? This cannot be undone.
          </p>
          <DialogFooter className="mt-4 gap-2">
            <Button
              data-ocid="products.cancel_button"
              variant="outline"
              onClick={() => setDeleteConfirmId(null)}
              className="text-xs h-9 px-5"
              style={{
                borderColor: "oklch(0.3 0 0)",
                color: "oklch(0.55 0 0)",
                borderRadius: 0,
              }}
            >
              Cancel
            </Button>
            <Button
              data-ocid="products.confirm_button"
              onClick={() =>
                deleteConfirmId !== null && handleDelete(deleteConfirmId)
              }
              disabled={deleteMutation.isPending}
              className="text-xs h-9 px-5"
              style={{
                backgroundColor: "oklch(0.55 0.22 29)",
                color: "white",
                borderRadius: 0,
              }}
            >
              {deleteMutation.isPending ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

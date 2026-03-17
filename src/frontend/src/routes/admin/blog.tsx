import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { useDeleteBlogPost, useGetAllBlogPostsAdmin } from "@/hooks/useQueries";
import { useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  Edit2,
  Loader2,
  PenSquare,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { BlogPost } from "../../backend.d";

const EMPTY_FORM = {
  title: "",
  slug: "",
  author: "Gemora Global",
  excerpt: "",
  coverImageUrl: "",
  tags: "",
  content: "",
  isPublished: false,
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function formatDate(createdAt: bigint): string {
  return new Date(Number(createdAt) / 1_000_000).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminBlog() {
  const { data: posts, isLoading } = useGetAllBlogPostsAdmin();
  const { actor } = useActor();
  const qc = useQueryClient();
  const deleteMutation = useDeleteBlogPost();

  const [showForm, setShowForm] = useState(false);
  const [editPost, setEditPost] = useState<BlogPost | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<bigint | null>(null);

  useEffect(() => {
    if (editPost) {
      setForm({
        title: editPost.title,
        slug: editPost.slug,
        author: editPost.author,
        excerpt: editPost.excerpt,
        coverImageUrl: editPost.coverImageUrl,
        tags: editPost.tags.join(", "),
        content: editPost.content,
        isPublished: editPost.isPublished,
      });
      setShowForm(true);
    }
  }, [editPost]);

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({
      ...prev,
      title,
      slug: editPost ? prev.slug : slugify(title),
    }));
  };

  const resetForm = () => {
    setForm({ ...EMPTY_FORM });
    setEditPost(null);
    setShowForm(false);
  };

  const handleSave = async () => {
    if (!actor) return;
    if (!form.title.trim() || !form.slug.trim()) {
      toast.error("Title and slug are required");
      return;
    }
    setSaving(true);
    try {
      const tags = form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      if (editPost) {
        await actor.updateBlogPost(
          editPost.id,
          form.title,
          form.slug,
          form.excerpt,
          form.content,
          form.coverImageUrl,
          form.author,
          tags,
          form.isPublished,
        );
        toast.success("Post updated");
      } else {
        await actor.addBlogPost(
          form.title,
          form.slug,
          form.excerpt,
          form.content,
          form.coverImageUrl,
          form.author,
          tags,
          form.isPublished,
        );
        toast.success("Post created");
      }
      qc.invalidateQueries({ queryKey: ["blogPostsAdmin"] });
      qc.invalidateQueries({ queryKey: ["blogPosts"] });
      resetForm();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to save";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Post deleted");
      setDeleteConfirm(null);
    } catch {
      toast.error("Failed to delete post");
    }
  };

  const inputClass =
    "bg-white text-gray-800 border-gray-200 rounded-none text-sm placeholder:text-gray-400 focus:border-[#C6A55C]";
  const labelClass =
    "text-xs font-medium text-gray-600 uppercase tracking-wide";

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="section-label mb-2">Content</p>
          <h1
            className="font-serif text-3xl"
            style={{ color: "var(--gold)", fontWeight: 300 }}
          >
            Blog Posts
          </h1>
          <div className="gold-divider-left mt-4" />
        </div>
        {!showForm && (
          <Button
            data-ocid="admin_blog.new_post_button"
            onClick={() => {
              setEditPost(null);
              setForm({ ...EMPTY_FORM });
              setShowForm(true);
            }}
            className="h-10 text-xs tracking-widest uppercase px-5 flex items-center gap-2"
            style={{
              backgroundColor: "var(--gold)",
              color: "var(--obsidian)",
              borderRadius: 0,
              letterSpacing: "0.12em",
            }}
          >
            <Plus size={14} /> New Post
          </Button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-lg text-gray-800">
              <PenSquare size={16} className="inline mr-2 text-[#C6A55C]" />
              {editPost ? "Edit Post" : "New Blog Post"}
            </h2>
            <button
              type="button"
              onClick={resetForm}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label className={labelClass}>Title *</Label>
              <Input
                data-ocid="admin_blog.input"
                className={inputClass}
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Post title"
              />
            </div>
            <div className="space-y-1.5">
              <Label className={labelClass}>Slug *</Label>
              <Input
                data-ocid="admin_blog.input"
                className={inputClass}
                value={form.slug}
                onChange={(e) =>
                  setForm((p) => ({ ...p, slug: e.target.value }))
                }
                placeholder="post-url-slug"
              />
            </div>
            <div className="space-y-1.5">
              <Label className={labelClass}>Author</Label>
              <Input
                data-ocid="admin_blog.input"
                className={inputClass}
                value={form.author}
                onChange={(e) =>
                  setForm((p) => ({ ...p, author: e.target.value }))
                }
                placeholder="Gemora Global"
              />
            </div>
            <div className="space-y-1.5">
              <Label className={labelClass}>Cover Image URL</Label>
              <Input
                data-ocid="admin_blog.input"
                className={inputClass}
                value={form.coverImageUrl}
                onChange={(e) =>
                  setForm((p) => ({ ...p, coverImageUrl: e.target.value }))
                }
                placeholder="https://..."
              />
            </div>
            <div className="space-y-1.5">
              <Label className={labelClass}>Tags (comma-separated)</Label>
              <Input
                data-ocid="admin_blog.input"
                className={inputClass}
                value={form.tags}
                onChange={(e) =>
                  setForm((p) => ({ ...p, tags: e.target.value }))
                }
                placeholder="jewellery, export, trends"
              />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <Switch
                data-ocid="admin_blog.published_switch"
                checked={form.isPublished}
                onCheckedChange={(v) =>
                  setForm((p) => ({ ...p, isPublished: v }))
                }
              />
              <Label className={labelClass}>Published</Label>
            </div>
          </div>

          <div className="space-y-1.5 mt-5">
            <Label className={labelClass}>Excerpt</Label>
            <Textarea
              data-ocid="admin_blog.textarea"
              className={inputClass}
              value={form.excerpt}
              onChange={(e) =>
                setForm((p) => ({ ...p, excerpt: e.target.value }))
              }
              rows={2}
              placeholder="Short description of the post..."
            />
          </div>

          <div className="space-y-1.5 mt-5">
            <Label className={labelClass}>Content (HTML supported)</Label>
            <Textarea
              data-ocid="admin_blog.textarea"
              className={inputClass}
              value={form.content}
              onChange={(e) =>
                setForm((p) => ({ ...p, content: e.target.value }))
              }
              rows={10}
              placeholder="<p>Write your blog post content here. You can use HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;strong&gt; etc.</p>"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={resetForm}
              className="text-xs tracking-wide rounded-none"
            >
              Cancel
            </Button>
            <Button
              data-ocid="admin_blog.save_button"
              onClick={handleSave}
              disabled={saving}
              className="text-xs tracking-widest uppercase px-6 rounded-none"
              style={{ backgroundColor: "#C6A55C", color: "#fff" }}
            >
              {saving ? (
                <>
                  <Loader2 size={12} className="mr-2 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save size={12} className="mr-2" /> Save Post
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Posts list */}
      {isLoading ? (
        <div
          className="flex flex-col gap-3"
          data-ocid="admin_blog.loading_state"
        >
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              className="h-16"
              style={{ backgroundColor: "oklch(0.18 0.055 240)" }}
            />
          ))}
        </div>
      ) : !posts || posts.length === 0 ? (
        <div
          className="text-center py-16 border border-[oklch(0.28_0.065_240)]"
          data-ocid="admin_blog.empty_state"
        >
          <p className="text-foreground/50 text-sm">No blog posts yet.</p>
          <p className="text-foreground/30 text-xs mt-1">
            Click "New Post" to write your first article.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Title
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide hidden md:table-cell">
                  Author
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide hidden lg:table-cell">
                  Date
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Status
                </th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {posts.map((post, i) => (
                <tr
                  key={String(post.id)}
                  data-ocid={`admin_blog.post_item.${i + 1}`}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-gray-800 line-clamp-1">
                      {post.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      /blog/{post.slug}
                    </p>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-xs text-gray-600">{post.author}</span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar size={10} />
                      {formatDate(post.createdAt)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Badge
                      className="text-xs rounded-none font-normal"
                      style={{
                        backgroundColor: post.isPublished
                          ? "#dcfce7"
                          : "#f3f4f6",
                        color: post.isPublished ? "#166534" : "#6b7280",
                        border: "none",
                      }}
                    >
                      {post.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      {deleteConfirm === post.id ? (
                        <>
                          <span className="text-xs text-gray-500">Delete?</span>
                          <Button
                            size="sm"
                            data-ocid={`admin_blog.delete_button.${i + 1}`}
                            onClick={() => handleDelete(post.id)}
                            className="h-7 text-xs px-2 rounded-none bg-red-500 hover:bg-red-600 text-white"
                          >
                            Yes
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDeleteConfirm(null)}
                            className="h-7 text-xs px-2 rounded-none"
                          >
                            No
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditPost(post)}
                            className="h-7 w-7 p-0 text-gray-400 hover:text-[#C6A55C]"
                          >
                            <Edit2 size={13} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            data-ocid={`admin_blog.delete_button.${i + 1}`}
                            onClick={() => setDeleteConfirm(post.id)}
                            className="h-7 w-7 p-0 text-gray-400 hover:text-red-500"
                          >
                            <Trash2 size={13} />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

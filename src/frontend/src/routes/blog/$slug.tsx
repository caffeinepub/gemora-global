import { Skeleton } from "@/components/ui/skeleton";
import { useGetBlogPostBySlug } from "@/hooks/useQueries";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import { motion } from "motion/react";

function formatDate(createdAt: bigint): string {
  return new Date(Number(createdAt) / 1_000_000).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPostPage() {
  const { slug } = useParams({ strict: false }) as { slug: string };
  const { data: post, isLoading } = useGetBlogPostBySlug(slug);

  if (isLoading) {
    return (
      <div
        className="min-h-screen py-24"
        style={{ backgroundColor: "var(--obsidian)" }}
        data-ocid="blog_post.loading_state"
      >
        <div className="container mx-auto px-6 max-w-3xl">
          <Skeleton
            className="h-8 w-48 mb-8"
            style={{ backgroundColor: "oklch(0.18 0.055 240)" }}
          />
          <Skeleton
            className="h-64 w-full mb-8"
            style={{ backgroundColor: "oklch(0.18 0.055 240)" }}
          />
          <Skeleton
            className="h-6 w-3/4 mb-4"
            style={{ backgroundColor: "oklch(0.18 0.055 240)" }}
          />
          <Skeleton
            className="h-4 w-full mb-2"
            style={{ backgroundColor: "oklch(0.18 0.055 240)" }}
          />
          <Skeleton
            className="h-4 w-5/6"
            style={{ backgroundColor: "oklch(0.18 0.055 240)" }}
          />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--obsidian)" }}
        data-ocid="blog_post.error_state"
      >
        <div className="text-center">
          <p
            className="font-serif text-3xl mb-4"
            style={{ color: "var(--gold)", fontWeight: 300 }}
          >
            Post Not Found
          </p>
          <p className="text-foreground/50 text-sm mb-8">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/blog"
            className="text-xs tracking-widest uppercase px-6 py-3 inline-block"
            style={{
              backgroundColor: "var(--gold)",
              color: "var(--obsidian)",
              letterSpacing: "0.15em",
            }}
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      data-ocid="blog_post.page"
      style={{ backgroundColor: "var(--obsidian)" }}
    >
      {/* Cover image */}
      {post.coverImageUrl && (
        <div
          className="w-full h-64 md:h-96 overflow-hidden"
          style={{
            backgroundImage: `url('${post.coverImageUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      <div className="container mx-auto px-6 max-w-3xl py-16">
        {/* Breadcrumb */}
        <Link
          to="/blog"
          className="flex items-center gap-2 text-xs tracking-wider uppercase mb-8 hover:text-[var(--gold)] transition-colors"
          style={{ color: "oklch(0.50 0.02 240)", letterSpacing: "0.12em" }}
        >
          <ArrowLeft size={12} />
          Back to Blog
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 text-xs px-2 py-1"
                  style={{
                    backgroundColor: "oklch(0.72 0.12 78 / 0.12)",
                    color: "var(--gold-light)",
                    border: "1px solid oklch(0.72 0.12 78 / 0.25)",
                  }}
                >
                  <Tag size={9} />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1
            className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight"
            style={{ color: "var(--gold-light)", fontWeight: 300 }}
          >
            {post.title}
          </h1>

          <div className="gold-divider-left mb-6" />

          {/* Meta */}
          <div className="flex items-center gap-6 text-xs text-foreground/40 mb-10">
            <span className="flex items-center gap-1.5">
              <User size={12} />
              {post.author || "Gemora Global"}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {formatDate(post.createdAt)}
            </span>
          </div>

          {/* Excerpt */}
          {post.excerpt && (
            <p
              className="text-base text-foreground/70 leading-relaxed mb-8 italic border-l-2 pl-4"
              style={{ borderColor: "var(--gold)" }}
            >
              {post.excerpt}
            </p>
          )}

          {/* Content */}
          <div
            className="prose-blog"
            style={{
              color: "rgba(255,255,255,0.75)",
              lineHeight: "1.8",
              fontSize: "0.95rem",
            }}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: admin-controlled content
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>
      </div>
    </div>
  );
}

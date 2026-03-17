import PageHero from "@/components/PageHero";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPublishedBlogPosts } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { Calendar, User } from "lucide-react";
import { motion } from "motion/react";

function formatDate(createdAt: bigint): string {
  return new Date(Number(createdAt) / 1_000_000).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogListPage() {
  const { data: posts, isLoading } = useGetPublishedBlogPosts();

  const sorted = posts
    ? [...posts].sort((a, b) => Number(b.createdAt - a.createdAt))
    : [];

  return (
    <div>
      <PageHero
        label="Insights & News"
        title="Blog"
        subtitle="Industry news, export tips, and jewellery trends"
      />

      <section style={{ backgroundColor: "var(--obsidian)" }} className="py-20">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              data-ocid="blog.loading_state"
            >
              {[1, 2, 3].map((i) => (
                <Skeleton
                  key={i}
                  className="h-80 rounded-none"
                  style={{ backgroundColor: "oklch(0.18 0.055 240)" }}
                />
              ))}
            </div>
          ) : sorted.length === 0 ? (
            <div
              className="text-center py-24 border border-[oklch(0.28_0.065_240)]"
              data-ocid="blog.empty_state"
            >
              <p
                className="font-serif text-2xl mb-3"
                style={{ color: "var(--gold)", fontWeight: 300 }}
              >
                Coming Soon
              </p>
              <p className="text-sm text-foreground/50">
                No posts published yet. Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sorted.map((post, i) => (
                <motion.div
                  key={String(post.id)}
                  data-ocid={`blog.post_card.${i + 1}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group border border-[oklch(0.28_0.065_240)] hover:border-[var(--gold)] transition-colors duration-300"
                >
                  <Link to="/blog/$slug" params={{ slug: post.slug }}>
                    <div className="overflow-hidden aspect-video relative">
                      {post.coverImageUrl ? (
                        <img
                          src={post.coverImageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      ) : (
                        <div
                          className="w-full h-full"
                          style={{
                            background:
                              "linear-gradient(135deg, oklch(0.20 0.055 240) 0%, oklch(0.72 0.12 78 / 0.15) 100%)",
                          }}
                        />
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            className="text-xs px-2 py-0.5 font-normal rounded-none"
                            style={{
                              backgroundColor: "oklch(0.72 0.12 78 / 0.15)",
                              color: "var(--gold-light)",
                              border: "1px solid oklch(0.72 0.12 78 / 0.3)",
                            }}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h3
                        className="font-serif text-lg mb-2 leading-snug group-hover:text-[var(--gold)] transition-colors"
                        style={{ color: "var(--gold-light)", fontWeight: 400 }}
                      >
                        {post.title}
                      </h3>
                      <p className="text-xs text-foreground/50 leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt ||
                          post.content.replace(/<[^>]+>/g, "").slice(0, 150)}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-foreground/40">
                        <span className="flex items-center gap-1">
                          <User size={10} />
                          {post.author || "Gemora Global"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={10} />
                          {formatDate(post.createdAt)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

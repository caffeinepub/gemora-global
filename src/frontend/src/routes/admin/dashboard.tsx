import {
  useGetAllCatalogueRequests,
  useGetAllInquiries,
  useGetProducts,
} from "@/hooks/useQueries";
import { BookMarked, Inbox, Package, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

export default function AdminDashboard() {
  const { data: products } = useGetProducts();
  const { data: inquiries } = useGetAllInquiries();
  const { data: catalogueRequests } = useGetAllCatalogueRequests();

  const unread = inquiries?.filter((i) => !i.isRead).length ?? 0;

  const stats = [
    {
      label: "Total Products",
      value: products?.length ?? 0,
      icon: Package,
      ocid: "dashboard.products_card",
    },
    {
      label: "Total Inquiries",
      value: inquiries?.length ?? 0,
      icon: Inbox,
      sub: unread > 0 ? `${unread} unread` : undefined,
      ocid: "dashboard.inquiries_card",
    },
    {
      label: "Catalogue Requests",
      value: catalogueRequests?.length ?? 0,
      icon: BookMarked,
      ocid: "dashboard.catalogue_card",
    },
    {
      label: "Categories",
      value: 6,
      icon: TrendingUp,
      ocid: "dashboard.categories_card",
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-10">
        <p className="section-label mb-2">Overview</p>
        <h1
          className="font-serif text-3xl"
          style={{ color: "var(--gold)", fontWeight: 300 }}
        >
          Dashboard
        </h1>
        <div className="gold-divider-left mt-4" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            data-ocid={stat.ocid}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="p-6 border"
            style={{
              backgroundColor: "var(--obsidian-mid)",
              borderColor: "oklch(0.22 0 0)",
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <stat.icon size={20} style={{ color: "var(--gold)" }} />
            </div>
            <p
              className="font-serif text-3xl"
              style={{ color: "var(--gold-light)", fontWeight: 300 }}
            >
              {stat.value}
            </p>
            <p className="text-xs text-foreground/50 mt-1 tracking-wide">
              {stat.label}
            </p>
            {stat.sub && (
              <p
                className="text-xs mt-1"
                style={{ color: "oklch(0.72 0.12 78)" }}
              >
                {stat.sub}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Recent Inquiries */}
      <div
        className="border p-6"
        style={{
          backgroundColor: "var(--obsidian-mid)",
          borderColor: "oklch(0.22 0 0)",
        }}
      >
        <h2
          className="font-serif text-xl mb-4"
          style={{ color: "var(--gold-light)", fontWeight: 400 }}
        >
          Recent Inquiries
        </h2>
        {!inquiries || inquiries.length === 0 ? (
          <p
            className="text-sm text-foreground/40 py-8 text-center"
            data-ocid="dashboard.inquiries_empty_state"
          >
            No inquiries yet.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {inquiries.slice(0, 5).map((inq) => (
              <div
                key={`${inq.email}-${String(inq.timestamp)}`}
                className="flex items-center justify-between px-4 py-3 border-b text-sm"
                style={{
                  borderColor: "oklch(0.2 0 0)",
                  backgroundColor: !inq.isRead
                    ? "oklch(0.14 0.01 78)"
                    : "transparent",
                }}
              >
                <div>
                  <span style={{ color: "var(--gold-light)" }}>{inq.name}</span>
                  <span className="text-foreground/40 ml-2 text-xs">
                    {inq.email}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-foreground/40">
                    {inq.country}
                  </span>
                  {!inq.isRead && (
                    <span
                      className="text-xs px-2 py-0.5"
                      style={{
                        backgroundColor: "var(--gold)",
                        color: "var(--obsidian)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.1em",
                      }}
                    >
                      NEW
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

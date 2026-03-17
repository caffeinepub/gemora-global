import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetAllCatalogueRequests,
  useGetAllInquiries,
  useGetProducts,
} from "@/hooks/useQueries";
import {
  BarChart3,
  BookMarked,
  Inbox,
  MessageCircle,
  Package,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function isToday(ts: bigint) {
  const d = new Date(Number(ts) / 1_000_000);
  const now = new Date();
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
}

export default function AdminAnalytics() {
  const { data: products, isLoading: pLoading } = useGetProducts();
  const { data: inquiries, isLoading: iLoading } = useGetAllInquiries();
  const { data: catalogueReqs, isLoading: cLoading } =
    useGetAllCatalogueRequests();

  const isLoading = pLoading || iLoading || cLoading;

  const totalProducts = products?.length ?? 0;
  const totalLeads = inquiries?.length ?? 0;
  const waLeads = inquiries?.filter((i) => i.whatsappNumber).length ?? 0;
  const catalogueCount = catalogueReqs?.length ?? 0;
  const unreadCount = inquiries?.filter((i) => !i.isRead).length ?? 0;
  const todayCount = inquiries?.filter((i) => isToday(i.timestamp)).length ?? 0;

  // Country breakdown
  const countryMap: Record<string, number> = {};
  for (const inq of inquiries ?? []) {
    if (inq.country)
      countryMap[inq.country] = (countryMap[inq.country] ?? 0) + 1;
  }
  const countryRanked = Object.entries(countryMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // Lead type breakdown
  const wholesaleCount =
    inquiries?.filter((i) => String(i.inquiryType) === "wholesale").length ?? 0;
  const catInquiryCount =
    inquiries?.filter((i) => String(i.inquiryType) === "catalogue").length ?? 0;
  const generalCount =
    inquiries?.filter((i) => String(i.inquiryType) === "general").length ?? 0;
  const maxType = Math.max(wholesaleCount, catInquiryCount, generalCount, 1);

  // Product category breakdown
  const catMap: Record<string, number> = {};
  for (const p of products ?? []) {
    if (p.category) catMap[p.category] = (catMap[p.category] ?? 0) + 1;
  }
  const catRanked = Object.entries(catMap).sort((a, b) => b[1] - a[1]);

  const kpiCards = [
    {
      label: "Total Products",
      value: totalProducts,
      icon: Package,
      color: "var(--gold)",
    },
    {
      label: "Total Leads",
      value: totalLeads,
      icon: Inbox,
      color: "var(--gold)",
    },
    {
      label: "WhatsApp Leads",
      value: waLeads,
      icon: MessageCircle,
      color: "oklch(0.65 0.2 145)",
    },
    {
      label: "Catalogue Requests",
      value: catalogueCount,
      icon: BookMarked,
      color: "oklch(0.65 0.14 240)",
    },
    {
      label: "Unread Leads",
      value: unreadCount,
      icon: TrendingUp,
      color: "oklch(0.72 0.12 78)",
    },
    {
      label: "Today's Leads",
      value: todayCount,
      icon: BarChart3,
      color: "oklch(0.65 0.16 200)",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-10">
        <p className="section-label mb-2">Insights</p>
        <h1
          className="font-serif text-3xl"
          style={{ color: "var(--gold)", fontWeight: 300 }}
        >
          Analytics
        </h1>
        <div className="gold-divider-left mt-4" />
      </div>

      {isLoading ? (
        <div
          className="grid grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="analytics.loading_state"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton
              key={i}
              className="h-24"
              style={{ backgroundColor: "oklch(0.18 0.055 240)" }}
            />
          ))}
        </div>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {kpiCards.map((card, i) => (
              <motion.div
                key={card.label}
                data-ocid={`analytics.card.${i + 1}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="border p-5"
                style={{
                  backgroundColor: "var(--obsidian-mid)",
                  borderColor: "oklch(0.22 0.06 240)",
                }}
              >
                <card.icon
                  size={18}
                  style={{ color: card.color, opacity: 0.7 }}
                  className="mb-3"
                />
                <p
                  className="font-serif text-3xl"
                  style={{ color: card.color, fontWeight: 300 }}
                >
                  {card.value}
                </p>
                <p className="text-xs text-foreground/40 mt-1 tracking-wide">
                  {card.label}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lead Type Breakdown */}
            <div
              className="border p-6"
              style={{
                backgroundColor: "var(--obsidian-mid)",
                borderColor: "oklch(0.22 0.06 240)",
              }}
            >
              <h2
                className="font-serif text-base mb-5"
                style={{ color: "var(--gold-light)", fontWeight: 400 }}
              >
                Lead Type Breakdown
              </h2>
              <div className="flex flex-col gap-4">
                {[
                  {
                    label: "Wholesale",
                    count: wholesaleCount,
                    color: "oklch(0.55 0.18 78)",
                  },
                  {
                    label: "Catalogue",
                    count: catInquiryCount,
                    color: "oklch(0.55 0.16 240)",
                  },
                  {
                    label: "General",
                    count: generalCount,
                    color: "oklch(0.55 0.12 150)",
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-foreground/50 tracking-wide">
                        {item.label}
                      </span>
                      <span className="text-xs" style={{ color: item.color }}>
                        {item.count}
                      </span>
                    </div>
                    <div
                      className="h-1.5 w-full"
                      style={{ backgroundColor: "oklch(0.18 0.03 240)" }}
                    >
                      <motion.div
                        className="h-full"
                        style={{ backgroundColor: item.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.count / maxType) * 100}%` }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Country Breakdown */}
            <div
              className="border p-6"
              style={{
                backgroundColor: "var(--obsidian-mid)",
                borderColor: "oklch(0.22 0.06 240)",
              }}
            >
              <h2
                className="font-serif text-base mb-5"
                style={{ color: "var(--gold-light)", fontWeight: 400 }}
              >
                Top Countries
              </h2>
              {countryRanked.length === 0 ? (
                <p className="text-xs text-foreground/30">No data yet</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {countryRanked.map(([country, count], i) => (
                    <div
                      key={country}
                      data-ocid={`analytics.row.${i + 1}`}
                      className="flex items-center justify-between py-1.5 border-b text-xs"
                      style={{ borderColor: "oklch(0.2 0.04 240)" }}
                    >
                      <span className="text-foreground/60">
                        <span className="mr-2 text-base">
                          {getFlagEmoji(country)}
                        </span>
                        {country}
                      </span>
                      <span style={{ color: "var(--gold)" }}>
                        {count} lead{count !== 1 ? "s" : ""}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Top Product Categories */}
            <div
              className="border p-6"
              style={{
                backgroundColor: "var(--obsidian-mid)",
                borderColor: "oklch(0.22 0.06 240)",
              }}
            >
              <h2
                className="font-serif text-base mb-5"
                style={{ color: "var(--gold-light)", fontWeight: 400 }}
              >
                Products by Category
              </h2>
              {catRanked.length === 0 ? (
                <p className="text-xs text-foreground/30">No products yet</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {catRanked.map(([cat, count], i) => (
                    <div
                      key={cat}
                      data-ocid={`analytics.row.${i + 1}`}
                      className="flex items-center justify-between py-1.5 border-b text-xs"
                      style={{ borderColor: "oklch(0.2 0.04 240)" }}
                    >
                      <span className="text-foreground/60">{cat}</span>
                      <span style={{ color: "var(--gold)" }}>
                        {count} item{count !== 1 ? "s" : ""}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div
            className="border p-6 mt-6"
            style={{
              backgroundColor: "var(--obsidian-mid)",
              borderColor: "oklch(0.22 0.06 240)",
            }}
          >
            <h2
              className="font-serif text-base mb-5"
              style={{ color: "var(--gold-light)", fontWeight: 400 }}
            >
              Recent Activity
            </h2>
            {!inquiries || inquiries.length === 0 ? (
              <p
                className="text-xs text-foreground/30"
                data-ocid="analytics.empty_state"
              >
                No leads yet.
              </p>
            ) : (
              <div className="flex flex-col gap-0">
                {inquiries.slice(0, 10).map((inq, i) => (
                  <div
                    key={`${inq.email}-${String(inq.timestamp)}`}
                    data-ocid={`analytics.item.${i + 1}`}
                    className="flex items-center gap-3 py-2.5 border-b text-xs"
                    style={{ borderColor: "oklch(0.2 0.04 240)" }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{
                        backgroundColor: !inq.isRead
                          ? "var(--gold)"
                          : "oklch(0.3 0 0)",
                      }}
                    />
                    <span style={{ color: "var(--gold-light)" }}>
                      {inq.name}
                    </span>
                    <span className="text-foreground/40">{inq.country}</span>
                    <span
                      className="px-1.5 py-0.5 text-xs"
                      style={{
                        backgroundColor: "oklch(0.18 0.055 240)",
                        color: "var(--gold)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {String(inq.inquiryType)}
                    </span>
                    <span className="ml-auto text-foreground/30">
                      {formatDate(inq.timestamp)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function getFlagEmoji(country: string): string {
  const map: Record<string, string> = {
    France: "🇫🇷",
    UAE: "🇦🇪",
    USA: "🇺🇸",
    UK: "🇬🇧",
    Germany: "🇩🇪",
    Italy: "🇮🇹",
    Spain: "🇪🇸",
    Australia: "🇦🇺",
    Canada: "🇨🇦",
    India: "🇮🇳",
    Japan: "🇯🇵",
    China: "🇨🇳",
    Brazil: "🇧🇷",
    Netherlands: "🇳🇱",
    Belgium: "🇧🇪",
    Switzerland: "🇨🇭",
    Singapore: "🇸🇬",
    "Saudi Arabia": "🇸🇦",
    Qatar: "🇶🇦",
    Kuwait: "🇰🇼",
  };
  return map[country] ?? "🌍";
}

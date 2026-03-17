import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllInquiries, useMarkInquiryRead } from "@/hooks/useQueries";
import { CheckCircle, Mail, MessageCircle, Phone, Users } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

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

const TYPE_COLORS: Record<string, string> = {
  wholesale: "oklch(0.55 0.18 78)",
  catalogue: "oklch(0.55 0.16 240)",
  general: "oklch(0.55 0.12 150)",
};

export default function AdminLeads() {
  const { data: inquiries, isLoading } = useGetAllInquiries();
  const markRead = useMarkInquiryRead();

  const handleMarkRead = async (index: number) => {
    try {
      await markRead.mutateAsync(BigInt(index));
      toast.success("Marked as read");
    } catch {
      toast.error("Failed to mark as read");
    }
  };

  const total = inquiries?.length ?? 0;
  const unread = inquiries?.filter((i) => !i.isRead).length ?? 0;
  const whatsappLeads = inquiries?.filter((i) => i.whatsappNumber).length ?? 0;
  const todayLeads = inquiries?.filter((i) => isToday(i.timestamp)).length ?? 0;

  const statsBar = [
    { label: "Total Leads", value: total, icon: Users },
    { label: "Unread", value: unread, icon: Mail },
    { label: "WhatsApp Leads", value: whatsappLeads, icon: MessageCircle },
    { label: "Today", value: todayLeads, icon: CheckCircle },
  ];

  function filterLeads(tab: string) {
    if (!inquiries) return [];
    switch (tab) {
      case "wholesale":
        return inquiries.filter((i) => String(i.inquiryType) === "wholesale");
      case "catalogue":
        return inquiries.filter((i) => String(i.inquiryType) === "catalogue");
      case "general":
        return inquiries.filter((i) => String(i.inquiryType) === "general");
      case "unread":
        return inquiries.filter((i) => !i.isRead);
      default:
        return inquiries;
    }
  }

  function LeadCard({
    inq,
    index,
  }: { inq: import("@/backend.d").Inquiry; index: number }) {
    const typeStr = String(inq.inquiryType);
    const waUrl = `https://wa.me/${inq.whatsappNumber}?text=Hi%20${encodeURIComponent(inq.name)}%2C%20regarding%20your%20jewellery%20inquiry...`;

    return (
      <motion.div
        data-ocid={`leads.card.${index + 1}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.04 }}
        className="border p-5 flex flex-col gap-3"
        style={{
          backgroundColor: !inq.isRead
            ? "oklch(0.14 0.015 78)"
            : "var(--obsidian-mid)",
          borderColor: !inq.isRead
            ? "oklch(0.3 0.08 78)"
            : "oklch(0.22 0.06 240)",
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p
              className="font-serif text-base"
              style={{ color: "var(--gold-light)", fontWeight: 400 }}
            >
              {inq.name}
            </p>
            {inq.company && (
              <p className="text-xs text-foreground/40 mt-0.5">{inq.company}</p>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
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
            <Badge
              variant="outline"
              style={{
                borderColor: TYPE_COLORS[typeStr] ?? "oklch(0.4 0 0)",
                color: TYPE_COLORS[typeStr] ?? "oklch(0.6 0 0)",
                borderRadius: 0,
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
              }}
            >
              {typeStr.toUpperCase()}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-foreground/50">
          <div className="flex items-center gap-1.5">
            <Mail size={11} style={{ color: "var(--gold)", opacity: 0.6 }} />
            <span className="truncate">{inq.email}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>🌍</span>
            <span>{inq.country}</span>
          </div>
          {inq.phone && (
            <div className="flex items-center gap-1.5">
              <Phone size={11} style={{ color: "var(--gold)", opacity: 0.6 }} />
              <span>{inq.phone}</span>
            </div>
          )}
          {inq.whatsappNumber && (
            <div className="flex items-center gap-1.5">
              <MessageCircle
                size={11}
                style={{ color: "oklch(0.65 0.2 145)" }}
              />
              <span style={{ color: "oklch(0.65 0.2 145)" }}>
                {inq.whatsappNumber}
              </span>
            </div>
          )}
        </div>

        {inq.message && (
          <p
            className="text-xs text-foreground/40 leading-relaxed border-t pt-3 line-clamp-2"
            style={{ borderColor: "oklch(0.22 0.06 240)" }}
          >
            {inq.message}
          </p>
        )}

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-foreground/30">
            {formatDate(inq.timestamp)}
          </span>
          <div className="flex gap-2">
            {inq.whatsappNumber && (
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  size="sm"
                  className="h-7 text-xs px-3 gap-1"
                  style={{
                    backgroundColor: "oklch(0.42 0.18 145)",
                    color: "white",
                    borderRadius: 0,
                  }}
                >
                  <MessageCircle size={11} /> WhatsApp
                </Button>
              </a>
            )}
            {!inq.isRead && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleMarkRead(index)}
                disabled={markRead.isPending}
                className="h-7 text-xs px-3 gap-1"
                style={{
                  borderColor: "oklch(0.3 0 0)",
                  color: "oklch(0.6 0 0)",
                  borderRadius: 0,
                }}
              >
                <CheckCircle size={11} /> Mark Read
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="section-label mb-2">Lead Management</p>
        <h1
          className="font-serif text-3xl"
          style={{ color: "var(--gold)", fontWeight: 300 }}
        >
          Leads
        </h1>
        <div className="gold-divider-left mt-4" />
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsBar.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
            className="border p-4 flex items-center gap-3"
            style={{
              backgroundColor: "var(--obsidian-mid)",
              borderColor: "oklch(0.22 0.06 240)",
            }}
          >
            <s.icon size={18} style={{ color: "var(--gold)", opacity: 0.7 }} />
            <div>
              <p
                className="font-serif text-2xl"
                style={{ color: "var(--gold-light)", fontWeight: 300 }}
              >
                {s.value}
              </p>
              <p className="text-xs text-foreground/40 tracking-wide">
                {s.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-foreground/30 mb-6 italic">
        Tip: To export leads, use your browser's print function (Ctrl+P) to save
        as PDF.
      </p>

      {/* Filter Tabs */}
      <Tabs defaultValue="all">
        <TabsList
          className="h-auto p-1 mb-6"
          style={{ backgroundColor: "var(--obsidian-mid)", borderRadius: 0 }}
        >
          {["all", "wholesale", "catalogue", "general", "unread"].map((tab) => (
            <TabsTrigger
              key={tab}
              data-ocid="leads.tab"
              value={tab}
              className="text-xs tracking-widest uppercase px-5 py-2 data-[state=active]:text-black"
              style={{ borderRadius: 0, letterSpacing: "0.1em" }}
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {["all", "wholesale", "catalogue", "general", "unread"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            {isLoading ? (
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                data-ocid="leads.loading_state"
              >
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton
                    key={i}
                    className="h-40"
                    style={{ backgroundColor: "oklch(0.18 0.055 240)" }}
                  />
                ))}
              </div>
            ) : filterLeads(tab).length === 0 ? (
              <div
                className="text-center py-16 border"
                style={{
                  borderColor: "oklch(0.22 0.06 240)",
                  backgroundColor: "var(--obsidian-mid)",
                }}
                data-ocid="leads.empty_state"
              >
                <p className="text-sm text-foreground/40">
                  No {tab === "all" ? "" : tab} leads yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filterLeads(tab).map((inq, i) => (
                  <LeadCard
                    key={`${inq.email}-${String(inq.timestamp)}`}
                    inq={inq}
                    index={i}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

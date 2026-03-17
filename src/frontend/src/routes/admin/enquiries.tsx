import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useGetAllInquiries } from "@/hooks/useQueries";
import { FileText, Inbox, MessageCircle, Reply } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const TABS = ["All", "New", "Replied", "Archived"];
const CARD = "bg-white rounded-lg shadow-md border border-gray-100";

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminEnquiries() {
  const { data: inquiries, isLoading } = useGetAllInquiries();
  const [activeTab, setActiveTab] = useState("All");
  const [replyText, setReplyText] = useState("");

  const filtered = (inquiries ?? []).filter((inq) => {
    if (activeTab === "All") return true;
    if (activeTab === "New") return !inq.isRead;
    if (activeTab === "Replied") return inq.isRead;
    return false;
  });

  const handleSendReply = () => {
    toast.success("Reply sent successfully");
    setReplyText("");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <p className="section-label mb-1">Lead Management</p>
        <h1
          className="font-serif text-3xl"
          style={{ color: "var(--gold)", fontWeight: 300 }}
        >
          Enquiries
        </h1>
      </div>

      <motion.div
        className={`${CARD} overflow-hidden`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        {/* Tabs */}
        <div className="flex items-center gap-1 px-4 py-3 border-b border-gray-100">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              data-ocid={`enquiries.${tab.toLowerCase()}_tab`}
              onClick={() => setActiveTab(tab)}
              className="px-3 py-1.5 text-xs font-medium rounded-md transition-all"
              style={{
                backgroundColor: activeTab === tab ? "#C6A55C" : "transparent",
                color: activeTab === tab ? "#fff" : "#6b7280",
              }}
            >
              {tab}
              {tab === "New" &&
                (inquiries?.filter((i) => !i.isRead).length ?? 0) > 0 && (
                  <span
                    className="ml-1.5 text-xs px-1 py-0.5 rounded"
                    style={{
                      backgroundColor:
                        activeTab === "New" ? "#fff3" : "#C6A55C18",
                      color: activeTab === "New" ? "#fff" : "#C6A55C",
                      fontSize: "0.6rem",
                    }}
                  >
                    {inquiries?.filter((i) => !i.isRead).length}
                  </span>
                )}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div
            className="p-8 text-center text-gray-400 text-sm"
            data-ocid="enquiries.loading_state"
          >
            Loading enquiries...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center" data-ocid="enquiries.empty_state">
            <Inbox size={36} className="mx-auto mb-3 text-gray-300" />
            <p className="text-gray-400 text-sm">No enquiries found</p>
          </div>
        ) : (
          <Table data-ocid="enquiries.table">
            <TableHeader>
              <TableRow className="border-gray-100 hover:bg-transparent">
                <TableHead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50">
                  Name
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50">
                  Country
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50">
                  Message
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50">
                  Type
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50">
                  Status
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50">
                  Date
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((inq, i) => (
                <TableRow
                  key={`${inq.email}-${String(inq.timestamp)}`}
                  data-ocid={`enquiries.item.${i + 1}`}
                  className="border-gray-50 hover:bg-gray-50/50"
                >
                  <TableCell>
                    <p className="text-sm font-medium text-gray-800">
                      {inq.name}
                    </p>
                    <p className="text-xs text-gray-400">{inq.email}</p>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {inq.country}
                  </TableCell>
                  <TableCell className="text-xs text-gray-500 max-w-[160px]">
                    <span className="line-clamp-2">{inq.message}</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      style={{
                        backgroundColor: "#f3f4f6",
                        color: "#374151",
                        border: "none",
                      }}
                      className="text-xs capitalize"
                    >
                      {String(inq.inquiryType)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {!inq.isRead ? (
                      <Badge
                        style={{
                          backgroundColor: "#C6A55C18",
                          color: "#C6A55C",
                          border: "1px solid #C6A55C30",
                        }}
                        className="text-xs"
                      >
                        New
                      </Badge>
                    ) : (
                      <Badge
                        style={{
                          backgroundColor: "#dcfce7",
                          color: "#15803d",
                          border: "none",
                        }}
                        className="text-xs"
                      >
                        Replied
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-xs text-gray-400">
                    {formatDate(inq.timestamp)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            data-ocid={`enquiries.reply_button.${i + 1}`}
                            className="h-7 px-2 text-xs text-gray-500 hover:text-[#C6A55C]"
                          >
                            <Reply size={12} className="mr-1" /> Reply
                          </Button>
                        </DialogTrigger>
                        <DialogContent
                          className="bg-white max-w-md"
                          data-ocid="enquiries.dialog"
                        >
                          <DialogHeader>
                            <DialogTitle className="text-gray-800">
                              Reply to {inq.name}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-3 mt-2">
                            <p className="text-xs text-gray-500">
                              To: {inq.email}
                            </p>
                            <Textarea
                              className="text-sm text-gray-800 bg-gray-50 border-gray-200"
                              rows={5}
                              placeholder="Type your reply..."
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                            />
                            <div className="flex gap-2 justify-end">
                              <Button
                                data-ocid="enquiries.confirm_button"
                                onClick={handleSendReply}
                                className="text-xs"
                                style={{
                                  backgroundColor: "#C6A55C",
                                  color: "#fff",
                                }}
                              >
                                Send Reply
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <a
                        href="/assets/uploads/womens-necklace-set-catalogue-1-1.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 px-2 text-xs text-gray-500 hover:text-[#C6A55C]"
                        >
                          <FileText size={12} className="mr-1" /> Catalogue
                        </Button>
                      </a>
                      {inq.whatsappNumber && (
                        <a
                          href={`https://wa.me/${inq.whatsappNumber.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0 text-gray-400 hover:text-green-600"
                          >
                            <MessageCircle size={12} />
                          </Button>
                        </a>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </motion.div>
    </div>
  );
}

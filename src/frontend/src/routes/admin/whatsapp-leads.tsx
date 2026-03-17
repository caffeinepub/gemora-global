import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllInquiries } from "@/hooks/useQueries";
import { MessageCircle, PhoneCall, Repeat, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const CARD = "bg-white rounded-lg shadow-md border border-gray-100";

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

export default function AdminWhatsAppLeads() {
  const { data: inquiries } = useGetAllInquiries();
  const [autoReply, setAutoReply] = useState(true);
  const [sendCatalogue, setSendCatalogue] = useState(false);
  const [followUp, setFollowUp] = useState(true);

  const waLeads = (inquiries ?? []).filter((i) => i.whatsappNumber);
  const today = new Date();
  const todayLeads = waLeads.filter((i) => {
    const d = new Date(Number(i.timestamp) / 1_000_000);
    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  });

  const stats = [
    {
      label: "Total WA Leads",
      value: waLeads.length,
      icon: MessageCircle,
      color: "#25D366",
    },
    {
      label: "Today's Messages",
      value: todayLeads.length,
      icon: PhoneCall,
      color: "#C6A55C",
    },
    { label: "Auto Replies Sent", value: 47, icon: Zap, color: "#5C9EC6" },
    { label: "Follow-ups Pending", value: 12, icon: Repeat, color: "#C65C9E" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <p className="section-label mb-1">Messaging</p>
        <h1
          className="font-serif text-3xl"
          style={{ color: "var(--gold)", fontWeight: 300 }}
        >
          WhatsApp Leads
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className={`${CARD} p-4`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.07 }}
          >
            <div
              className="p-2 rounded-md w-fit mb-2"
              style={{ backgroundColor: `${s.color}18` }}
            >
              <s.icon size={16} style={{ color: s.color }} />
            </div>
            <p className="text-2xl font-semibold text-gray-800">{s.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Leads Table */}
      <motion.div
        className={`${CARD} overflow-hidden`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.25 }}
      >
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-serif text-base font-medium text-gray-800">
            WhatsApp Contacts
          </h2>
        </div>
        {waLeads.length === 0 ? (
          <div className="p-10 text-center text-gray-400 text-sm">
            <MessageCircle size={32} className="mx-auto mb-3 text-gray-200" />
            No WhatsApp leads yet
          </div>
        ) : (
          <Table data-ocid="whatsapp_leads.table">
            <TableHeader>
              <TableRow className="border-gray-100 hover:bg-transparent">
                <TableHead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50">
                  Name
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50">
                  WhatsApp
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50">
                  Country
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50">
                  Message
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
              {waLeads.map((inq, i) => (
                <TableRow
                  key={`${inq.email}-${String(inq.timestamp)}`}
                  data-ocid={`whatsapp_leads.item.${i + 1}`}
                  className="border-gray-50 hover:bg-gray-50/50"
                >
                  <TableCell>
                    <p className="text-sm font-medium text-gray-800">
                      {inq.name}
                    </p>
                    <p className="text-xs text-gray-400">{inq.company}</p>
                  </TableCell>
                  <TableCell className="text-sm font-mono text-gray-600">
                    {inq.whatsappNumber}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {inq.country}
                  </TableCell>
                  <TableCell className="text-xs text-gray-500 max-w-[160px]">
                    <span className="line-clamp-1">{inq.message}</span>
                  </TableCell>
                  <TableCell className="text-xs text-gray-400">
                    {formatDate(inq.timestamp)}
                  </TableCell>
                  <TableCell>
                    <a
                      href={`https://wa.me/${inq.whatsappNumber.replace(/\D/g, "")}?text=Hello%20${encodeURIComponent(inq.name)}%2C%20thank%20you%20for%20your%20interest%20in%20Gemora%20Global%20jewellery.`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="sm"
                        className="h-7 px-3 text-xs gap-1.5"
                        style={{ backgroundColor: "#25D366", color: "#fff" }}
                      >
                        <MessageCircle size={11} /> Chat
                      </Button>
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </motion.div>

      {/* Auto Reply Settings */}
      <motion.div
        className={`${CARD} p-6`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Zap size={16} style={{ color: "#C6A55C" }} />
          <h2 className="font-serif text-base font-medium text-gray-800">
            Auto Reply Settings
          </h2>
          <Badge
            style={{
              backgroundColor: "#fef9c3",
              color: "#a16207",
              border: "none",
            }}
            className="text-xs ml-auto"
          >
            WhatsApp Business API
          </Badge>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-50">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Enable Auto Reply
              </Label>
              <p className="text-xs text-gray-400 mt-0.5">
                Automatically reply to new WhatsApp messages
              </p>
            </div>
            <Switch
              data-ocid="whatsapp_leads.auto_reply_switch"
              checked={autoReply}
              onCheckedChange={setAutoReply}
            />
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-50">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Send Catalogue on First Contact
              </Label>
              <p className="text-xs text-gray-400 mt-0.5">
                Auto-send PDF catalogue to new leads
              </p>
            </div>
            <Switch
              data-ocid="whatsapp_leads.catalogue_switch"
              checked={sendCatalogue}
              onCheckedChange={setSendCatalogue}
            />
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Follow-up after 24hrs
              </Label>
              <p className="text-xs text-gray-400 mt-0.5">
                Send reminder to leads who haven't replied
              </p>
            </div>
            <Switch
              data-ocid="whatsapp_leads.followup_switch"
              checked={followUp}
              onCheckedChange={setFollowUp}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

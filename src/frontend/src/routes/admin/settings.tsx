import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
import {
  Bell,
  CreditCard,
  FileSpreadsheet,
  Globe,
  Languages,
  Plus,
  Shield,
  Star,
  Target,
  UserCog,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const CARD = "bg-white rounded-lg shadow-md border border-gray-100";

const roles = [
  {
    name: "Admin",
    desc: "Full access to all panels",
    color: "#C6A55C",
    bg: "#C6A55C18",
    perms: "All Modules",
  },
  {
    name: "Manager",
    desc: "Products + Orders management",
    color: "#5C9EC6",
    bg: "#5C9EC618",
    perms: "Products, Orders, Analytics",
  },
  {
    name: "Sales",
    desc: "Enquiries + Leads access",
    color: "#5CC6A5",
    bg: "#5CC6A518",
    perms: "Enquiries, Customers, WhatsApp",
  },
];

const proFeatures = [
  {
    icon: Zap,
    title: "Auto Email Sender",
    desc: "Auto-send catalogue to new leads upon enquiry",
  },
  {
    icon: Target,
    title: "Lead Scoring System",
    desc: "Auto-score leads by activity, country, and frequency",
  },
  {
    icon: Languages,
    title: "Multi-language Support",
    desc: "Translate admin panel to English / French",
  },
  {
    icon: CreditCard,
    title: "Currency Switch",
    desc: "Display prices in $ / € / AED based on buyer region",
  },
  {
    icon: FileSpreadsheet,
    title: "Export Invoice Generator",
    desc: "Auto-generate export invoices with GST & shipping",
  },
];

export default function AdminSettings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [dailySummary, setDailySummary] = useState(false);
  const [waNotif, setWaNotif] = useState(true);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <div className="p-6 space-y-6">
      <div>
        <p className="section-label mb-1">System</p>
        <h1
          className="font-serif text-3xl"
          style={{ color: "var(--gold)", fontWeight: 300 }}
        >
          Settings
        </h1>
      </div>

      {/* Admin Users */}
      <motion.div
        className={`${CARD} overflow-hidden`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <UserCog size={16} style={{ color: "#C6A55C" }} />
            <h2 className="font-serif text-base font-medium text-gray-800">
              Admin Users
            </h2>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                data-ocid="settings.add_admin_button"
                size="sm"
                className="text-xs gap-1.5"
                style={{ backgroundColor: "#C6A55C", color: "#fff" }}
              >
                <Plus size={12} /> Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent
              className="bg-white max-w-sm"
              data-ocid="settings.dialog"
            >
              <DialogHeader>
                <DialogTitle className="text-gray-800">
                  Add New Admin
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-3 mt-2">
                <div>
                  <Label className="text-xs text-gray-600">Username</Label>
                  <Input
                    className="mt-1 text-sm text-gray-800 bg-gray-50 border-gray-200"
                    placeholder="Enter username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Password</Label>
                  <Input
                    type="password"
                    className="mt-1 text-sm text-gray-800 bg-gray-50 border-gray-200"
                    placeholder="Enter password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <p className="text-xs text-gray-400 bg-yellow-50 p-2 rounded border border-yellow-100">
                  Note: Multi-user admin management requires backend support.
                  This is a UI preview.
                </p>
                <div className="flex justify-end">
                  <Button
                    data-ocid="settings.confirm_button"
                    className="text-xs"
                    style={{ backgroundColor: "#C6A55C", color: "#fff" }}
                  >
                    Add User
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Table data-ocid="settings.admin_table">
          <TableHeader>
            <TableRow className="border-gray-100 hover:bg-transparent">
              <TableHead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50">
                Username
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50">
                Role
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50">
                Status
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50">
                Last Login
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-gray-50">
              <TableCell className="text-sm font-medium text-gray-800">
                admin
              </TableCell>
              <TableCell>
                <Badge
                  style={{
                    backgroundColor: "#C6A55C18",
                    color: "#C6A55C",
                    border: "1px solid #C6A55C30",
                  }}
                  className="text-xs"
                >
                  Admin
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  style={{
                    backgroundColor: "#dcfce7",
                    color: "#15803d",
                    border: "none",
                  }}
                  className="text-xs"
                >
                  Active
                </Badge>
              </TableCell>
              <TableCell className="text-xs text-gray-400">Today</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </motion.div>

      {/* Roles */}
      <motion.div
        className={`${CARD} p-5`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Shield size={16} style={{ color: "#C6A55C" }} />
          <h2 className="font-serif text-base font-medium text-gray-800">
            Roles & Permissions
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {roles.map((role) => (
            <div
              key={role.name}
              className="p-4 rounded-lg border"
              style={{
                backgroundColor: role.bg,
                borderColor: `${role.color}30`,
              }}
            >
              <p
                className="text-sm font-semibold"
                style={{ color: role.color }}
              >
                {role.name}
              </p>
              <p className="text-xs text-gray-600 mt-1">{role.desc}</p>
              <p
                className="text-xs text-gray-400 mt-2 border-t pt-2"
                style={{ borderColor: `${role.color}20` }}
              >
                {role.perms}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Pro Features */}
      <motion.div
        data-ocid="settings.pro_features_panel"
        className={`${CARD} overflow-hidden`}
        style={{
          borderColor: "#C6A55C40",
          boxShadow: "0 0 0 1px #C6A55C20, 0 4px 6px -1px rgba(0,0,0,0.06)",
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
      >
        <div
          className="px-6 py-4 border-b"
          style={{
            background: "linear-gradient(135deg, #C6A55C08, #C6A55C18)",
            borderColor: "#C6A55C30",
          }}
        >
          <div className="flex items-center gap-2">
            <Star size={16} style={{ color: "#C6A55C" }} />
            <h2
              className="font-serif text-lg font-medium"
              style={{ color: "#C6A55C" }}
            >
              Pro Features — Export Growth Tools
            </h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Unlock these premium features to scale your export business
          </p>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {proFeatures.map((f) => (
            <div
              key={f.title}
              className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 border border-gray-100"
            >
              <div
                className="p-2 rounded-md shrink-0"
                style={{ backgroundColor: "#C6A55C18" }}
              >
                <f.icon size={14} style={{ color: "#C6A55C" }} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800">{f.title}</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                  {f.desc}
                </p>
                <Badge
                  style={{
                    backgroundColor: "#fef9c3",
                    color: "#a16207",
                    border: "none",
                  }}
                  className="text-xs mt-2"
                >
                  Coming Soon
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Email & Notifications */}
      <motion.div
        className={`${CARD} p-5`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Bell size={16} style={{ color: "#C6A55C" }} />
          <h2 className="font-serif text-base font-medium text-gray-800">
            Email & Notifications
          </h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-50">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Email on New Enquiry
              </Label>
              <p className="text-xs text-gray-400 mt-0.5">
                Get notified when a new enquiry arrives
              </p>
            </div>
            <Switch
              data-ocid="settings.email_notification_switch"
              checked={emailNotif}
              onCheckedChange={setEmailNotif}
            />
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-50">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Daily Summary Email
              </Label>
              <p className="text-xs text-gray-400 mt-0.5">
                Receive daily digest of all activity
              </p>
            </div>
            <Switch
              data-ocid="settings.daily_summary_switch"
              checked={dailySummary}
              onCheckedChange={setDailySummary}
            />
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                WhatsApp Notification Alerts
              </Label>
              <p className="text-xs text-gray-400 mt-0.5">
                Get WhatsApp alerts for new leads
              </p>
            </div>
            <Switch checked={waNotif} onCheckedChange={setWaNotif} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

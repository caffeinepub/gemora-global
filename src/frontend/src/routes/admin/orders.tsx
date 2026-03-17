import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Eye } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const orders = [
  {
    id: "GG-001",
    buyer: "Ahmed Al Rashid",
    country: "🇦🇪 UAE",
    amount: "$2,400",
    status: "Shipped",
  },
  {
    id: "GG-002",
    buyer: "Marie Dubois",
    country: "🇫🇷 France",
    amount: "$1,800",
    status: "Delivered",
  },
  {
    id: "GG-003",
    buyer: "John Smith",
    country: "🇺🇸 USA",
    amount: "$3,200",
    status: "Processing",
  },
  {
    id: "GG-004",
    buyer: "Sophie Laurent",
    country: "🇫🇷 France",
    amount: "$900",
    status: "Pending",
  },
  {
    id: "GG-005",
    buyer: "Fatima Hassan",
    country: "🇦🇪 UAE",
    amount: "$1,500",
    status: "Processing",
  },
];

const statusConfig: Record<
  string,
  { label: string; bg: string; text: string }
> = {
  Pending: { label: "Pending", bg: "#fef9c3", text: "#a16207" },
  Processing: { label: "Processing", bg: "#dbeafe", text: "#1d4ed8" },
  Shipped: { label: "Shipped", bg: "#f3e8ff", text: "#7e22ce" },
  Delivered: { label: "Delivered", bg: "#dcfce7", text: "#15803d" },
};

const TABS = ["All", "Pending", "Processing", "Shipped", "Delivered"];
const CARD = "bg-white rounded-lg shadow-md border border-gray-100";

export default function AdminOrders() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered =
    activeTab === "All" ? orders : orders.filter((o) => o.status === activeTab);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="section-label mb-1">Export Management</p>
          <h1
            className="font-serif text-3xl"
            style={{ color: "var(--gold)", fontWeight: 300 }}
          >
            Orders
          </h1>
        </div>
        <Button
          variant="outline"
          className="text-xs gap-1.5 border-gray-200 text-gray-700"
        >
          <Download size={13} /> Export CSV
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.entries(statusConfig).map(([status, cfg], i) => (
          <motion.div
            key={status}
            className={`${CARD} p-4`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
          >
            <p className="text-xs font-medium" style={{ color: cfg.text }}>
              {cfg.label}
            </p>
            <p className="text-2xl font-semibold text-gray-800 mt-1">
              {orders.filter((o) => o.status === status).length}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Filter Tabs + Table */}
      <motion.div
        className={`${CARD} overflow-hidden`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
      >
        {/* Tabs */}
        <div className="flex items-center gap-1 px-4 py-3 border-b border-gray-100 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              data-ocid={`orders.${tab.toLowerCase().replace(" ", "_")}_tab`}
              onClick={() => setActiveTab(tab)}
              className="px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-all"
              style={{
                backgroundColor: activeTab === tab ? "#C6A55C" : "transparent",
                color: activeTab === tab ? "#fff" : "#6b7280",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <Table data-ocid="orders.table">
          <TableHeader>
            <TableRow className="border-gray-100 hover:bg-transparent">
              <TableHead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50">
                Order ID
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50">
                Buyer
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50">
                Country
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50">
                Amount
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50">
                Status
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((order, i) => {
              const cfg = statusConfig[order.status];
              return (
                <TableRow
                  key={order.id}
                  data-ocid={`orders.item.${i + 1}`}
                  className="border-gray-50 hover:bg-gray-50/50"
                >
                  <TableCell className="text-sm font-mono font-medium text-gray-800">
                    {order.id}
                  </TableCell>
                  <TableCell className="text-sm text-gray-700">
                    {order.buyer}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {order.country}
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-gray-800">
                    {order.amount}
                  </TableCell>
                  <TableCell>
                    <Badge
                      style={{
                        backgroundColor: cfg.bg,
                        color: cfg.text,
                        border: "none",
                      }}
                      className="text-xs font-medium"
                    >
                      {cfg.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0 text-gray-400 hover:text-[#C6A55C]"
                    >
                      <Eye size={13} />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}

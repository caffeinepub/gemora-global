import { useGetAllInquiries, useGetProducts } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import {
  Globe,
  MessageSquare,
  Package,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const monthlyData = [
  { month: "Jan", orders: 4 },
  { month: "Feb", orders: 7 },
  { month: "Mar", orders: 5 },
  { month: "Apr", orders: 11 },
  { month: "May", orders: 9 },
  { month: "Jun", orders: 14 },
];

const topCountries = [
  { name: "France", flag: "🇫🇷", orders: 14, pct: 38 },
  { name: "UAE", flag: "🇦🇪", orders: 11, pct: 30 },
  { name: "USA", flag: "🇺🇸", orders: 8, pct: 22 },
];

const mostViewedProducts = [
  { name: "Layered Gold Necklace Set", category: "Necklaces", views: 248 },
  { name: "Bridal Kundan Choker", category: "Bridal", views: 192 },
  { name: "Crystal Drop Earrings", category: "Earrings", views: 167 },
];

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

const CARD = "bg-white rounded-lg shadow-md border border-gray-100";

export default function AdminDashboard() {
  const { data: products } = useGetProducts();
  const { data: inquiries } = useGetAllInquiries();

  const unread = inquiries?.filter((i) => !i.isRead).length ?? 0;

  const metrics = [
    {
      label: "Total Orders",
      value: 12,
      icon: ShoppingBag,
      ocid: "dashboard.orders_card",
      color: "#C6A55C",
    },
    {
      label: "Export Countries",
      value: 24,
      icon: Globe,
      ocid: "dashboard.countries_card",
      color: "#5C9EC6",
    },
    {
      label: "Total Products",
      value: products?.length ?? 0,
      icon: Package,
      ocid: "dashboard.products_card",
      color: "#5CC6A5",
    },
    {
      label: "New Enquiries",
      value: unread,
      icon: MessageSquare,
      ocid: "dashboard.enquiries_card",
      color: "#C65C9E",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="section-label mb-1">Overview</p>
          <h1
            className="font-serif text-3xl"
            style={{ color: "var(--gold)", fontWeight: 300 }}
          >
            Dashboard
          </h1>
        </div>
        <div className="text-xs" style={{ color: "oklch(0.45 0 0)" }}>
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            data-ocid={m.ocid}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
            className={`${CARD} p-5`}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="p-2 rounded-md"
                style={{ backgroundColor: `${m.color}18` }}
              >
                <m.icon size={18} style={{ color: m.color }} />
              </div>
              <TrendingUp size={12} className="text-green-500 mt-1" />
            </div>
            <p
              className="font-serif text-3xl text-gray-800"
              style={{ fontWeight: 300 }}
            >
              {m.value}
            </p>
            <p className="text-xs text-gray-500 mt-1 tracking-wide">
              {m.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <motion.div
          className={`${CARD} p-6 lg:col-span-2`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <h2
            className="font-serif text-lg text-gray-800 mb-4"
            style={{ fontWeight: 400 }}
          >
            Monthly Orders
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={monthlyData}
              margin={{ top: 4, right: 8, bottom: 4, left: -20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="orders" fill="#C6A55C" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Countries */}
        <motion.div
          className={`${CARD} p-6`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <h2
            className="font-serif text-lg text-gray-800 mb-4"
            style={{ fontWeight: 400 }}
          >
            Top Countries
          </h2>
          <div className="space-y-4">
            {topCountries.map((c) => (
              <div key={c.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700 flex items-center gap-1.5">
                    <span className="text-base">{c.flag}</span>
                    {c.name}
                  </span>
                  <span
                    className="text-xs font-medium"
                    style={{ color: "#C6A55C" }}
                  >
                    {c.orders} orders
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: "#C6A55C" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${c.pct}%` }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Most Viewed Products + Recent Enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Viewed Products */}
        <motion.div
          className={`${CARD} p-6`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <h2
            className="font-serif text-lg text-gray-800 mb-4"
            style={{ fontWeight: 400 }}
          >
            Most Viewed Products
          </h2>
          <div className="space-y-3">
            {mostViewedProducts.map((p, i) => (
              <div
                key={p.name}
                className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0"
              >
                <div
                  className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: "#C6A55C18", color: "#C6A55C" }}
                >
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {p.name}
                  </p>
                  <p className="text-xs text-gray-400">{p.category}</p>
                </div>
                <span className="text-xs text-gray-500">{p.views} views</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Enquiries */}
        <motion.div
          className={`${CARD} p-6`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              className="font-serif text-lg text-gray-800"
              style={{ fontWeight: 400 }}
            >
              Recent Enquiries
            </h2>
            <Link
              to={"/admin/enquiries" as any}
              className="text-xs"
              style={{ color: "#C6A55C" }}
            >
              View All →
            </Link>
          </div>
          {!inquiries || inquiries.length === 0 ? (
            <p
              className="text-sm text-gray-400 py-6 text-center"
              data-ocid="dashboard.enquiries_empty_state"
            >
              No enquiries yet.
            </p>
          ) : (
            <div className="space-y-0">
              {inquiries.slice(0, 5).map((inq, i) => (
                <div
                  key={`${inq.email}-${String(inq.timestamp)}`}
                  data-ocid={`dashboard.item.${i + 1}`}
                  className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 text-xs"
                >
                  <div>
                    <p className="font-medium text-gray-800">{inq.name}</p>
                    <p className="text-gray-400">{inq.country}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!inq.isRead ? (
                      <span
                        className="px-2 py-0.5 text-xs font-medium rounded"
                        style={{
                          backgroundColor: "#C6A55C18",
                          color: "#C6A55C",
                        }}
                      >
                        New
                      </span>
                    ) : (
                      <span
                        className="px-2 py-0.5 text-xs font-medium rounded"
                        style={{ backgroundColor: "#dcfce7", color: "#16a34a" }}
                      >
                        Replied
                      </span>
                    )}
                    <span className="text-gray-400">
                      {formatDate(inq.timestamp)}
                    </span>
                    {inq.whatsappNumber && (
                      <a
                        href={`https://wa.me/${inq.whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-0.5 text-white rounded text-xs"
                        style={{ backgroundColor: "#25D366" }}
                      >
                        WA
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

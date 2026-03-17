import { useGetAllInquiries } from "@/hooks/useQueries";
import { clearAdminSession, getAdminSession } from "@/utils/adminAuth";
import {
  Link,
  Outlet,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import {
  BarChart3,
  ExternalLink,
  FileText,
  FolderOpen,
  Gem,
  Globe,
  Image,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  MessageSquare,
  Package,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react";
import { useEffect } from "react";

const navItems = [
  {
    to: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    ocid: "admin_nav.dashboard_link",
  },
  {
    to: "/admin/products",
    label: "Products",
    icon: Package,
    ocid: "admin_nav.products_link",
  },
  {
    to: "/admin/categories",
    label: "Categories",
    icon: FolderOpen,
    ocid: "admin_nav.categories_link",
  },
  {
    to: "/admin/media",
    label: "Media Library",
    icon: Image,
    ocid: "admin_nav.media_link",
  },
  {
    to: "/admin/catalogue",
    label: "Catalogue",
    icon: FileText,
    ocid: "admin_nav.catalogue_link",
  },
  {
    to: "/admin/orders",
    label: "Orders",
    icon: ShoppingBag,
    ocid: "admin_nav.orders_link",
  },
  {
    to: "/admin/customers",
    label: "Customers",
    icon: Users,
    ocid: "admin_nav.customers_link",
  },
  {
    to: "/admin/enquiries",
    label: "Enquiries",
    icon: MessageSquare,
    ocid: "admin_nav.enquiries_link",
    badge: true,
  },
  {
    to: "/admin/whatsapp-leads",
    label: "WhatsApp Leads",
    icon: MessageCircle,
    ocid: "admin_nav.whatsapp_leads_link",
  },
  {
    to: "/admin/analytics",
    label: "Analytics",
    icon: BarChart3,
    ocid: "admin_nav.analytics_link",
  },
  {
    to: "/admin/website-settings",
    label: "Website Settings",
    icon: Globe,
    ocid: "admin_nav.website_settings_link",
  },
  {
    to: "/admin/settings",
    label: "Settings",
    icon: Settings,
    ocid: "admin_nav.settings_link",
  },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const { data: inquiries } = useGetAllInquiries();
  const unreadCount = inquiries?.filter((i) => !i.isRead).length ?? 0;

  useEffect(() => {
    if (!getAdminSession()) {
      navigate({ to: "/admin/login" });
    }
  }, [navigate]);

  if (!getAdminSession()) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--obsidian)" }}
        data-ocid="admin_layout.loading_state"
      >
        <div className="text-center">
          <Gem
            size={32}
            style={{ color: "var(--gold)" }}
            className="mx-auto mb-4 animate-pulse"
          />
          <p className="section-label">Loading Admin...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    clearAdminSession();
    navigate({ to: "/admin/login" });
  };

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ backgroundColor: "var(--obsidian)" }}
    >
      {/* Sidebar */}
      <aside
        className="w-64 flex flex-col border-r shrink-0"
        style={{
          backgroundColor: "oklch(0.14 0.045 240)",
          borderColor: "oklch(0.20 0.05 240)",
        }}
      >
        {/* Brand */}
        <div
          className="p-5 border-b flex items-center gap-3"
          style={{ borderColor: "oklch(0.20 0.05 240)" }}
        >
          <img
            src="/assets/uploads/Gemini_Generated_Image_ubdf1aubdf1aubdf-removebg-preview-1-1-1.png"
            alt="Gemora Global"
            className="h-9 w-9 object-contain"
          />
          <div>
            <p
              className="font-serif text-sm"
              style={{
                color: "var(--gold)",
                fontWeight: 400,
                letterSpacing: "0.08em",
              }}
            >
              Gemora Global
            </p>
            <p
              className="text-xs"
              style={{
                color: "oklch(0.4 0 0)",
                letterSpacing: "0.15em",
                fontSize: "0.6rem",
              }}
            >
              ADMIN PANEL
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 overflow-y-auto">
          <p
            className="text-xs px-3 mb-2"
            style={{
              color: "oklch(0.38 0 0)",
              letterSpacing: "0.2em",
              fontSize: "0.58rem",
            }}
          >
            NAVIGATION
          </p>
          <ul className="flex flex-col gap-0.5">
            {navItems.map((item) => {
              const active =
                currentPath === item.to ||
                currentPath.startsWith(`${item.to}/`);
              const showBadge = item.badge && unreadCount > 0;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to as any}
                    data-ocid={item.ocid}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs transition-all duration-200 rounded-sm group"
                    style={{
                      backgroundColor: active
                        ? "oklch(0.72 0.12 78 / 0.12)"
                        : "transparent",
                      color: active ? "var(--gold)" : "oklch(0.55 0 0)",
                      letterSpacing: "0.04em",
                      borderLeft: active
                        ? "2px solid var(--gold)"
                        : "2px solid transparent",
                    }}
                  >
                    <item.icon size={14} style={{ flexShrink: 0 }} />
                    <span className="flex-1">{item.label}</span>
                    {showBadge && (
                      <span
                        className="text-xs px-1.5 py-0.5 font-semibold"
                        style={{
                          backgroundColor: "var(--gold)",
                          color: "oklch(0.12 0.04 240)",
                          fontSize: "0.6rem",
                          borderRadius: "2px",
                        }}
                      >
                        {unreadCount}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div
            className="mt-4 pt-4"
            style={{ borderTop: "1px solid oklch(0.20 0.05 240)" }}
          >
            <Link
              to="/"
              data-ocid="admin_nav.public_site_link"
              className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-sm"
              style={{ color: "oklch(0.42 0 0)", letterSpacing: "0.04em" }}
            >
              <ExternalLink size={12} />
              <span>View Public Site</span>
            </Link>
          </div>
        </nav>

        {/* User + Logout */}
        <div
          className="p-3 border-t"
          style={{ borderColor: "oklch(0.20 0.05 240)" }}
        >
          <div
            className="flex items-center gap-2 px-3 py-2 mb-1 rounded-sm"
            style={{ backgroundColor: "oklch(0.17 0.04 240)" }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{
                backgroundColor: "var(--gold)",
                color: "oklch(0.12 0.04 240)",
              }}
            >
              A
            </div>
            <div className="min-w-0">
              <p
                className="text-xs"
                style={{ color: "var(--gold-light)", letterSpacing: "0.04em" }}
              >
                admin
              </p>
              <p
                className="text-xs"
                style={{ color: "oklch(0.38 0 0)", fontSize: "0.6rem" }}
              >
                Administrator
              </p>
            </div>
          </div>
          <button
            type="button"
            data-ocid="admin_nav.logout_button"
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-2 w-full text-xs transition-colors duration-200 rounded-sm hover:bg-red-900/20"
            style={{ color: "oklch(0.55 0.12 29)", letterSpacing: "0.08em" }}
          >
            <LogOut size={13} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main
        className="flex-1 overflow-y-auto"
        style={{ backgroundColor: "var(--obsidian)" }}
      >
        <Outlet />
      </main>
    </div>
  );
}

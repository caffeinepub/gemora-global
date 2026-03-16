import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useIsCallerAdmin } from "@/hooks/useQueries";
import { useQueryClient } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import {
  BarChart3,
  BookOpen,
  ChevronRight,
  Gem,
  Inbox,
  LayoutDashboard,
  LogOut,
  Package,
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
    to: "/admin/content",
    label: "Content",
    icon: BookOpen,
    ocid: "admin_nav.content_link",
  },
  {
    to: "/admin/contacts",
    label: "Contacts",
    icon: Inbox,
    ocid: "admin_nav.contacts_link",
  },
];

export default function AdminLayout() {
  const { identity, clear } = useInternetIdentity();
  const { data: isAdmin, isLoading } = useIsCallerAdmin();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const isAuthenticated = !!identity;

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || isAdmin === false)) {
      navigate({ to: "/admin/login" });
    }
  }, [isAuthenticated, isAdmin, isLoading, navigate]);

  const handleLogout = async () => {
    await clear();
    qc.clear();
    navigate({ to: "/admin/login" });
  };

  if (isLoading || !isAuthenticated) {
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

  const principal = identity?.getPrincipal().toString() ?? "";
  const shortPrincipal =
    principal.length > 20
      ? `${principal.slice(0, 10)}...${principal.slice(-5)}`
      : principal;

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ backgroundColor: "var(--obsidian)" }}
    >
      {/* Sidebar */}
      <aside
        className="w-64 flex flex-col border-r shrink-0"
        style={{
          backgroundColor: "var(--obsidian-mid)",
          borderColor: "oklch(0.22 0 0)",
        }}
      >
        {/* Brand */}
        <div
          className="p-6 border-b flex items-center gap-3"
          style={{ borderColor: "oklch(0.22 0 0)" }}
        >
          <img
            src="/assets/uploads/Gemini_Generated_Image_ubdf1aubdf1aubdf-removebg-preview-1--1.png"
            alt="Gemora Global"
            className="h-10 w-10 object-contain"
          />
          <div>
            <p
              className="font-serif text-base"
              style={{ color: "var(--gold)", fontWeight: 400 }}
            >
              Gemora Global
            </p>
            <p
              className="text-xs"
              style={{ color: "oklch(0.45 0 0)", letterSpacing: "0.1em" }}
            >
              Admin Panel
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 px-3">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active =
                currentPath === item.to || currentPath.startsWith(item.to);
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    data-ocid={item.ocid}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 group"
                    style={{
                      backgroundColor: active
                        ? "oklch(0.18 0 0)"
                        : "transparent",
                      color: active ? "var(--gold)" : "oklch(0.6 0 0)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    <item.icon size={16} />
                    <span>{item.label}</span>
                    {active && <ChevronRight size={14} className="ml-auto" />}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div
            className="mt-6 pt-6"
            style={{ borderTop: "1px solid oklch(0.22 0 0)" }}
          >
            <Link
              to="/"
              data-ocid="admin_nav.public_site_link"
              className="flex items-center gap-3 px-4 py-2.5 text-sm"
              style={{ color: "oklch(0.5 0 0)", letterSpacing: "0.05em" }}
            >
              <BarChart3 size={16} />
              <span>View Public Site</span>
            </Link>
          </div>
        </nav>

        {/* User info + logout */}
        <div
          className="p-4 border-t"
          style={{ borderColor: "oklch(0.22 0 0)" }}
        >
          <div className="mb-3 px-1">
            <p className="text-xs" style={{ color: "oklch(0.45 0 0)" }}>
              Logged in as
            </p>
            <p
              className="text-xs font-mono mt-0.5 truncate"
              style={{ color: "var(--gold-light)" }}
            >
              {shortPrincipal}
            </p>
          </div>
          <button
            type="button"
            data-ocid="admin_nav.logout_button"
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 w-full text-xs transition-colors duration-200 hover:bg-[oklch(0.18_0_0)]"
            style={{ color: "oklch(0.55 0.1 29)", letterSpacing: "0.1em" }}
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main
        className="flex-1 overflow-y-auto"
        style={{ backgroundColor: "var(--obsidian)" }}
      >
        <Outlet />
      </main>
    </div>
  );
}

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import AboutPage from "@/pages/AboutPage";
import CollectionsPage from "@/pages/CollectionsPage";
import ContactPage from "@/pages/ContactPage";
import GalleryPage from "@/pages/GalleryPage";
import HomePage from "@/pages/HomePage";
import MarketsPage from "@/pages/MarketsPage";
import WholesalePage from "@/pages/WholesalePage";
import WhyUsPage from "@/pages/WhyUsPage";
import AdminAnalytics from "@/routes/admin/analytics";
import AdminCatalogue from "@/routes/admin/catalogue";
import AdminCategories from "@/routes/admin/categories";
import AdminContacts from "@/routes/admin/contacts";
import AdminContent from "@/routes/admin/content";
import AdminCustomers from "@/routes/admin/customers";
import AdminDashboard from "@/routes/admin/dashboard";
import AdminEnquiries from "@/routes/admin/enquiries";
import AdminLayout from "@/routes/admin/index";
import AdminLeads from "@/routes/admin/leads";
import AdminLoginPage from "@/routes/admin/login";
import AdminMedia from "@/routes/admin/media";
import AdminOrders from "@/routes/admin/orders";
import AdminProducts from "@/routes/admin/products";
import AdminSystemSettings from "@/routes/admin/settings";
import AdminWebsiteSettings from "@/routes/admin/website-settings";
import AdminWhatsappLeads from "@/routes/admin/whatsapp-leads";
import {
  Outlet,
  createRootRoute,
  createRoute,
  redirect,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect } from "react";

function ScrollToTop() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <ScrollToTop />
        <Outlet />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});
const collectionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/collections",
  component: CollectionsPage,
});
const wholesaleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/wholesale",
  component: WholesalePage,
});
const whyUsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/why-us",
  component: WhyUsPage,
});
const marketsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/markets",
  component: MarketsPage,
});
const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gallery",
  component: GalleryPage,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/login",
  component: AdminLoginPage,
});

const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminLayout,
});

const adminIndexRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/admin/dashboard" as any });
  },
  component: () => null,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/dashboard",
  component: AdminDashboard,
});
const adminProductsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/products",
  component: AdminProducts,
});
const adminCategoriesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/categories",
  component: AdminCategories,
});
const adminMediaRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/media",
  component: AdminMedia,
});
const adminLeadsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/leads",
  component: AdminLeads,
});
const adminCatalogueRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/catalogue",
  component: AdminCatalogue,
});
const adminOrdersRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/orders",
  component: AdminOrders,
});
const adminCustomersRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/customers",
  component: AdminCustomers,
});
const adminEnquiriesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/enquiries",
  component: AdminEnquiries,
});
const adminWhatsappLeadsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/whatsapp-leads",
  component: AdminWhatsappLeads,
});
const adminContentRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/content",
  component: AdminContent,
});
const adminAnalyticsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/analytics",
  component: AdminAnalytics,
});
const adminContactsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/contacts",
  component: AdminContacts,
});
const adminWebsiteSettingsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/website-settings",
  component: AdminWebsiteSettings,
});
const adminSystemSettingsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/settings",
  component: AdminSystemSettings,
});

adminLayoutRoute.addChildren([
  adminIndexRoute,
  adminDashboardRoute,
  adminProductsRoute,
  adminCategoriesRoute,
  adminMediaRoute,
  adminLeadsRoute,
  adminCatalogueRoute,
  adminOrdersRoute,
  adminCustomersRoute,
  adminEnquiriesRoute,
  adminWhatsappLeadsRoute,
  adminContentRoute,
  adminAnalyticsRoute,
  adminContactsRoute,
  adminWebsiteSettingsRoute,
  adminSystemSettingsRoute,
]);

export const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  collectionsRoute,
  wholesaleRoute,
  whyUsRoute,
  marketsRoute,
  galleryRoute,
  contactRoute,
  adminLoginRoute,
  adminLayoutRoute,
]);

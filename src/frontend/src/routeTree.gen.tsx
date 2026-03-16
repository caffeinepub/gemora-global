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
import AdminContacts from "@/routes/admin/contacts";
import AdminContent from "@/routes/admin/content";
import AdminDashboard from "@/routes/admin/dashboard";
import AdminLayout from "@/routes/admin/index";
import AdminLoginPage from "@/routes/admin/login";
import AdminProducts from "@/routes/admin/products";
import {
  Outlet,
  createRootRoute,
  createRoute,
  redirect,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  ),
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
  // biome-ignore lint/style/noNonNullAssertion: router redirect
  beforeLoad: () => {
    throw redirect({ to: "/admin" as any });
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

const adminContentRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/content",
  component: AdminContent,
});

const adminContactsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/contacts",
  component: AdminContacts,
});

adminLayoutRoute.addChildren([
  adminIndexRoute,
  adminDashboardRoute,
  adminProductsRoute,
  adminContentRoute,
  adminContactsRoute,
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

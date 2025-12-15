import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Component to redirect to static sitemap.xml file
const SitemapXmlRedirect = () => {
  useEffect(() => {
    window.location.href = "/sitemap.xml";
  }, []);
  return null;
};
import { ScrollToTop } from "./components/ScrollToTop";

// Critical page - loaded immediately for first paint
import Index from "./pages/Index";

// All other pages - lazy loaded for reduced initial bundle
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const SubServiceDetail = lazy(() => import("./pages/SubServiceDetail"));
const Locations = lazy(() => import("./pages/Locations"));
const LocationDetail = lazy(() => import("./pages/LocationDetail"));
const LocationServiceDetail = lazy(() => import("./pages/LocationServiceDetail"));
const LocationSubServiceDetail = lazy(() => import("./pages/LocationSubServiceDetail"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Cookies = lazy(() => import("./pages/Cookies"));
const Login = lazy(() => import("./pages/Login"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminContent = lazy(() => import("./pages/AdminContent"));
const AdminBlogScheduler = lazy(() => import("./pages/AdminBlogScheduler"));
const AdminRebrand = lazy(() => import("./pages/AdminRebrand"));
const AdminExport = lazy(() => import("./pages/AdminExport"));
const AdminSitemap = lazy(() => import("./pages/AdminSitemap"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Minimal loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-pulse text-muted-foreground">Loading...</div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceSlug" element={<ServiceDetail />} />
            <Route path="/services/:serviceSlug/:subServiceSlug" element={<SubServiceDetail />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/location/:locationSlug" element={<LocationDetail />} />
            <Route path="/location/:locationSlug/:serviceSlug" element={<LocationServiceDetail />} />
            <Route path="/location/:locationSlug/:serviceSlug/:subServiceSlug" element={<LocationSubServiceDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/sitemap.xml" element={<SitemapXmlRedirect />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/content" element={<AdminContent />} />
            <Route path="/admin/blog-scheduler" element={<AdminBlogScheduler />} />
            <Route path="/admin/rebrand" element={<AdminRebrand />} />
            <Route path="/admin/export" element={<AdminExport />} />
            <Route path="/admin/sitemap" element={<AdminSitemap />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
  </QueryClientProvider>
);

export default App;

import { useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/useTheme";
import { trackEvent, trackPageView } from "./lib/analytics";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Investors from "./pages/Investors";
import InvestorDeck from "./pages/InvestorDeck";
import Press from "./pages/Press";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();
const scrollMarkers = [25, 50, 75, 90];

function AnalyticsTracker() {
  const location = useLocation();
  const isInitialPage = useRef(true);
  const currentPath = useRef(`${window.location.pathname}${window.location.search}${window.location.hash}`);
  const routeStartedAt = useRef(Date.now());
  const scrollDepthSent = useRef<Set<number>>(new Set());

  const getCurrentPath = () => `${window.location.pathname}${window.location.search}${window.location.hash}`;

  const sendEngagement = (reason: string) => {
    const seconds = Math.round((Date.now() - routeStartedAt.current) / 1000);
    if (seconds < 3) return;

    trackEvent("page_engagement", {
      page_path: currentPath.current,
      engagement_time_seconds: seconds,
      reason,
    });
  };

  useEffect(() => {
    const nextPath = getCurrentPath();

    if (isInitialPage.current) {
      isInitialPage.current = false;
      currentPath.current = nextPath;
      routeStartedAt.current = Date.now();
      scrollDepthSent.current.clear();
      return;
    }

    sendEngagement("route_change");
    currentPath.current = nextPath;
    routeStartedAt.current = Date.now();
    scrollDepthSent.current.clear();
    trackPageView(nextPath);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const percentScrolled = Math.round((window.scrollY / scrollableHeight) * 100);
      const marker = scrollMarkers.find(
        (depth) => percentScrolled >= depth && !scrollDepthSent.current.has(depth),
      );

      if (!marker) return;

      scrollDepthSent.current.add(marker);
      trackEvent("scroll_depth", {
        page_path: currentPath.current,
        percent_scrolled: marker,
      });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        sendEngagement("visibility_hidden");
      }
    };

    const handlePageHide = () => {
      sendEngagement("page_hide");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, []);

  return null;
}

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <AnalyticsTracker />
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/investors" element={<Investors />} />
            <Route path="/investors/deck" element={<InvestorDeck />} />
            <Route path="/press" element={<Press />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);
export default App;

import { useEffect } from "react";
import { Outlet, useLocation, ScrollRestoration } from "react-router";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollRestoration />
      <ScrollToTop />
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

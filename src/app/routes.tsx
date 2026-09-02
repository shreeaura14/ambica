import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { ProductCategoriesPage } from "./pages/ProductCategoriesPage";
import { ProductSubcategoriesPage } from "./pages/ProductSubcategoriesPage";
import { ProductComparisonPage } from "./pages/ProductComparisonPage";
import { ProductSearchPage } from "./pages/ProductSearchPage";
import { ProductImageGalleryPage } from "./pages/ProductImageGalleryPage";
import { BulkOrderPage } from "./pages/BulkOrderPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AdminPanelPage } from "./pages/AdminPanelPage";
import { BulkOrderAdvancedPage } from "./pages/BulkOrderAdvancedPage";
import { ProductReviewsPage } from "./pages/ProductReviewsPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "contact", Component: ContactPage },
      { path: "products", Component: ProductCategoriesPage },
      { path: "products/category/:categoryName", Component: ProductSubcategoriesPage },
      { path: "products/compare", Component: ProductComparisonPage },
      { path: "products/search", Component: ProductSearchPage },
      { path: "products/gallery", Component: ProductImageGalleryPage },
      { path: "bulk-order", Component: BulkOrderPage },
      { path: "bulk-order-advanced", Component: BulkOrderAdvancedPage },
      { path: "profile", Component: ProfilePage },
      { path: "admin", Component: AdminPanelPage },
      { path: "admin/dashboard", Component: AdminDashboardPage },
      { path: "product-reviews", Component: ProductReviewsPage },
    ],
  },
]);
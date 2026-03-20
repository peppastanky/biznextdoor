import { createBrowserRouter } from "react-router";
import Landing from "./pages/Landing";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import CustomerLayout from "./layouts/CustomerLayout";
import BusinessLayout from "./layouts/BusinessLayout";
import CustomerHome from "./pages/customer/Home";
import Discover from "./pages/customer/Discover";
import Businesses from "./pages/customer/Businesses";
import Wishlist from "./pages/customer/Wishlist";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import CustomerProfile from "./pages/customer/Profile";
import MyOrders from "./pages/customer/MyOrders";
import Settings from "./pages/customer/Settings";
import FAQ from "./pages/customer/FAQ";
import Safety from "./pages/customer/Safety";
import ProductDetail from "./pages/customer/ProductDetail";
import ServiceDetail from "./pages/customer/ServiceDetail";
import BusinessProfile from "./pages/customer/BusinessProfile";
import BusinessHome from "./pages/business/Home";
import CreateListing from "./pages/business/CreateListing";
import Inventory from "./pages/business/Inventory";
import Orders from "./pages/business/Orders";
import Insights from "./pages/business/Insights";
import BusinessProfilePage from "./pages/business/Profile";
import BusinessSettings from "./pages/business/Settings";
import BusinessFAQ from "./pages/business/FAQ";
import BusinessSafety from "./pages/business/Safety";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/register",
    Component: Registration,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/customer",
    Component: CustomerLayout,
    children: [
      { index: true, Component: CustomerHome },
      { path: "discover", Component: Discover },
      { path: "businesses", Component: Businesses },
      { path: "wishlist", Component: Wishlist },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
      { path: "profile", Component: CustomerProfile },
      { path: "my-orders", Component: MyOrders },
      { path: "settings", Component: Settings },
      { path: "faq", Component: FAQ },
      { path: "safety", Component: Safety },
      { path: "product/:id", Component: ProductDetail },
      { path: "service/:id", Component: ServiceDetail },
      { path: "business/:id", Component: BusinessProfile },
    ],
  },
  {
    path: "/business",
    Component: BusinessLayout,
    children: [
      { index: true, Component: BusinessHome },
      { path: "create-listing", Component: CreateListing },
      { path: "inventory", Component: Inventory },
      { path: "orders", Component: Orders },
      { path: "insights", Component: Insights },
      { path: "profile", Component: BusinessProfilePage },
      { path: "settings", Component: BusinessSettings },
      { path: "faq", Component: BusinessFAQ },
      { path: "safety", Component: BusinessSafety },
    ],
  },
]);
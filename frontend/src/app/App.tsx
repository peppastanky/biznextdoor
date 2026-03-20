import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "./components/ui/sonner";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";
import { ReviewProvider } from "./context/ReviewContext";

export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <ReviewProvider>
          <RouterProvider router={router} />
          <Toaster />
        </ReviewProvider>
      </CartProvider>
    </UserProvider>
  );
}

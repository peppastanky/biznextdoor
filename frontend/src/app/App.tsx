import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "./components/ui/sonner";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <RouterProvider router={router} />
        <Toaster />
      </CartProvider>
    </UserProvider>
  );
}

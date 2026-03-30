import { RouterProvider } from "react-router";
import { router } from "./routes";
import { CartContextProvider } from "./context/ShoppingCartContext";

function App() {
  return (
    <CartContextProvider>
      <RouterProvider router={router} />
    </CartContextProvider>
  );
}

export default App;
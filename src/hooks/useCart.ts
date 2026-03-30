import { useContext } from "react";
import { CartContext } from "../context/ShoppingCartContext";

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartContextProvider");
    }
    return context;
}
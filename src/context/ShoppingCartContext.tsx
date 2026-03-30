/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, type ReactNode } from "react"
import type { CartContextType, CartItemProps } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartContextProvider = ({ children }: { children: ReactNode }) => {

    const [ cartItems, setCartItems ] = useLocalStorage<CartItemProps[]>("shopping-cart", []);
    const [ isOpen, setIsOpen ] = useState(false);

    //If the item with that id is found, return its quantity or return 0
    const getItemQuantity = (id: string) => {
        return cartItems.find(cartItem => cartItem.id === id)?.quantity || 0
    }

    const increaseCartItemQuantity = (id: string) => {
        setCartItems(cartItems => {
            if (cartItems.find(item => item.id === id) == null) {
                return [...cartItems, { id, quantity: 1 }]
            } else {
                return cartItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    
    const decreaseCartItemQuantity = (id: string) => {
        setCartItems(cartItems => {
            const item = cartItems.find(item => (item.id === id));
            if (!item) { return cartItems }

            if (item.quantity === 1) {
                return cartItems.filter(item => item.id !== id)
            } else {
                return cartItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        });
    };

    const removeFromCart = (id: string) => {
        setCartItems(cartItems => {
            return cartItems.filter( item => item.id !== id )
        })
    }

    const clearCart = () => {
        setCartItems([]);
    }

    // default start at 0
    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    )

    const openCart = () => {
        setIsOpen(true);
    }

    const closeCart = () => {
        setIsOpen(false);
    }

    const value: CartContextType = {
        openCart,
        closeCart,
        clearCart,
        cartItems,
        cartQuantity,
        getItemQuantity,
        increaseCartItemQuantity,
        decreaseCartItemQuantity,
        removeFromCart,
        isOpen
    }
    
    return (
        <CartContext value={value}>
            {children}
        </CartContext>
    )
}

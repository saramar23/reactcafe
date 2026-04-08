import type { LucideIcon } from "lucide-react"

export interface Product {
    id: string,
    name: string,
    price: number
    imgUrl: string
    alt: string
}

export type CartItemProps = {
    id: string,
    quantity: number
}

export type CartItemUIProps = {
    item: Product
    quantity: number
}

export type SocialsType = {
    id: string,
    icon: React.ReactNode,
    label: string,
    link: string
}

export type SocialListProps = {
    className: string,
    itemClassName: string
}

export type ContactsType = {
    id: string,
    icon: React.ReactNode,
    label: string,
    value: string
    link: string
}

export type NavLinksType = {
    id: string,
    to: string,
    label: string
}

export type CartContextType = {
    openCart: () => void,
    closeCart: () => void,
    clearCart: () => void,
    cartQuantity: number,
    cartItems: CartItemProps[],
    getItemQuantity: (id: string) => number,
    increaseCartItemQuantity: (id: string) => void,
    decreaseCartItemQuantity: (id: string) => void,
    removeFromCart: (id: string) => void
    isOpen: boolean
}

export type StoreItemProps = Product & {
    description: string
}

export type FormField = "firstName" | "lastName" | "email" | "message";

export type ContactFormValues = {
    firstName: string,
    lastName: string,
    email: string,
    message: string
}

export type HighlightsItemsProps = {
    id: string; 
    Icon: LucideIcon; 
    label: string
}

export type ConfirmationModalProps = {
    showModal: boolean,
    onHide: () => void,
    onConfirm: () => void
}
import { Button, Offcanvas, Stack } from "react-bootstrap"
import { useCart } from "../hooks/useCart"
import { CartItem } from "./CartItem"
import { formatCurrency } from "../utilities/formatCurrency"
import { itemsData } from "../data/items"
import { useRef, useState } from "react"
import { ConfirmationModal } from "./ConfirmationModal"
import { Link } from "react-router"

export const ShoppingCartDrawer = () => {
    const linkRef = useRef<HTMLAnchorElement>(null);
    const { closeCart, cartItems, isOpen, clearCart } = useCart();
    const [ showModal, setShowModal ] = useState(false);    

    const totalPrice = cartItems.reduce((total: number, cartItem) => {
        const item = itemsData.find(item => item.id === cartItem.id);
        if (!item) return total;
        return total + (item.price || 0) * cartItem.quantity;
    }, 0);

    const handleFocus = () => {
        linkRef.current?.focus();
    }

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {cartItems.length > 0 ? (
                    <>
                        <Stack gap={3}>
                            {cartItems.map(cartItem => {
                                const item = itemsData.find(item => item.id === cartItem.id)
                                if (item == null) return null;
                                return (
                                    <CartItem
                                        key={cartItem.id}
                                        item={item}
                                        quantity={cartItem.quantity}
                                    />
                                )
                            })}
                            <div
                                className="ms-auto fw-bold fs-5"
                            >
                                Total {formatCurrency(totalPrice)}
                            </div>
                        </Stack>
                        <Button
                            onClick={() => setShowModal(true)}
                            className="btn-remove"
                        >
                            Clear Cart
                        </Button>
                        <ConfirmationModal
                            showModal={showModal}
                            onHide={() => setShowModal(false)}
                            onConfirm={() => { clearCart(); setShowModal(false); handleFocus()}}
                        />
                    </>
                )
                    :
                    <Stack gap={3} className="col-md-5 mx-auto align-items-center align-content-center">
                        <p>Your cart is empty.</p>
                        <Link
                            to="/menu"
                            onClick={closeCart}
                            className="btn btn-brand"
                            ref={linkRef}
                        >
                            Start Shopping
                        </Link>
                    </Stack>
                }
            </Offcanvas.Body>
        </Offcanvas>
    )
}
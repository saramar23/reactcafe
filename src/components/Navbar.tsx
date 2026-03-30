import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap"
import { NavLink } from "react-router"
import { ShoppingCart } from "lucide-react"
import { useCart } from "../hooks/useCart"
import { NAVLINKS } from "../data/navLinks"

export const Navbar = () => {
    const { openCart, cartQuantity } = useCart();

    return (
        <NavbarBs
            aria-label="Main Navigation"            
            className="shadow-sm fixed-top"
            expand="lg"
        >
            <Container>
                {/* me-auto pushes everything to the right */}
                <NavbarBs.Brand as={NavLink} to="/" className="d-flex align-items-center gap-2 me-auto">
                    <span className="brand-logo ms-2 ms-md-0">
                        ReactCafe
                    </span>
                </NavbarBs.Brand>
                {/* d-flex (Bootstrap) and order-lg-last to keep the btn on the right on desktop too */}
                <div className="d-flex align-items-center order-lg-last">
                    {cartQuantity > 0 &&
                        <Button
                            aria-label={`Open Shopping Cart, ${cartQuantity} items`}
                            className="cart-button mx-2 p-2"                            
                            onClick={openCart}
                        >
                            <ShoppingCart size={24} aria-hidden="true" />
                            <span className="visually-hidden">Items in cart:</span>
                            <div
                                className="shopping-cart-quantity-circle rounded-circle d-flex justify-content-center align-items-center"
                                aria-hidden="true"
                            >
                                {cartQuantity}
                            </div>
                        </Button>
                    }
                    <NavbarBs.Toggle 
                        aria-controls="main-navbar-nav" 
                        aria-label="Toggle navigation menu"
                        className="p-1"
                        
                    />
                </div>
                {/* COLLAPSIBLE NAV: This MUST be after the toggle/cart in the code so it drops to its own line on mobile */}
                <NavbarBs.Collapse id="main-navbar-nav">
                    <Nav 
                        as="nav" 
                        aria-label="Primary" 
                        className="ms-4 align-items-center"
                    >
                        {NAVLINKS.map(link => (
                            <Nav.Link
                                key={link.id}
                                as={NavLink}
                                to={link.to}
                                className="px-3 mx-2 text-decoration-none"
                            >
                                {link.label}
                            </Nav.Link>
                        ))}
                    </Nav>
                </NavbarBs.Collapse>
            </Container>
        </NavbarBs>
    )
}
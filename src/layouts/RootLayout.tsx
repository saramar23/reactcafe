import { Outlet } from "react-router";
import { Container } from "react-bootstrap";
import { Navbar } from "../components/Navbar";
import { ShoppingCartDrawer } from "../components/ShoppingCartDrawer";
import { Footer } from "../components/Footer";
import { useLocation } from "react-router";

//Add navbar, sidebar, footer
export function RootLayout() {
    const { pathname } = useLocation();
    const isHome = pathname === "/";

    return (
        <>
            {/* accessibility button */}
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>
            <header>
                <Navbar />
            </header>
            <main id="main-content" tabIndex={-1} className="mt-2">
                {
                    isHome 
                    ? 
                    <Outlet /> 
                    : 
                    <Container>
                        <Outlet />
                    </Container>
                }
            </main>
            <aside>
                <ShoppingCartDrawer  />
            </aside>
            <footer className="mt-5">
                <Footer />
            </footer>
        </>
    )
}
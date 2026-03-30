import { Container } from "react-bootstrap";
import { SocialsList } from "./SocialsList";
import { NavLink } from "react-router";
import { NAVLINKS } from "../data/navLinks";

export const Footer = () => {
    return (
        <Container fluid className="d-flex flex-column gap-4 text-center p-4">
            <div className="d-flex flex-column flex-md-row gap-4 justify-content-evenly align-items-md-start">
                <NavLink to="/" className="text-decoration-none">
                    <span className="brand-logo fs-5">ReactCafe</span>
                </NavLink>
                <div>
                    <span id="quick-link-labels">Quick Links</span>
                    <nav aria-labelledby="quick-link-labels">
                        <ul className="footer-links list-unstyled mb-0 mt-2">
                            {NAVLINKS.map(link => (
                                <li key={link.id}>
                                    <NavLink 
                                        to={link.to}
                                        className="text-decoration-none"
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div>
                    <span>Follow us</span>
                    <SocialsList className="justify-content-center" itemClassName="footer-links" />
                </div>
            </div>
            <hr />
            <div>
                <p className="mb-0"><small>&copy; 2026 ReactCafe. All rights reserved.</small></p>
            </div>
        </Container>
    )
}
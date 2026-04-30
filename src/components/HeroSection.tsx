import { Container } from "react-bootstrap";
import { NavLink } from "react-router";
import { publicUrl } from "../utilities/publicUrl";

export const HeroSection = () => {
    return (
        <section
            aria-label="Hero section"
            className="position-relative hero-section w-100"
            style={{
                backgroundImage: `url(${publicUrl("media/coffee-hero.png")})`,
            }}
        >
            <div
                aria-hidden="true"
                className="position-absolute top-0 start-0 h-100 w-100 hero-blur-mask"
            />
            <Container className="h-100 d-flex align-items-center position-relative mt-5" style={{ zIndex: 2 }}>
                <div className="row w-100">
                    <div className="col-lg-6 text-white">
                        <h1 className="fw-bold display-4">
                            Brewed Locally.<br /> Served With Heart.
                        </h1>
                        <p className="fst-italic text-spaced lead mt-3">
                            Your neighborhood café for handcrafted espresso, fresh pastries, and warm vibes.
                        </p>
                        <div className="mt-4 d-flex gap-3">
                            <NavLink to="/menu" className="btn btn-brand btn-lg">Go to Our Menu</NavLink>
                        </div>
                        <div className="mt-4">
                            <span className="text-warning fs-4">★★★★★</span>
                            <span className="ms-2 ">“Best coffee in town” — Local Review</span>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};
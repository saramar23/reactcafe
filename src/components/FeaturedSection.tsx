import { Col, Container, Row } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import type { Product } from "../types";
import { NavLink } from "react-router";

export const FeaturedSection = ({ featuredData }: { featuredData: Product[] }) => {
    return (
        <section
            aria-label="Featured items"
        >
            <Container
                className="featured-section-container my-2 my-md-5"
            >
                <div className="py-4">
                    <p className="text-spaced text-uppercase text-muted small mb-1">Our Choices</p>
                    <h2 className="heading fw-semibold">
                        ReactCafe best sellers
                    </h2>
                    <p className="text-spaced text-muted fst-italic fs-6">
                        A list of our best-seller items chosen for you.
                    </p>
                </div>
                <Row xs={1} md={2} lg={3}
                    className="g-4"
                >
                    {featuredData.map(feature => (
                        <Col
                            key={feature.id}
                            className="position-relative"
                        >
                            <div
                                className="featured-wrapper position-relative "
                            >
                                <img
                                    src={feature.imgUrl}
                                    alt={feature.alt}
                                    className="featured-image"
                                />
                                <div
                                    className="featured-overlay position-absolute bottom-0 start-0 p-1 shadow text-center rounded-top"
                                >
                                    <h3
                                        className="featured-title fw-normal"
                                    >
                                        {feature.name}
                                    </h3>
                                    <p
                                        className="fst-italic"
                                    >
                                        {formatCurrency(feature.price)}
                                    </p>
                                    <NavLink
                                        to={`/menu#${feature.id}`}
                                        className="btn btn-brand btn-md my-2"
                                        aria-label={`Order now ${feature.name}`}
                                    >
                                        Order now
                                    </NavLink>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    )
}
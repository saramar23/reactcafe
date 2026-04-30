import { Col, Container, Row } from "react-bootstrap"
import { PageTitle } from "../components/PageTitle"
import { publicUrl } from "../utilities/publicUrl"

export const About = () => {
    return (
        <Container>
            <PageTitle
                className="page-title-block--page"
                title="About us"
                subtitle="The people and place behind ReactCafe."
            />
            <Row xs={1} md={1} xl={2} className="g-5 mb-5">
                <Col>
                    <img
                        src={publicUrl("media/reactcafe.png")}
                        className="img-fluid img-about-page rounded"
                        alt="Inside ReactCafe"
                    />
                </Col>
                <Col>
                    <h2
                        className="mb-1"
                    >
                        Our Story
                    </h2>
                    <p
                        className="fs-5 text-muted my-3"
                    >
                        In 2015, Joe and Anna Marrias decided to turn their shared passion for coffee into a reality.
                        They envisioned a place where neighbors could gather, stories could be shared, and community could thrive.
                        Thus, ReactCafe was born. Nestled on a cozy corner in a quiet Vancouver neighborhood, the shop became a beloved fixture,
                        a testament to the power of a warm cup and a welcoming smile.
                    </p>
                    <p
                        className="fs-5 text-muted mb-3"
                    >
                        The Marrias' commitment to quality and community was evident in every detail. They sourced their beans from local roasters,
                        ensuring a fresh and flavorful brew, and baked fresh pastries every day to ensure customers would get the best quality ever.
                    </p>
                    <p
                        className="fs-5 text-muted mb-3"
                    >
                        Over the years, ReactCafe became more than just a place to grab a coffee.
                        It became a hub for local events, hosting open mic nights, book clubs, and art exhibits.
                    </p>
                    <p
                        className="fs-5 text-muted mb-3"
                    >
                        As ReactCafe celebrates its 11th year, it remains a testament to the power of a simple idea well-executed.
                        Joe and Anna's vision for a community-focused coffee shop has truly blossomed,
                        creating a warm and welcoming space where friends, neighbors,
                        and strangers can come together to enjoy a good cup of coffee and connect with one another.
                    </p>
                </Col>
            </Row>
        </Container>
    )
}
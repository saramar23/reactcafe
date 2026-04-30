import { Col, Container, Row } from "react-bootstrap"
import { PageTitle } from "../components/PageTitle"
import { StoreItem } from "../components/StoreItem"
import { itemsData } from "../data/items"
import { useEffect } from "react"
import { useLocation } from "react-router"

export const Menu = () => {

    const { hash } = useLocation();

    useEffect(() => {        
        if (hash) {
            const id = hash.slice(1);
            const element = document.getElementById(id);
            element?.scrollIntoView();
        }
    }, [hash]);

    return (
        <Container>
            <PageTitle
                className="page-title-block--page"
                title="Menu"
                subtitle="Handcrafted drinks and bites, ready to order."
            />
            <Row xs={1} md={2} lg={3} className="g-3 mb-5">
                {itemsData.map(item => (
                    <Col
                        key={item.id}
                        id={item.id}
                    >
                        <StoreItem {...item} />
                    </Col>))
                }
            </Row>
        </Container>
    )
}
import { Armchair, Coffee, Croissant, Smile, Users } from "lucide-react"
import { Button, Col, Container, Row } from "react-bootstrap"
import type { HighlightsItemsProps } from "../types"

const HIGHLIGHT_ITEMS: HighlightsItemsProps[] = 
[
    {   
        id: "beans", 
        Icon: Coffee, 
        label: "High-quality beans from local roasters" 
    },
    { 
        id: "pastries", 
        Icon: Croissant, 
        label: "Fresh pastries baked in-house daily" 
    },
    { 
        id: "staff", 
        Icon: Smile, 
        label: "Friendly staff & welcoming atmosphere" 
    },
    { 
        id: "community", 
        Icon: Users, 
        label: "Community events & local collaborations" 
    },
    { 
        id: "seating", 
        Icon: Armchair, 
        label: "Comfortable seating & relaxing ambience" 
    },
]

export const Highlights = () => {
    return (
        <Container>
            <p className="text-spaced text-uppercase text-muted small mb-1">
                Highlights
            </p>
            <h2 className="heading fw-semibold mb-3">What we're known for</h2>
            <Row xs={1} md={2} className="g-3">
                {HIGHLIGHT_ITEMS.map(({ id, Icon, label }) => (
                    <Col key={id}>
                        <div className="d-flex align-items-center gap-3">
                            <Button className="btn-brand">
                                <Icon size={24} aria-hidden="true" />
                            </Button>
                            <span>{label}</span>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

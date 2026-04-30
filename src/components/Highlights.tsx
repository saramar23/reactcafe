import { Armchair, Coffee, Croissant, Smile, Users } from "lucide-react"
import { Col, Container, Row } from "react-bootstrap"
import type { HighlightsItemsProps } from "../types"
import { PageTitle } from "./PageTitle"

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
            <PageTitle
                as="div"
                headingLevel={2}
                eyebrow="Highlights"
                title="What we're known for"
                subtitle="Why people love ReactCafe."
                subtitleVariant="italic"
            />
            
            <Row xs={1} md={2} className="g-3">
                {HIGHLIGHT_ITEMS.map(({ id, Icon, label }) => (
                    <Col key={id}>
                        <div className="d-flex align-items-center gap-3">
                            <span className="highlights-icon d-inline-flex flex-shrink-0 p-2 rounded" aria-hidden="true">
                                <Icon size={24} />
                            </span>
                            <span>{label}</span>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

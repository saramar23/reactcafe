import { Button, Card } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
import { Minus, Plus } from "lucide-react"
import type { StoreItemProps } from "../types"
import { useCart } from "../hooks/useCart"
import { publicUrl } from "../utilities/publicUrl"

export const StoreItem = ({ id, name, description, price, imgUrl, alt }: StoreItemProps) => {
    const { getItemQuantity, increaseCartItemQuantity, decreaseCartItemQuantity, removeFromCart } = useCart();
    const quantity = getItemQuantity(id);

    return (
        <Card
            as="article"
            className="h-100">
            <Card.Img
                variant="top"
                loading="lazy"
                src={publicUrl(imgUrl)}
                height="200px"
                style={{ objectFit: "cover" }}
                alt={alt}
            />
            <Card.Body className="card-body-content d-flex flex-column mt-auto">
                <Card.Title className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                    <span 
                        className="fs-4 flex-grow-1 text-break" 
                        aria-label={`Item name: ${name}`}
                    >
                        {name}
                    </span>
                    <span 
                        className="fs-5 text-muted flex-shrink-0" 
                    >
                        <span className="visually-hidden">Price: </span>
                        {formatCurrency(price)}
                    </span>
                </Card.Title>
                <div className="flex-grow-1">
                    <p>{description}</p>
                </div>
                <div
                    className="d-flex align-items-center flex-wrap w-100"
                >
                    {quantity === 0 ?
                        <div className="w-100">
                            <Button                                
                                aria-label={`Add to cart ${name}`}
                                className="btn-brand fw-medium"
                                onClick={() => increaseCartItemQuantity(id)}
                            >
                                Add to cart
                            </Button>
                        </div> :
                        <div className="center-card-buttons d-flex flex-row align-items-center justify-content-between flex-wrap w-100">
                            <div className="d-flex align-items-center justify-content-center gap-2">
                                <Button                                    
                                    aria-label={`Decrease quantity of ${name}`}
                                    className="btn-brand btn-circle-sm rounded-circle"
                                    onClick={() => decreaseCartItemQuantity(id)}
                                >
                                    <Minus size={22} aria-hidden="true"/>
                                </Button>
                                <span                                   
                                    aria-label={`Quantity of ${name}: ${quantity}`}
                                >
                                    {quantity}
                                </span>
                                <Button                                    
                                    aria-label={`Increase quantity of ${name}`}
                                    className="btn-brand btn-circle-sm rounded-circle"
                                    onClick={() => increaseCartItemQuantity(id)}
                                >
                                    <Plus size={22} aria-hidden="true"/>
                                </Button>
                            </div>
                            <div className="flex-wrap">
                                <Button                                    
                                    aria-label={`Remove from cart ${name}`}
                                    className="btn-remove fw-medium"
                                    onClick={() => removeFromCart(id)}
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    }
                </div>
            </Card.Body>
        </Card>
    )
}
import type { CartItemUIProps } from "../types";
import { useCart } from "../hooks/useCart";
import { Button, Stack } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { publicUrl } from "../utilities/publicUrl";

export const CartItem = ({ item, quantity }: CartItemUIProps) => {

    const { removeFromCart } = useCart();

    return (
        <Stack direction="horizontal" gap={2}>
            <img 
                src={publicUrl(item.imgUrl)} 
                alt=""
                className="cart-image"                
            />
            <div className="me-auto">
                <div>
                    <span>
                        {item.name}
                    </span>
                    {quantity > 0 && 
                        (
                            <span className="text-muted m-2">
                                x{quantity}
                            </span>
                        )
                    }
                </div>
                <div className="text-muted">
                    {formatCurrency(item.price)}
                </div>
            </div>
            <div>
                {formatCurrency(item.price * quantity)}
            </div>
            <Button 
                variant="outline-danger" 
                size="sm" 
                aria-label={`Remove ${item.name} from cart`}
                onClick={() => removeFromCart(item.id)}
            >
                &times;
            </Button>
        </Stack>
    )
}
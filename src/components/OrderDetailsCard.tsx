import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { CartItem } from "@/types";
import CartItemDetail from "./CartItemDetail";

type Props = {
    cartItems: CartItem[];
    removeFromCart: (cartItem: CartItem) => void;
    onCheckout: (cartItems: CartItem[]) => void;
    
}

const OrderDetailsCard = ({ cartItems, removeFromCart, onCheckout}: Props) => {
    const subTotal = cartItems.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0
    );
    return (
        <Card className="px-4 bg-background">
            <CardHeader className="text-lg uppercase pb-1">Order Details</CardHeader>
            <CardContent>
                <Separator className="mb-5"/>
                {cartItems.map((cartItem: CartItem) => (
                    <div  key={cartItem._id} >
                        <CartItemDetail cartItem={cartItem} removeFromCart={removeFromCart} />
                    </div>
                ))}
                <Separator className="mb-5"/>
                <div className="flex flex-row justify-between mb-2">
                    <div>Subtotal</div>
                    <div>${subTotal.toFixed(2)}</div>
                </div>
                <div className="flex flex-row justify-between mb-2">
                    <div>Tax</div>
                    <div>Calculated at payment</div>
                </div>
                <div>

                </div>
                <div className="flex flex-row justify-between mb-5 font-bold">
                    <div>Total</div>
                    <div>${subTotal.toFixed(2)} + tax</div>
                </div>
                <Button onClick={() => onCheckout(cartItems)} variant="default" className="w-full">Continue to payment</Button>
            </CardContent>
        </Card>
    );
}

export default OrderDetailsCard;
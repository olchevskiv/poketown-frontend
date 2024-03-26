import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { CartItem } from "@/types";
import CartItemDetail from "./CartItemDetail";

type Props = {
    cartItems: CartItem[];
    removeFromCart: (cartItem: CartItem) => void;
}

const OrderDetailsCard = ({ cartItems, removeFromCart }: Props) => {
    const tax = 0.05;
    const subTotal = cartItems.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0
    );
    const taxTotal = (subTotal * tax).toFixed(2);
    const totalCost = (subTotal + +taxTotal).toFixed(2);

    /*const onCheckout = (pickUpFormData, userFormData) => {
        if (!cartItems) {
            return;
        }
      
        const checkoutData = {
            cartItems: cartItems
        };
    
        const data = await createCheckoutSession(checkoutData);
        window.location.href = data.url;
    }*/

    return (
        <Card className="px-4">
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
                    <div>${taxTotal}</div>
                </div>
                <div>

                </div>
                <div className="flex flex-row justify-between mb-5 font-bold">
                    <div>Total</div>
                    <div>${totalCost}</div>
                </div>
                <Button variant="default" className="w-full">Continue to payment</Button>
            </CardContent>
        </Card>
    );
}

export default OrderDetailsCard;
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { CartItem, Restaurant } from "@/types";
import CartItemDetail from "./CartItemDetail";
import { useCartItemsContext } from "@/contexts/CartItemsContext";

import PaymentButton from "./PaymentButton";

type Props = {
    pickUpTime: Date|undefined;
    restaurant: Restaurant;
}

const OrderDetailsCard = ({restaurant, pickUpTime}: Props) => {
    const { cartItems, setCartItems } = useCartItemsContext();

    const subTotal = cartItems.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0
    );

    const removeFromCart = (currentCartItem: CartItem) => {
        setCartItems((prevCartItems: CartItem[]) => {
            let updatedCartItems;

            if (currentCartItem.quantity > 1) {
                updatedCartItems = prevCartItems.map((cartItem) =>
                cartItem.cartItemId === currentCartItem.cartItemId
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
                );
            } else {
                updatedCartItems = prevCartItems.filter(
                    (cartItem) => currentCartItem.cartItemId !== cartItem.cartItemId
                );
            }

            sessionStorage.setItem(
                `cartItems`,
                JSON.stringify(updatedCartItems)
            );

            return updatedCartItems;
        });
    };
    
    return (
        <Card className="px-4 bg-background">
            <CardHeader className="text-lg uppercase pb-1">Order Details</CardHeader>
            <CardContent>
                <Separator className="mb-5"/>
                {cartItems.map((cartItem: CartItem) => (
                    <div  key={cartItem.cartItemId} >
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
                <PaymentButton restaurant={restaurant} cartItems={cartItems} pickUpTime={pickUpTime} />
            </CardContent>
        </Card>
    );
}

export default OrderDetailsCard;
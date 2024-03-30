import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { CartItem, Restaurant } from "@/types";
import CartItemDetail from "./CartItemDetail";
import { toast } from "sonner";
import { useCartItemsContext } from "@/contexts/CartItemsContext";
import { useCreateCheckoutSession } from "@/api/OrderAPI";
import Loader from "./Loader";

type Props = {
    pickUpTime: Date|undefined;
    restaurant: Restaurant;
}

const OrderDetailsCard = ({restaurant, pickUpTime}: Props) => {
    const { cartItems, setCartItems } = useCartItemsContext();
    const { createCheckoutSession, isLoading } = useCreateCheckoutSession();
    
    if ( isLoading ) {
        return <Loader />;
    }
    const subTotal = cartItems.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0
    );

    const removeFromCart = (currentCartItem: CartItem) => {
        setCartItems((prevCartItems: CartItem[]) => {
            let updatedCartItems;

            if (currentCartItem.quantity > 1) {
                updatedCartItems = prevCartItems.map((cartItem) =>
                cartItem._id === currentCartItem._id
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
                );
            } else {
                updatedCartItems = prevCartItems.filter(
                    (cartItem) => currentCartItem._id !== cartItem._id
                );
            }

            sessionStorage.setItem(
                `cartItems`,
                JSON.stringify(updatedCartItems)
            );

            return updatedCartItems;
        });
    };

    const onCheckout = async (restaurant:Restaurant,cartItems: CartItem[],pickUpTime: Date|undefined) => {
        if (!cartItems) {
            toast.error('You have not added any items to your order');
            return;
        }

        if (!pickUpTime) {
            toast.error('You have not added selected a pick up time!');
            return;
        }
      
        const checkoutData = {
            pickUpTime: pickUpTime.toString(),
            cartItems: cartItems,
            restaurantId: restaurant._id
        };
    
        const data = await createCheckoutSession(checkoutData);

        if (data.url){
            window.location.href = data.url; // redirect user to Stripe for checkout
        }
       
    }
    
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
                <Button onClick={() => onCheckout(restaurant,cartItems, pickUpTime)} variant="default" className="w-full">Continue to payment</Button>
            </CardContent>
        </Card>
    );
}

export default OrderDetailsCard;
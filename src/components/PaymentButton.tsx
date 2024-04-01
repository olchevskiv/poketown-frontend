import { useCreateCheckoutSession } from "@/api/OrderAPI";
import { CartItem, Restaurant } from "@/types";
import { toast } from "sonner";
import Loader from "./Loader";
import { Button } from "./ui/button";

type Props = {
    restaurant: Restaurant;
    cartItems: CartItem[];
    pickUpTime?: Date;
}

const PaymentButton = ({restaurant, cartItems, pickUpTime}: Props) => {

    const { createCheckoutSession, isLoading } = useCreateCheckoutSession();
    
    if ( isLoading ) {
        return <Loader />;
    }
    
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
    <Button onClick={() => onCheckout(restaurant,cartItems, pickUpTime)} variant="default" className="w-full">Continue to payment</Button>
  );
}

export default PaymentButton;
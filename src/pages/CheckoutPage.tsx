
import { CartItem } from "@/types";
import OrderDetailsCard from "@/components/OrderDetailsCard";
import PickupDetailsCard from "@/components/PickupDetailsCard";
import { useCartItemsContext } from "@/contexts/CartItemsContext";
import { useCreateCheckoutSession } from "@/api/OrderAPI";
import Loader from "@/components/Loader";
import { useRestaurantContext } from "@/contexts/RestaurantContext";
import { toast } from "sonner";

const CheckoutPage = () => {
    const {cartItems, setCartItems} = useCartItemsContext();
    const { createCheckoutSession, isLoading } = useCreateCheckoutSession();
    const { restaurant } = useRestaurantContext();
    
    if (isLoading) {
        return <Loader/>;
    }
    
    const removeFromCart = (currentCartItem: CartItem) => {
        setCartItems((prevCartItems) => {
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

    const onCheckout = async (cartItems: CartItem[]) => {
        if (!cartItems) {
            toast.error('You have not added any items to your order');
            return;
        }
      
        const checkoutData = {
            cartItems: cartItems,
            restaurantId: restaurant._id
        };
    
        const data = await createCheckoutSession(checkoutData);
        window.location.href = data.url; // redirect user to Stripe for checkout
    }

  return (
    <div className="w-full flex-col pb-10">
        <h2 className="text-2xl pl-3 mb-4 hidden">Checkout</h2>
        <div className="flex flex-col md:flex-row w-full">
            <div className="md:basis-1/2 px-3 space-y-4 mb-4">
                <PickupDetailsCard />
            </div>

            <div className="md:basis-1/2 px-3">
                <OrderDetailsCard cartItems={cartItems} onCheckout={onCheckout} removeFromCart={removeFromCart}/>
            </div>

        </div>
    </div>
  );
}

export default CheckoutPage;
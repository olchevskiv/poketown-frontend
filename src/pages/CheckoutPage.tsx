
import { CartItem } from "@/types";
import OrderDetailsCard from "@/components/OrderDetailsCard";
import PickupDetailsCard from "@/components/PickupDetailsCard";
import { useCartItemsContext } from "@/contexts/CartItemsContext";

const CheckoutPage = () => {
    const {cartItems, setCartItems} = useCartItemsContext();

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
    
  return (
    <div>
        <h2 className="text-2xl pl-3 mb-4">Checkout</h2>
        <div className="flex flex-col md:flex-row w-full flex-wrap">
            <div className="md:basis-1/2 px-3 space-y-4 mb-4">
                <PickupDetailsCard />
            </div>

            <div className="md:basis-1/2 px-3">
                <OrderDetailsCard cartItems={cartItems} removeFromCart={removeFromCart}/>
            </div>

        </div>
    </div>
  );
}

export default CheckoutPage;
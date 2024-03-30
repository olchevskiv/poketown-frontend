import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetTitle } from "./ui/sheet";
import { CartItem } from "@/types";
import CartItemDetail from "./CartItemDetail";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useOrderDetailsSheetContext } from "@/contexts/OrderDetailsSheetContext";
import { useCartItemsContext } from "@/contexts/CartItemsContext";
import { useRestaurantContext } from "@/contexts/RestaurantContext";

type Props = {
    open:boolean;
    onOpenChange: (open: boolean) => void;
}

const OrderDetailsSheet = ({open,onOpenChange}: Props) => {
    const { cartItems, setCartItems } = useCartItemsContext();
    const navigate = useNavigate(); 
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    const { setOpen } = useOrderDetailsSheetContext();
    const { restaurant } = useRestaurantContext();
    
    const onLogin = async () => {
        await loginWithRedirect({
          appState: {
            returnTo: 'checkout',
          },
        });
    };

    const onCheckout = () => {
        setOpen(false);
        navigate('checkout');
    }
    
    if (isLoading) {
        return <div></div>;
    }

    const subTotal = cartItems.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0
    );

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

    return(
        <Sheet open={open}  onOpenChange={onOpenChange}>
            <SheetContent className="space-y-3 ">
                <SheetTitle>
                    My Order
                </SheetTitle>
                <Separator className="border border-gray-200 mb-10" />
                {
                    restaurant && restaurant.address ? (
                        <div className="flex flex-row flex-wrap justify-between items-center">
                            <div className="text-md self-start font-bold">Pick Up From</div>
                            <div className="flex flex-col self-start text-wrap text-sm">
                                <div>{restaurant.address}</div>
                                <div>{restaurant.city}, {restaurant.state} {restaurant.zipCode}</div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-row justify-between items-center">
                            <div className="text-md font-bold">Pick Up From</div>
                            <Button onClick={() => {navigate('/locations');setOpen(false);}} variant="secondary">See Locations</Button>
                        </div>
                    )
                }
                <Separator className="border border-gray-200 mb-10" />
                <div className="flex flex-col">
                    <div className="flex flex-col h-[450px] md:h-[640px] lg:[700px] overflow-y-scroll pr-2">
                        {
                            cartItems && cartItems.length > 0 ? (
                                cartItems.map((cartItem: CartItem) => (
                                    <div key={cartItem._id}>
                                        <CartItemDetail cartItem={cartItem} removeFromCart={removeFromCart} />
                                    </div>
                                ))
                            ) : (
                                <span>You have no items in your order!</span>
                            )
                        }
                    </div>
                       
                    <div className="absolute bottom-0 right-0 left-0 p-5 bg-background">
                        <Separator className="border border-gray-200 mb-3" />
                        <div className="flex flex-row justify-between mb-2">
                            <div>Subtotal</div>
                            <div>${subTotal.toFixed(2)}</div>
                        </div>
                        <div className="flex flex-row justify-between mb-2">
                            <div>Tax</div>
                            <div>Calculated at checkout</div>
                        </div>
                        <div>

                        </div>
                        <div className="flex flex-row justify-between mb-3 font-bold text-lg">
                            <div className="uppercase">Total</div>
                            <div>${subTotal.toFixed(2)} + tax</div>
                        </div>
                        {
                            isAuthenticated ? (
                                (cartItems && cartItems.length > 0) ? (
                                    <Button onClick={onCheckout } variant="default" className="w-full">Checkout</Button>
                                ): (
                                    <Button onClick={ () => {navigate('/menu');setOpen(false);} } variant="secondary" className="w-full">View Menu</Button>
                                )
                            ) : (
                                <Button onClick={ onLogin } variant="default" className="w-full">Login to Checkout</Button>
                            )
                        }
                  </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default OrderDetailsSheet;
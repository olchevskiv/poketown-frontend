import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetTitle } from "./ui/sheet";
import { CartItem } from "@/types";
import CartItemDetail from "./CartItemDetail";
import { Button } from "./ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useOrderDetailsSheetContext } from "@/contexts/OrderDetailsSheetContext";
import { useCartItemsContext } from "@/contexts/CartItemsContext";

type Props = {
    open:boolean;
    onOpenChange: (open: boolean) => void;
}

const OrderDetailsSheet = ({open,onOpenChange}: Props) => {
    const {cartItems, setCartItems} = useCartItemsContext();
    const navigate = useNavigate(); 
    const {loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    const { pathname } = useLocation();
    const {setOpen} = useOrderDetailsSheetContext();
    
    const onLogin = async () => {
        await loginWithRedirect({
          appState: {
            returnTo: pathname,
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

    const tax = 0.05;
    const subTotal = cartItems.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0
    );
    const taxTotal = (subTotal * tax).toFixed(2);
    const totalCost = (subTotal + +taxTotal).toFixed(2);

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
                <div className="flex flex-col">
                    <div className="flex flex-col h-[450px] md:h-[640px] lg:[700px] overflow-y-scroll pr-2">
                        {cartItems.map((cartItem: CartItem) => (
                            <div key={cartItem._id}>
                                <CartItemDetail cartItem={cartItem} removeFromCart={removeFromCart} />
                            </div>
                        ))}
                    </div>
                       
                    <Separator className="border border-gray-200 mb-3" />
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
                    <div className="flex flex-row justify-between mb-5 font-bold text-lg">
                        <div className="uppercase">Total</div>
                        <div>${totalCost}</div>
                    </div>

                    {
                        isAuthenticated ? (
                            <Button onClick={onCheckout } variant="default" className="w-full">Checkout</Button>
                        ) : (
                            <Button onClick={ onLogin } variant="default" className="w-full">Login to Checkout</Button>
                        )
                    }
                  
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default OrderDetailsSheet;
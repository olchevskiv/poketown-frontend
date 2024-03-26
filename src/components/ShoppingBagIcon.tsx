import { ShoppingBag } from "lucide-react";
import { Badge } from "./ui/badge";
import { useOrderDetailsSheetContext } from "@/contexts/OrderDetailsSheetContext";
import { useCartItemsContext } from "@/contexts/CartItemsContext";

const ShoppingBagIcon = () => {
  const {setOpen} = useOrderDetailsSheetContext();
  const {cartItems} = useCartItemsContext();
  const cartItemTotal = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
);

  return (
    <div onClick={() => { setOpen(true) }} className="relative cursor-pointer hover:text-primary hover:bg-background" aria-label="Open my order button">
        <Badge className="align-top w-[5px] w-[5px] font-bold px-2 justify-center absolute hover:bg-primary hover:text-white -top-3 -right-1">{cartItemTotal}</Badge>
        <ShoppingBag className="hover:text-primary mr-2" />
    </div>
  )
}

export default ShoppingBagIcon;
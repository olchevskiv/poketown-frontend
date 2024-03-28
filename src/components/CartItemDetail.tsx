import { CartItem } from "@/types";
import customBowlImage from "../assets/custom-bowl.png"
import { Trash } from "lucide-react";
import { Badge } from "./ui/badge";

type Props = {
  cartItem: CartItem;
  removeFromCart: (cartItem: CartItem) => void;
}

const CartItemDetail = ({cartItem,removeFromCart}: Props) => {
  return (
    <div className="flex flex-row space-x-2 items-center mb-3">
        <div className="w-2/12">
            {
                cartItem.image_url ? (
                    <img className="w-full" src={cartItem.image_url}></img>
                ) : (
                    <img className="w-full" src={customBowlImage}></img>
                )
            }
        </div>
        <div className="flex flex-row space-x-2 justify-between mb-3 w-full">
            <div className="flex flex-col">
                <span className="font-bold">{cartItem.name}</span>
                { cartItem.ingredients && cartItem.ingredients.length > 0 ? (
                    <span className="text-sm">
                        Ingredients: {
                            cartItem.ingredients.reduce(
                                (ingredientsStr, ingredient) => ingredientsStr + ingredient.name + ', ',
                                '',
                            ).slice(0, -2)
                        }
                    </span>
                ) : (
                    <></>
                )}
                <div className="text-sm flex flex-row my-1 items-center space-x-2">
                    <Trash onClick={() => removeFromCart(cartItem)} size={18} className="text-primary-foreground hover:text-primary hover:cursor-pointer"></Trash>
                    <Badge variant="secondary" className="hover:bg-secondary">x{cartItem.quantity}</Badge>
                </div>
            </div>
            <div>{
                (cartItem.price * cartItem.quantity).toFixed(2)
            }</div>
        </div>
    </div>
  );
}

export default CartItemDetail;
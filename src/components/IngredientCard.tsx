import { Ingredient } from "@/types";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

type Props = {
    ingredient: Ingredient;
    customizable?: boolean;
    addToCustomOrder?: () => void;
    removeFromCustomOrder?: () => void;
}

const IngredientCard = ({ingredient, customizable=true, addToCustomOrder=()=>{}, removeFromCustomOrder}: Props) => {
    return (
        <div className="flex flex-col cursor-pointer py-5 rounded-xl hover:border hover:border-primary-foreground bg-muted hover:bg-background" aria-label={ingredient.name}>
            <div className="flex flex-col justify-center items-center  h-[140px] w-[130px] ">   
                <img className="w-[60px]" src={ingredient.image_url} aria-label={ingredient.name + ' image'} ></img>
                <div className="mt-3 flex flex-col text-center items-center">
                    <span className="text-md">{ingredient.name}</span>
                    <span className="text-sm">{ingredient.calories} CAL</span>
                </div>
            </div>
               
            <div className="flex flex-col justify-center items-center -mt-4 pt-3">
                { ingredient.quantity > 0 ? (
                    <div className="flex flex-row justify-center items-center gap-7">
                        <Button onClick={removeFromCustomOrder} variant="secondary" size="sm"  className="px-1 rounded-full hover:border-primary-foreground">
                            <Minus className="text-primary-foreground hover:text-primary-foreground" />
                        </Button>
                        <Button onClick={addToCustomOrder} variant="default" size="sm" className="hover:no-underline rounded-full text-white text-md font-bold">
                        {ingredient.quantity}
                    </Button>
                   </div>
                ) : (<></>)}
                { (!ingredient.quantity || ingredient.quantity <= 0 ) && customizable ? (
                    <Button onClick={addToCustomOrder} variant="default" size="sm" className="px-1 rounded-full text-white hover:border-primary-foreground text-md font-bold">
                        <Plus className="text-white hover:text-primary-foreground" />
                    </Button>
                    ) : (<></>)
                }
        </div>
               
        </div>
    );
};

export default IngredientCard;
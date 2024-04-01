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
        <div className="flex flex-col cursor-pointer py-5 rounded-xl hover:border hover:border-primary-foreground bg-muted hover:bg-background mb-3 md:mb-0 relative" aria-label={ingredient.name}>
            <div className="flex flex-col justify-center items-center h-[100px] w-[100px]  md:h-[120px] md:w-[130px]">   
                    <img className="w-[50px] md:w-[60px]" src={ingredient.image_url} aria-label={ingredient.name + ' image'} ></img>
                    <div className="mt-1 md:mt-3 flex flex-col text-center items-center">
                        <span className="text-sm md:text-md">{ingredient.name}</span>
                        <span className="text-xs md:text-sm">{ingredient.calories} CAL</span>
                    </div>
                    { ingredient.quantity > 0 ? (
                        <div className="w-full absolute bottom-0 right-0 left-0 flex  flex-auto flex-row justify-between items-center px-1 py-2 -mt-4">
                            <Button aria-label="Remove Ingredient from Menu Item" onClick={removeFromCustomOrder} variant="secondary" size="sm"  className="px-1 w-[28px] h-[28px] rounded-full hover:border-primary-foreground">
                                <Minus className="text-primary-foreground hover:text-primary-foreground" />
                            </Button>
                            <Button aria-label="Add Ingredient To Menu Item" onClick={addToCustomOrder} variant="default" size="sm" className="w-[28px] h-[28px] hover:no-underline rounded-full text-white text-md font-bold">
                                {ingredient.quantity}
                            </Button>
                        </div>
                    ) : (<></>)}
                    { (!ingredient.quantity || ingredient.quantity <= 0 ) && customizable ? (
                         <div className="w-full absolute bottom-0 right-0 left-0 flex  flex-auto flex-row justify-end items-center px-1 py-2 -mt-4">
                            <Button aria-label="Add Ingredient To Menu Item" onClick={addToCustomOrder} variant="default" size="sm" className="px-1 w-[28px] h-[28px] rounded-full text-white hover:border-primary-foreground text-md font-bold">
                                <Plus className="text-white hover:text-primary-foreground" />
                            </Button>
                        </div>
                        ) : (<></>)
                    }
            </div>
    
        </div>
    );
};

export default IngredientCard;
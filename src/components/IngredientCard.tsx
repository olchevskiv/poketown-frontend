import { Ingredient } from "@/types";
import IngredientActionButton from "./IngredientActionButton";

type Props = {
    ingredient: Ingredient;
    customizable?: boolean;
    count?: number;
}

const IngredientCard = ({ingredient, customizable=false, count=0}: Props) => {
    return (
        <div className="flex flex-col cursor-pointer py-5 rounded-xl hover:border hover:border-primary-foreground bg-muted hover:bg-background" aria-label={ingredient.name}>
            <div className="flex flex-col justify-center items-center  h-[140px] w-[130px] ">   
                <img className="w-[60px]" src={ingredient.image_url} aria-label={ingredient.name + ' image'} ></img>
                <div className="mt-3 flex flex-col text-center items-center">
                    <span className="text-md">{ingredient.name}</span>
                    <span className="text-sm">{ingredient.calories} CAL</span>
                </div>
            </div>
                {customizable && count > 0 ? (
                     <div className="flex flex-row justify-center items-center gap-7 -mt-4 pt-3">
                        <IngredientActionButton action="remove" />
                        <IngredientActionButton count={count} action="counter"/>
                    </div>
                ) : (
                    <></>
                )}
        </div>
    );
};

export default IngredientCard;
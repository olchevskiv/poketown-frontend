import { Pencil } from "lucide-react";
import IngredientCard from "./IngredientCard";
import IngredientMenu from "./IngredientMenu";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Ingredient } from "@/types";
import { useState } from "react";

type Props = {
    title: string;
    prefilledIngredients?: Ingredient[];
}

const CustomMenu = ({title, prefilledIngredients=[]}: Props) => {
    const [price, setPrice] = useState(9.50);
    const [calories, setCalories] = useState(0);
    const [ingredientCounts, setIngredientCounts] = useState({
        BASE: 0,
        MIXIN: 0,
        PROTEIN: 0,
        TOPPING: 0,
        SAUCE: 0
    });

    const INGREDIENT_MAXES = {
        BASE: 2,
        MIXIN: 5,
        PROTEIN: 3,
        TOPPING: 5,
        SAUCE: 3
    };
    const [customOrderIngredients, setCustomOrderIngredients] = useState<Ingredient[]>(() => {
        let currentIngredients: Ingredient[] = [];
        if (prefilledIngredients && prefilledIngredients.length > 0) {
            prefilledIngredients.map((prefilledIngredient) => {
                currentIngredients = [
                    ...currentIngredients,
                    {
                    _id: prefilledIngredient._id,
                    name: prefilledIngredient.name,
                    image_url: prefilledIngredient.image_url,
                    price: prefilledIngredient.price,
                    description: prefilledIngredient.description,
                    calories: prefilledIngredient.calories,
                    category: prefilledIngredient.category,
                    quantity: 1,
                    },
                ];
                if (prefilledIngredient.price > 0) {
                    setPrice((price) => {
                        return price + prefilledIngredient.price;
                    });
                }
                if (prefilledIngredient.calories > 0) {
                    setCalories((calories) => {
                        return calories + prefilledIngredient.calories;
                    });
                }
                
            });
        } 
        return currentIngredients;
    });

    const checkIngredientCounts = (category: keyof typeof ingredientCounts, add : boolean=true): boolean =>{
        let currentCount = customOrderIngredients.reduce(function(prev, current) {
            return current.category == category ? prev + +current.quantity : prev;
        }, 0);

        if (add) {
            if (currentCount >= INGREDIENT_MAXES[category]) {
                alert('You have selected the max amount of ' + category.toLowerCase() + 's (' + INGREDIENT_MAXES[category] + ')');
                return false;
            } else {
                setIngredientCounts((ingredientCounts)=>{
                    ingredientCounts[category] += 1;
                   return ingredientCounts;
                });
                return true;
            }
        } else {
            if ( currentCount == 0) {
                return false;
            } else {
                
                setIngredientCounts((ingredientCounts)=>{
                    ingredientCounts[category] -= 1;
                   return ingredientCounts;
                });
                return true;
            }
        }
      
    }

    const addToCustomOrder = (ingredient: Ingredient) => {
    setCustomOrderIngredients((prevCustomOrderIngredients) => {
        const existingIngredient = prevCustomOrderIngredients.find(
        (customIngredient) => customIngredient._id === ingredient._id
        );

        let updatedCustomOrderIngredients : Ingredient[];

        if (existingIngredient) {
        if (checkIngredientCounts(existingIngredient.category as keyof typeof ingredientCounts, true)) {
            updatedCustomOrderIngredients = prevCustomOrderIngredients.map((customIngredient) =>
            customIngredient._id === ingredient._id
                ? { ...customIngredient, quantity: customIngredient.quantity + 1 }
                : customIngredient
            );
            if (existingIngredient.price > 0) {
                setPrice((price) => {
                    return price + existingIngredient.price;
                });
            }
            if (existingIngredient.calories > 0) {
                setCalories((calories) => {
                    return calories + existingIngredient.calories;
                });
            }
        } else {
            updatedCustomOrderIngredients = prevCustomOrderIngredients;
        }
        
        } else {
        updatedCustomOrderIngredients = [
            ...prevCustomOrderIngredients,
            {
            _id: ingredient._id,
            name: ingredient.name,
            image_url: ingredient.image_url,
            price: ingredient.price,
            description: ingredient.description,
            calories: ingredient.calories,
            category: ingredient.category,
            quantity: 1,
            },
        ];
        if (ingredient.price > 0) {
            setPrice((price) => {
                return price + ingredient.price;
            });
        }
        if (ingredient.calories > 0) {
            setCalories((calories) => {
                return calories + ingredient.calories;
            });
        }
        
        }

        sessionStorage.setItem(
        `storedIngredients`,
        JSON.stringify(updatedCustomOrderIngredients)
        );

        return updatedCustomOrderIngredients;
    });
    };
    
    const removeFromCustomOrder = (ingredient: Ingredient) => {
    setCustomOrderIngredients((prevCustomOrderIngredients) => {

        let updatedCustomOrderIngredients : Ingredient[];
        if (checkIngredientCounts(ingredient.category as keyof typeof ingredientCounts, false)) {
            updatedCustomOrderIngredients = prevCustomOrderIngredients.map((customIngredient) =>
            customIngredient._id === ingredient._id
                ? { ...customIngredient, quantity: customIngredient.quantity - 1 }
                : customIngredient
            );

            updatedCustomOrderIngredients = updatedCustomOrderIngredients.filter(
            (customIngredient) => customIngredient.quantity > 0
            );

            if (ingredient.price > 0) {
                setPrice((price) => {
                    return price - ingredient.price;
                });
            }
            if (ingredient.calories > 0) {
                setCalories((calories) => {
                    return calories - ingredient.calories;
                });
            }

        } else {
            updatedCustomOrderIngredients = prevCustomOrderIngredients;
        }

        sessionStorage.setItem(
            `storedIngredients`,
            JSON.stringify(updatedCustomOrderIngredients)
        );

        return updatedCustomOrderIngredients;
    });
    };

    return (
    <div className="flex flex-row w-full">
        <div className="w-2/5 flex flex-col mr-10 justify-start pb-10">
            <div className="mb-6">
                <div className="flex flex-row justify-between items-center justify-center">
                    <h3 className="text-2xl tracking-wide">{title}</h3>
                    <div className="hover:text-primary"><Pencil /></div>
                </div>
                <div className="text-lg flex flex-row gap-2">
                    <span>${price}</span>
                    - 
                    <div><span>{calories}</span> CAL</div>
                </div>
            </div>

            <Separator className="bg-muted mb-3"/>
            
            {customOrderIngredients.length > 0 ? (
                <div id="ingredients" className="flex flex-row justify-start gap-4 flex-wrap max-h-[750px] overflow-y-scroll mb-6">
                    {customOrderIngredients.map((ing: Ingredient) => (
                        <IngredientCard key={ing._id} ingredient={ing} addToCustomOrder={() => addToCustomOrder(ing)} removeFromCustomOrder={() => removeFromCustomOrder(ing)}/>
                    ))}
                </div>
            ) : (
                <div className="text-lg tracking-wide pb-5">Add some ingredients to get started!</div>
            )}

            <Separator className="bg-muted mb-3"/>
            <div className="flex flex-row space-x-4">
                <Button variant="default" size="lg">Add To Order</Button>
            </div>
        </div>

        <div className="w-3/5 flex  items-start">
            <IngredientMenu inCustomOrderIngredients={customOrderIngredients} addToCustomOrder={addToCustomOrder} removeFromCustomOrder={removeFromCustomOrder} />
        </div>
    </div>
    );
}

export default CustomMenu;
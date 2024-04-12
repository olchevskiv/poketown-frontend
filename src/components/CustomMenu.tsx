import { ArrowLeft } from "lucide-react";
import IngredientCard from "./IngredientCard";
import IngredientMenu from "./IngredientMenu";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { CartItem, Ingredient } from "@/types";
import { useState } from "react";
import { toast } from "sonner";
import { useOrderDetailsSheetContext } from "@/contexts/OrderDetailsSheetContext";
import { useCartItemsContext } from "@/contexts/CartItemsContext";
import { Link, useNavigate } from "react-router-dom";
import QuantityInput from "./QuantityInput";

type Props = {
    title: string;
    menuItemID?: string;
    prefilledIngredients?: Ingredient[];
}

const CustomMenu = ({title,menuItemID='',prefilledIngredients=[]}: Props) => {
    const [ price, setPrice ] = useState(9.50);
    const [ calories, setCalories ] = useState(0);
    const [ quantity, setQuantity ] = useState(1);
    const INGREDIENT_MAXES = {
        BASE: 2,
        MIXIN: 5,
        PROTEIN: 3,
        TOPPING: 5,
        SAUCE: 3
    };

    const { setOpen } = useOrderDetailsSheetContext();
    const { setCartItems } = useCartItemsContext();
    const navigate = useNavigate();
    const [ customOrderIngredients, setCustomOrderIngredients ] = useState<Ingredient[]>(() => {
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

    const checkIngredientCounts = (category: keyof typeof INGREDIENT_MAXES): boolean =>{
        let currentCount = customOrderIngredients.reduce(function(prev, current) {
            return current.category == category ? prev + +current.quantity : prev;
        }, 0);

        if (currentCount > INGREDIENT_MAXES[category] - 1) {
            toast('You have selected the max amount of ' + category.toLowerCase() + 's (' + INGREDIENT_MAXES[category] + ')');
            return false;
        } else {
            return true;
        }
      
    }

    // adds ingredient to current "custom" menu item
    const addToCustomOrder = (ingredient: Ingredient) => {
        setCustomOrderIngredients((prevCustomOrderIngredients) => {
            const existingIngredient = prevCustomOrderIngredients.find(
            (customIngredient) => customIngredient._id === ingredient._id
            );

            let updatedCustomOrderIngredients : Ingredient[];

            if (checkIngredientCounts(ingredient.category as keyof typeof INGREDIENT_MAXES)) {
                if (existingIngredient) {
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

    // removes ingredient to current "custom" menu item
    const removeFromCustomOrder = (ingredient: Ingredient) => {
    setCustomOrderIngredients((prevCustomOrderIngredients) => {

        let updatedCustomOrderIngredients : Ingredient[];
        updatedCustomOrderIngredients = prevCustomOrderIngredients.map((customIngredient) =>
        customIngredient._id === ingredient._id
            ? { ...customIngredient, quantity: customIngredient.quantity - 1 }
            : customIngredient
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

        updatedCustomOrderIngredients = updatedCustomOrderIngredients.filter(
            (customIngredient) => customIngredient.quantity > 0
        );

        sessionStorage.setItem(
            `storedIngredients`,
            JSON.stringify(updatedCustomOrderIngredients)
        );

        return updatedCustomOrderIngredients;
    });
    };

    // adds current "custom" menu item to the cart/order
    const addToCart = () => {
        setCartItems((prevCartItems) => {
            let updatedCartItems : CartItem[];

            if (customOrderIngredients.length == 0) {
                updatedCartItems = prevCartItems;
                toast.error(`You must add some ingredients. Try the salmon!`, {position: 'top-right',});
                return updatedCartItems;
            }

            updatedCartItems = [
                ...prevCartItems,
                {
                    cartItemId: (Math.random() + 1).toString(36),
                    isCustom: true,
                    name: 'Custom Bowl',
                    price: price,
                    quantity: quantity,
                    image_url: '',
                    calories: calories,
                    ingredients: customOrderIngredients 
                },
            ];
        
            sessionStorage.setItem(
                `cartItems`,
                JSON.stringify(updatedCartItems)
            );
            
            setOpen(true);
            
            return updatedCartItems;
        });
    };

    const onCancel = () => {
        if (menuItemID) {
            navigate(`/menu/${menuItemID}`);
        } else {
            navigate('/menu');
        }
    }

    return (
        <div>
            <div className="flex flex-col lg:flex-row w-full">
                <div className="lg:w-2/5 flex flex-col lg:mr-10 justify-start pb-0 lg:pb-10 border-b border-muted lg:border-non">
                    <div className="mb-1 lg:mb-6">
                        <div className="flex flex-row justify-between items-center justify-center">
                            <h3 className="text-2xl tracking-wide">{title}</h3>
                            <Link to="/menu" className="hover:text-primary"><ArrowLeft /></Link>
                        </div>
                        <div className="text-lg flex flex-row gap-2">
                            <span>${price}</span>
                            - 
                            <div><span>{calories}</span> CAL</div>
                        </div>
                    </div>

                    <Separator className="bg-muted mb-3"/>
                    
                        {customOrderIngredients.length > 0 ? (

                            <div id="ingredients" className="flex flex-row flex-auto lg:flex-wrap grow-0 justify-stretch gap-4 overflow-x-scroll overflow-y-hidden lg:overflow-y-scroll lg:overflow-x-hidden mb-6">
                                {customOrderIngredients.map((ing: Ingredient) => (
                                    <IngredientCard key={ing._id} ingredient={ing} addToCustomOrder={() => addToCustomOrder(ing)} removeFromCustomOrder={() => removeFromCustomOrder(ing)}/>
                                ))}
                            </div>
                        ) : (
                            <div className="text-lg tracking-wide pb-5">Add some ingredients to get started!</div>
                        )}

                    

                    <div className="hidden lg:block">
                        <Separator className="bg-muted mb-3"/>
                        <div className="flex flex-row justify-between w-full mb-4">
                            <div>Quantity</div>
                            <QuantityInput quantity={quantity} setQuantity={setQuantity}/>
                        </div>
                        <Separator className="bg-muted mb-3"/>
                        <div className="flex flex-row space-x-4">
                            <Button onClick={onCancel} variant="secondary" size="lg">Cancel</Button>
                            <Button onClick={addToCart} variant="default" size="lg">Add To Order</Button>
                        </div>
                    </div>
                    
                </div>

                <div className="lg:w-3/5 flex  items-start">
                    <IngredientMenu inCustomOrderIngredients={customOrderIngredients} addToCustomOrder={addToCustomOrder} removeFromCustomOrder={removeFromCustomOrder} />
                </div>

                <div className="lg:hidden">
                    <div className="fixed bottom-0 bg-background p-4 left-0 right-0 ">
                        <div className="flex flex-row justify-between w-full mb-4">
                            <div>Quantity</div>
                            <QuantityInput quantity={quantity} setQuantity={setQuantity}/>
                        </div>
                        <Separator className="bg-muted mb-3"/>
                        <div className="flex justify-center items-center w-full space-x-5">
                            <Button onClick={onCancel} variant="secondary" size="lg">Cancel</Button>
                            <Button onClick={addToCart}  variant="default" size="lg">Add To Order</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomMenu;
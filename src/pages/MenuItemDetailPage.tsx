import { useGetMenuItem } from "@/api/MenuItemsAPI";
import IngredientCard from "@/components/IngredientCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartItemsContext } from "@/contexts/CartItemsContext";
import { useOrderDetailsSheetContext } from "@/contexts/OrderDetailsSheetContext";
import { CartItem, Ingredient, MenuItem } from "@/types";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const MenuItemDetailPage = () => {
    const { menuItemID } = useParams();
    const navigate = useNavigate(); 
    const { menuItem, isLoading } = useGetMenuItem(menuItemID);
    const {setOpen} = useOrderDetailsSheetContext();
    const {setCartItems} = useCartItemsContext();

    if (isLoading || !menuItem) {
        return <Loader2 className="mr-2 h-6 w-6 animate-spin h-[800px]"/>;
    }
    let ingredients: Ingredient[] = [];

    const hasIngredients = menuItem.category == 'BOWL';
    let calories = 0;

    if (hasIngredients){
        ingredients = menuItem.ingredients;
        if (!ingredients || ingredients.length <= 0) {
            return <Loader2 className="mr-2 h-6 w-6 animate-spin h-[800px]"/>;
        }

        // Calculate calorie value of the bowl from its ingredients property
        calories = ingredients.reduce(function(prev, current) {
            return prev + +current.calories
        }, 0);
    }

    const addToCart = (currentMenuItem: MenuItem) => {
        setCartItems((prevCartItems) => {
            const existingCartItem = prevCartItems.find(
                (cartItem) => cartItem._id === currentMenuItem._id
            );
        
            let updatedCartItems : CartItem[];
        
            if (existingCartItem) {
                updatedCartItems = prevCartItems.map((cartItem) =>
                cartItem._id === currentMenuItem._id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
                );
            } else {
                updatedCartItems = [
                ...prevCartItems,
                {
                    _id: currentMenuItem._id,
                    name: currentMenuItem.name,
                    price: currentMenuItem.price,
                    image_url: currentMenuItem.image_url,
                    quantity: 1,
                    calories: 0,
                    ingredients: currentMenuItem.ingredients 
                },
                ];
            }
        
            sessionStorage.setItem(
                `cartItems`,
                JSON.stringify(updatedCartItems)
            );
            
            setOpen(true);
     
            return updatedCartItems;
        });
    };

    return( 
        <div className="flex flex-row w-full">
            <div className="w-full lg:w-2/5 flex flex-col mr-0 lg:mr-10 justify-start pb-10">
                <div className="mb-6">
                    <div className="flex flex-row justify-between items-center justify-center">
                        <h3 className="text-2xl tracking-wide">{menuItem.name}</h3>
                    </div>
                    <div className="text-lg">
                        ${menuItem.price} - {calories} CAL
                    </div>
                </div>
            
                {hasIngredients ? (
                    <><Separator className="bg-muted mb-3"/>
                    <div id="ingredients" className="flex flex-row justify-start gap-4 flex-wrap max-h-[650px] overflow-y-scroll mb-6">
                        {ingredients.map((ing: Ingredient) => (
                            <IngredientCard key={ing._id} ingredient={ing} customizable={false}/>
                        ))}
                    </div></>
                ) : (
                    <div className="text-lg tracking-wide pb-5">{menuItem.description}</div>
                )}
                <Separator className="bg-muted mb-3"/>
                <div className="flex flex-row space-x-4">
                    {hasIngredients ? (
                        <Button onClick={() => navigate(`/menu/${menuItem._id}/custom`)} variant="secondary" size="lg">Customize</Button>
                    ) : (<></>)}
                    {
                        <Button variant="default" size="lg" onClick={() => addToCart(menuItem)}>Add To Order</Button>
                    }
                
                </div>
            </div>

            <div className="w-full hidden lg:flex lg:w-3/5 flex justify-end items-center">
                <img className="p-10  w-9/12" src={menuItem.image_url}></img>
            </div>
        </div>
    );
}

export default MenuItemDetailPage;
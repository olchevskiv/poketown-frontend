import { useGetMenuItem } from "@/api/MenuItemsAPI";
import IngredientCard from "@/components/IngredientCard";
import Loader from "@/components/Loader";
import QuantityInput from "@/components/QuantityInput";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartItemsContext } from "@/contexts/CartItemsContext";
import { useOrderDetailsSheetContext } from "@/contexts/OrderDetailsSheetContext";
import { CartItem, Ingredient, MenuItem } from "@/types";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const MenuItemDetailPage = () => {
    const { menuItemID } = useParams();
    const navigate = useNavigate(); 
    const { menuItem, isLoading } = useGetMenuItem(menuItemID);
    const {setOpen} = useOrderDetailsSheetContext();
    const {setCartItems} = useCartItemsContext();
    const [ quantity, setQuantity ] = useState(1);

    if (isLoading || !menuItem) {
        return <Loader />;
    }
    let ingredients: Ingredient[] = [];

    const hasIngredients = menuItem.category == 'BOWL';
    let calories = menuItem.baseCalories;

    if (hasIngredients){
        ingredients = menuItem.ingredients;
        if (!ingredients || ingredients.length <= 0) {
            return <Loader />;
        }

        // Calculate calorie value of the bowl from its ingredients property
        calories = ingredients.reduce(function(prev, current) {
            return prev + +current.calories
        }, 0);
    }

    const addToCart = (currentMenuItem: MenuItem) => {
        setCartItems((prevCartItems) => {
            const existingCartItem = prevCartItems.find(
                (cartItem) => cartItem.menuItemId === currentMenuItem._id
            );
        
            let updatedCartItems : CartItem[];
        
            if (existingCartItem) {
                updatedCartItems = prevCartItems.map((cartItem) =>
                cartItem.menuItemId === currentMenuItem._id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
                );
            } else {
                updatedCartItems = [
                ...prevCartItems,
                {
                    cartItemId: currentMenuItem._id,
                    menuItemId: currentMenuItem._id,
                    isCustom: false,
                    name: currentMenuItem.name,
                    price: currentMenuItem.price,
                    image_url: currentMenuItem.image_url,
                    quantity: quantity,
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
        <div className="flex flex-col lg:flex-row w-full">
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
               

                <div className="hidden md:block">
                    <Separator className="bg-muted mb-3"/>
                    <div className="flex flex-row justify-between w-full mb-4">
                        <div className="text-md font-normal">Quantity</div>
                        <QuantityInput quantity={quantity} setQuantity={setQuantity}/>
                    </div>

                    <Separator className="bg-muted mb-3"/>
                    <div className="flex flex-row space-x-4">
                        {hasIngredients ? (
                            <Button onClick={() => navigate(`/menu/${menuItem._id}/custom`)} variant="secondary" size="lg">Customize</Button>
                        ) : (<></>)}
                        <Button variant="default" size="lg" onClick={() => addToCart(menuItem)}>Add To Order</Button>
                    
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-3/4 pt-10 lg:pt-0 order-first lg:order-last flex justify-center items-start relative lg:mt-5">
                <img src={menuItem.image_url} className="max-w-[450px]"/>
                <Link to="/menu" className="hover:text-primary absolute top-0 right-0" aria-label="Back to Menu"><ArrowLeft /></Link>
            </div>
        
            <div className="md:hidden">
                <div className="fixed bottom-0 bg-background p-4 left-0 right-0 ">
                    <div className="flex flex-row justify-between w-full mb-4">
                        <div>Quantity</div>
                        <QuantityInput quantity={quantity} setQuantity={setQuantity}/>
                    </div>
                    <Separator className="bg-muted mb-3"/>
                    <div className="flex justify-center items-center w-full space-x-5">
                        {hasIngredients ? (
                            <Button  onClick={() => navigate(`/menu/${menuItem._id}/custom`)} variant="secondary" size="lg">Customize</Button>
                        ) : (<></>)}
                        <Button aria-label="Add Menu Item to Order" variant="default" size="lg" onClick={() => addToCart(menuItem)}>Add To Order</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuItemDetailPage;
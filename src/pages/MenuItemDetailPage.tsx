import { useGetMenuItem } from "@/api/MenuItemsAPI";
import IngredientCard from "@/components/IngredientCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Ingredient } from "@/types";
import { Loader2, Pencil } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const MenuItemDetailPage = () => {
    const { menuItemID } = useParams();
    const navigate = useNavigate(); 
    const { menuItem, isLoading } = useGetMenuItem(menuItemID);

    if (isLoading || !menuItem) {
        return <Loader2 className="mr-2 h-6 w-6 animate-spin h-[800px]"/>;
    }
    let ingredients: Ingredient[] = [];

    const hasIngredients = menuItem.category == 'BOWL';

    if (hasIngredients){
        ingredients = menuItem.ingredients;
        if (!ingredients || ingredients.length <= 0) {
            return <Loader2 className="mr-2 h-6 w-6 animate-spin h-[800px]"/>;
        }
    }

    return( 
        <div className="flex flex-row w-full">
            <div className="w-2/5 flex flex-col mr-10 justify-start pb-10">
                <div className="mb-6">
                    <div className="flex flex-row justify-between items-center justify-center">
                        <h3 className="text-2xl tracking-wide">{menuItem.name}</h3>
                    </div>
                    <div className="text-lg">
                        ${menuItem.price}
                    </div>
                </div>
               
                {hasIngredients ? (
                    <><Separator className="bg-muted mb-3"/>
                    <div id="ingredients" className="flex flex-row justify-start gap-4 flex-wrap max-h-[650px] overflow-y-scroll mb-6">
                        {ingredients.map((ing: Ingredient) => (
                            <IngredientCard key={ing._id} ingredient={ing} />
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
                    <Button variant="default" size="lg">Add To Order</Button>
                </div>
            </div>

            <div className="w-3/5 flex justify-end items-center">
                <img className="p-10  w-9/12" src={menuItem.image_url}></img>
            </div>
        </div>
    );
}

export default MenuItemDetailPage;
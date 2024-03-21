import { useGetMenuItem } from "@/api/MenuItemsAPI";
import IngredientCard from "@/components/IngredientCard";
import IngredientMenu from "@/components/IngredientMenu";
import { Button } from "@/components/ui/button";
import { Ingredient, MenuItem } from "@/types";
import { Separator } from "@radix-ui/react-separator";
import { Loader2, Pencil } from "lucide-react";
import { useParams } from "react-router-dom";

type Props = {
  hasPrefilledIngredients: boolean
}

const CustomMenuItemPage = ({hasPrefilledIngredients}: Props) => {
  let prefilledIngredients: Ingredient[] = [];
  let basePrice = 8.5;


  if (hasPrefilledIngredients) {
    const { menuItemID } = useParams();
    let { menuItem, isLoading } = useGetMenuItem(menuItemID);

    if (isLoading || !menuItem) {
        return <Loader2 className="mr-2 h-6 w-6 animate-spin h-[800px]"/>;
    }
    basePrice = menuItem.price;

    prefilledIngredients = menuItem.ingredients;
    if (!prefilledIngredients || prefilledIngredients.length <= 0) {
        return <Loader2 className="mr-2 h-6 w-6 animate-spin h-[800px]"/>;
    }
  }

  return (
    <div className="flex flex-row w-full">
      <div className="w-2/5 flex flex-col mr-10 justify-start pb-10">
          <div className="mb-6">
              <div className="flex flex-row justify-between items-center justify-center">
                  <h3 className="text-2xl tracking-wide">Create Your Own</h3>
                  <div className="hover:text-primary"><Pencil /></div>
              </div>
              <div className="text-lg flex flex-row gap-2">
                <span className="">${basePrice}</span>
                - 
                <div><span>O</span> CAL</div>
              </div>
          </div>
        
          {hasPrefilledIngredients ? (
              <><Separator className="bg-muted mb-3"/>
              <div id="ingredients" className="flex flex-row justify-start gap-4 flex-wrap max-h-[650px] overflow-y-scroll mb-6">
                  {prefilledIngredients.map((ing: Ingredient) => (
                      <IngredientCard key={ing._id} ingredient={ing} />
                  ))}
              </div></>
          ) : (
              <div className="text-lg tracking-wide pb-5">Add some ingredients to get started!</div>
          )}
          <Separator className="bg-muted mb-3"/>
          <Separator className="bg-muted mb-3"/>
          <div className="flex flex-row space-x-4">
            <Button variant="default" size="lg">Add To Order</Button>
          </div>
      </div>

      <div className="w-3/5 flex  items-start">
         <IngredientMenu prefilledIngredients={prefilledIngredients}/>
      </div>
  </div>
  );
}

export default CustomMenuItemPage;
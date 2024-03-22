import { useGetMenuItem } from "@/api/MenuItemsAPI";
import CustomMenu from "@/components/CustomMenu";
import { Ingredient } from "@/types";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";

const CustomizeMenuItemPage = () => {
    const { menuItemID } = useParams();

    let { menuItem, isLoading } = useGetMenuItem(menuItemID);

    if (isLoading || !menuItem) {
        return <Loader2 className="mr-2 h-6 w-6 animate-spin h-[800px]"/>;
    }
    let prefilledIngredients: Ingredient[] = menuItem.ingredients;
    if (!prefilledIngredients || prefilledIngredients.length <= 0) {
        return <Loader2 className="mr-2 h-6 w-6 animate-spin h-[800px]"/>;
    }

  return (
    <CustomMenu title={menuItem.name} prefilledIngredients={prefilledIngredients} />
  );
}

export default CustomizeMenuItemPage;
import { useGetMenuItem } from "@/api/MenuItemsAPI";
import CustomMenu from "@/components/CustomMenu";
import Loader from "@/components/Loader";
import { Ingredient } from "@/types";
import { useParams } from "react-router-dom";

const CustomizeMenuItemPage = () => {
    const { menuItemID } = useParams();

    let { menuItem, isLoading } = useGetMenuItem(menuItemID);

    if (isLoading || !menuItem) {
        return <Loader />;
    }
    let prefilledIngredients: Ingredient[] = menuItem.ingredients;
    if (!prefilledIngredients || prefilledIngredients.length <= 0) {
        return <Loader />;
    }

  return (
    <CustomMenu title={menuItem.name} menuItemID={menuItemID} prefilledIngredients={prefilledIngredients} />
  );
}

export default CustomizeMenuItemPage;
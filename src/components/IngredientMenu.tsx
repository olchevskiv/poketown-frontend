import { useGetIngredients } from "@/api/IngredientsAPI";
import { Loader2 } from "lucide-react";
import IngredientCard from "./IngredientCard";
import { Ingredient } from "@/types";

type Props = {
    prefilledIngredients?: Ingredient[]
}

const IngredientMenu = ({prefilledIngredients=[]}: Props) => {
    const { ingredients, isLoading } = useGetIngredients();
    if (isLoading) {
        return <Loader2 className="mr-2 h-6 w-6 animate-spin h-[800px]"/>;
    }

    if (!ingredients || ingredients.length <= 0 || !Array.isArray(ingredients)) {
        return <Loader2 className="mr-2 h-6 w-6 animate-spin h-[800px]"/>;
    }

    const ingredientsMap = new Map();

    ingredients.forEach((ing) => {
    const category = ing.category;
    ingredientsMap.set(
        category,
        (ingredientsMap.get(category) || []).concat(ing)
    );
    });

    const ingredientsByCategory = [
        {
            id: 'bases',
            title: 'Bases',
            ingredients: ingredientsMap.get('BASE'),
        },
        {
            id: 'mixins',
            title: 'Mix Ins',
            ingredients: ingredientsMap.get('MIXIN'),
        },
        {
            id: 'toppings',
            title: 'Toppings',
            ingredients: ingredientsMap.get('TOPPING'),
        },
        {
            id: 'proteins',
            title: 'Proteins',
            ingredients: ingredientsMap.get('PROTEIN'),
        },
        {
            id: 'sauces',
            title: 'Sauces',
            ingredients: ingredientsMap.get('SAUCE'),
        }
    ];

  return (
    <div className="flex flex-col max-h-[650px] overflow-y-scroll justify-start">
        {ingredientsByCategory.map((category: any) => (
            <div key={category.id}>
                <div className="text-2xl tracking-wide mb-3">{category.title}</div>
                <div >
                    <div id={category.id} className="flex flex-row justify-start gap-4 flex-wrap max-h-[650px]  mb-6">
                        {category.ingredients.map((ing: Ingredient) => (
                            <IngredientCard key={ing._id} ingredient={ing} customizable={true} count={ prefilledIngredients.find(i => i.name === ing.name) ? 1 : 0} />
                        ))}
                    </div>
                </div>
            </div>
        ))}
    </div>
  );

}

export default IngredientMenu;
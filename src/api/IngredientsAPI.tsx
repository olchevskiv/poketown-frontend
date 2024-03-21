import { Ingredient } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetIngredients = () => {
  const getIngredients = async (): Promise<Ingredient[]> => {
    const response = await fetch(
      `${API_BASE_URL}/api/ingredient`
    );

    if (!response.ok) {
      throw new Error("Failed to get ingredients");
    }

    return response.json();
  };

  const { data: ingredients, isLoading } = useQuery("fetchIngredient",
    getIngredients,
    {
      refetchInterval: 5000,
    }
  );

  return { ingredients, isLoading };
};
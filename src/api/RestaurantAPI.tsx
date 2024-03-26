import { Restaurant, RestaurantSearchResponse, SearchState } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = (restaurantID?: string) => {
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/${restaurantID}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchRestaurant",
    getRestaurantByIdRequest,
    {
      enabled: !!restaurantID,
    }
  );

  return { restaurant, isLoading };
};

export const useGetRestaurants = () => {
  const getRestaurants = async (): Promise<Restaurant[]> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurants");
    }

    return response.json();
  };

  const { data: restaurants, isLoading } = useQuery("fetchRestaurant",
  getRestaurants,
    {
      refetchInterval: 5000,
    }
  );

  return { restaurants, isLoading };
};

export const useSearchRestaurants = (searchState: SearchState,) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
  
    const params = new URLSearchParams();

    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to search restaurants");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchRestaurants", searchState],
    createSearchRequest
  );

  return { results, isLoading, };
};
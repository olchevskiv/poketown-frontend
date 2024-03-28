import { Restaurant } from "@/types";
import React, { createContext, useState } from "react";

/* 
  RestaurantContext allows for access/modification of the restaurant the user is ordering from in local storage
  across all componenets

*/
interface RestaurantContextValue {
    restaurant: Restaurant;
    setRestaurant: React.Dispatch<React.SetStateAction<Restaurant>>;
}

const RestaurantContext = createContext<RestaurantContextValue | undefined>(undefined);

type Props = {
    children: React.ReactNode;
}

const RestaurantProvider = ({ children }: Props) => {
    const [restaurant, setRestaurant] = useState<Restaurant>(() => {
        const restaurant = sessionStorage.getItem(`orderFromRestaurant`);
        return restaurant ? JSON.parse(restaurant) : [];
    });

    return (
      <RestaurantContext.Provider value={{restaurant, setRestaurant}}>
        {children}
      </RestaurantContext.Provider>
    );
};

const useRestaurantContext = () => {
    const context = React.useContext(RestaurantContext);
    if (context === undefined) {
      throw new Error('useRestaurantContext must be inside a RestaurantProvider');
    }
    return context;
};

export { 
    RestaurantProvider, useRestaurantContext 
}

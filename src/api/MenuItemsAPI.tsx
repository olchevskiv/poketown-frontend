import { MenuItem } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMenuItems = () => {
  const getMenuItems = async (): Promise<MenuItem[]> => {
    const response = await fetch(
      `${API_BASE_URL}/api/menu-item`
    );

    if (!response.ok) {
      throw new Error("Failed to get menu items");
    }

    return response.json();
  };

  const { data: menuItems, isLoading } = useQuery("fetchMenuItem",
    getMenuItems,
    {
      refetchInterval: 5000,
    }
  );

  return { menuItems, isLoading };
};

export const useGetMenuItem = (menuItemID?: string) => {
  const getMenuItemByIdRequest = async (): Promise<MenuItem> => {
    const response = await fetch(
      `${API_BASE_URL}/api/menu-item/${menuItemID}`
    );

    if (!response.ok) {
      throw new Error("Failed to get menu item");
    }

    return response.json();
  };

  const { data: menuItem, isLoading } = useQuery("fetchMenuItem",
    getMenuItemByIdRequest,
    {
      enabled: !!menuItemID,
    }
  );

  return { menuItem, isLoading };
};
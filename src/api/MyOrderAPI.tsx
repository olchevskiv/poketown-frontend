/* API Requests to backend for current User related functions */
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import { toast } from "sonner";
import { Order } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetOrder = (orderID?: string) => {

    const { getAccessTokenSilently } = useAuth0();

    const getOrder = async (): Promise<Order> => {

        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/order/${orderID}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });


        if(!response.ok){
            throw new Error("Failed to get order");
        }

        return response.json();
    };

    const { data: order, isLoading, error } = useQuery(
        "fetchMyOrder",
        getOrder,
        {
            enabled: !!orderID,
        }
    );

    if(error){
        toast.error(error.toString());
    }

    return { order, isLoading };

};

export const useGetOrders = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getOrders = async (): Promise<Order[]> => {

      const accessToken = await getAccessTokenSilently();

      const response = await fetch( `${API_BASE_URL}/api/my/order`, {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`
          }
      });
  
      if (!response.ok) {
        throw new Error("Failed to get orders");
      }
  
      return response.json();
    };
  
    const { data: orders, isLoading } = useQuery(
        "fetchMyOrders",
        getOrders,
        {
            refetchInterval: 5000,
        }
    );
  
    return { orders, isLoading };
};

// returns all orders with any  of the following statuses:  "placed", "paid", "inProgress"
export const useGetActiveOrders = () => {
    const { getAccessTokenSilently } = useAuth0();
    
    const getActiveOrders = async (): Promise<Order[]> => {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(`${API_BASE_URL}/api/my/order/active`, {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`
          }
      });
  
      if (!response.ok) {
        throw new Error("Failed to get in progress orders");
      }
  
      return response.json();
    };
  
    const { data: activeOrders, isLoading } = useQuery(
        "fetchMyActiveOrders",
        getActiveOrders,
        {
            refetchInterval: 5000,
        }
    );
  
    return { activeOrders, isLoading };
};
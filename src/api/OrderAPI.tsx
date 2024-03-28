/* API Requests to backend for order and checkout functions */

import { CartItem } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CheckoutSessionRequest = {
    cartItems: CartItem[],
    restaurantId: string,
}

export const useCreateCheckoutSession = () => {
    const { getAccessTokenSilently } = useAuth0();
    
    const useCreateCheckoutSessionRequest = async (checkoutSessionRequest: CheckoutSessionRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/order/checkout/create`,  {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(checkoutSessionRequest)
        });

        if(!response.ok){
            throw new Error("Failed to create checkout session");
        }

        return response.json();
    }

    const { mutateAsync: createCheckoutSession, isLoading, error, reset} = useMutation(useCreateCheckoutSessionRequest);

    if (error) {
        toast.error(error.toString());
        reset();
    }

    return {
        createCheckoutSession,
        isLoading,
        error
    }
}
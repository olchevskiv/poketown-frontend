/* API Requests to backend for current User related functions */
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { User } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
    auth0Id: string;
    email: string;
};

export const useCreate = () => {

    const { getAccessTokenSilently } = useAuth0();
    
    const createRequest = async (user: CreateUserRequest) => {

        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(user)
        });


        if(!response.ok){
            throw new Error("Failed to create user");
        }
    };

    // pass createRequest to React query hook to handle request
    const { mutateAsync: createUser, isLoading, isError, isSuccess } = useMutation(createRequest);

    return { createUser, isLoading, isError, isSuccess };
};

type UpdateRequest = {
    name: string;
    addressLine: string;
    city: string;
    zipCode: string;
    country: string;
};

export const useUpdate = () => {

    const { getAccessTokenSilently } = useAuth0();

    const updateRequest = async (formData: UpdateRequest) => {

        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(formData)
        });


        if(!response.ok){
            throw new Error("Failed to update user");
        }
    };

    // pass updateRequest to React query hook to handle request
    const { mutateAsync: updateUser, isLoading, isSuccess, error, reset } = useMutation(updateRequest);

    // alert user request result
    if(isSuccess){
        toast.success("User profile updated!");
    }

    if(error){
        toast.error(error.toString());
        reset();
    }

    return { updateUser, isLoading, isSuccess };

};

export const useGet = () => {

    const { getAccessTokenSilently } = useAuth0();

    const getRequest = async (): Promise<User> => {

        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });


        if(!response.ok){
            throw new Error("Failed to get user");
        }

        return response.json();
    };

    // pass updateRequest to React query hook to handle request
    const { data: myUser, isLoading, error } = useQuery("fetchMyUser",getRequest);

    if(error){
        toast.error(error.toString());
    }

    return { myUser, isLoading };

};
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UserMenu from "./UserMenu";
import { useLocation } from "react-router-dom";
import ShoppingBagIcon from "./ShoppingBagIcon";
import RestaurantIcon from "./RestaurantIcon";

const UserNav = () => {
    const {loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    const { pathname } = useLocation();

    const onLogin = async () => {
        await loginWithRedirect({
          appState: {
            returnTo: pathname,
          },
        });
    };

    if (isLoading) {
        return <div></div>;
    }

    return (
        <div className="flex flex-col flex-end items-end w-[350px]">
            <div  className="flex flex-row items-center space-x-2">
                <RestaurantIcon />
                <ShoppingBagIcon />
                {isAuthenticated ? (
                    <UserMenu/>
                ) : (
                    <Button variant="secondary"  onClick={onLogin}>Log In</Button>
                )}  
            </div>
        </div>
    );
}

export default UserNav;
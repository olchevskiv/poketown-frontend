import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UserMenu from "./UserMenu";

const UserNav = () => {
    const {loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        <div className="flex flex-col flex-end items-end space-x-2 w-[286px]">
            {isAuthenticated ? (
            <UserMenu/> 
            ) : (
            <Button variant="secondary"  onClick={async () => await loginWithRedirect()}>Log In</Button>
            )}
    
        </div>
    );
}

export default UserNav;
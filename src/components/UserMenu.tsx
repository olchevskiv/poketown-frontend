import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const UserMenu = () => {
    const { logout } = useAuth0();

    return (
        <DropdownMenu >
            <DropdownMenuTrigger className="flex items-center px-3 hover:text-primary uppercase text-lg">
                MY ACCOUNT
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem><Link to="/profile" className="hover:text-primary">Profile</Link></DropdownMenuItem>
                <DropdownMenuItem><Link to="/orders" className="hover:text-primary">My Orders</Link></DropdownMenuItem>
                <Separator className="bg-muted"/>
                <DropdownMenuItem><Button variant="default" className="flex flex-1" onClick={()=> logout()}>Logout</Button></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserMenu;
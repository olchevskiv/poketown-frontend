import { CircleUserRound } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const UserMenu = () => {
    const { user, logout } = useAuth0();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center px-3 hover:text-primary">
                <CircleUserRound className="hover:text-primary mr-2" />
                {user?.name}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem><Link to="/profile" className="">My Profile</Link></DropdownMenuItem>
                <Separator />
                <DropdownMenuItem><Button variant="default" className="flex flex-1" onClick={()=> logout()}>Logout</Button></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserMenu;
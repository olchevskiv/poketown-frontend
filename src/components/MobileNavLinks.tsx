import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { Separator } from "./ui/separator";

const MobileNavLinks = () => {
const { logout } = useAuth0();
  return (
    <div className="flex flex-col space-y-2 w-full">
        <Link to="/profile" className="flex items-center text-primary-foreground font-bold hover:text-primary font-normal hover:underline tracking-wide text-xl">Profile</Link>
        <Link to="/orders" className="flex items-center text-primary-foreground font-bold hover:text-primary font-normal hover:underline tracking-wide text-xl">My Orders</Link>
        <Link to="/menu" className="flex items-center text-primary-foreground font-bold hover:text-primary font-normal hover:underline tracking-wide text-xl">Menu</Link>
        <Link to="/about-us" className="flex items-center text-primary-foreground font-bold hover:text-primary font-normal hover:underline tracking-wide text-xl">About Us</Link>
        <Link to="/locations" className="flex items-center text-primary-foreground font-bold hover:text-primary font-normal hover:underline tracking-wide text-xl">Locations</Link>
        <Separator className="border border-gray-200 mt-3 mb-2" />
        <Button className="w-full text-xl mt-3" variant="secondary" onClick={()=> logout()}>Log Out</Button>
    </div>
  );
}

export default MobileNavLinks;
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const MobileNavLinks = () => {
const { logout } = useAuth0();
  return (
    <div className="flex flex-col space-y-2 w-full">
        <Link to="/profile" className="flex items-center text-primary-foreground font-bold hover:text-primary font-normal trackingw-wide text-lg">Profile</Link>
        <Link to="/orders" className="flex items-center text-primary-foreground font-bold hover:text-primary font-normal trackingw-wide text-lg">Order History</Link>
        <Link to="/menu" className="flex items-center text-primary-foreground font-bold hover:text-primary font-normal trackingw-wide text-lg">Menu</Link>
        <Link to="/about-us" className="flex items-center text-primary-foreground font-bold hover:text-primary font-normal trackingw-wide text-lg">About Us</Link>
        <Link to="/locations" className="flex items-center text-primary-foreground font-bold hover:text-primary font-normal trackingw-wide text-lg">Locations</Link>
        <Button className="" variant="secondary" onClick={()=> logout()}>Log Out</Button>
    </div>
  );
}

export default MobileNavLinks;
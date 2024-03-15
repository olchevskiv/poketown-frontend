import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const MobileNavLinks = () => {
const { logout } = useAuth0();
  return (
    <div className="flex flex-col space-y-2 w-full">
        <Link to="/profile" className="flex items-center text-primary-foreground font-bold hover:text-primary">Profile</Link>
        <Button className="" variant="default" onClick={()=> logout()}>Log Out</Button>
    </div>
  );
}

export default MobileNavLinks;
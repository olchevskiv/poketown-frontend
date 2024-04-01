import { CircleUserRound, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLinks";
import { Link, useLocation } from "react-router-dom";
import ShoppingBagIcon from "./ShoppingBagIcon";

const MobileNav = () => {
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();
    const { pathname } = useLocation();

    const onLogin = async () => {
        await loginWithRedirect({
          appState: {
            returnTo: pathname,
          },
        });
    };

    return(
        <div  className="flex flex-row items-center space-x-6">
            <ShoppingBagIcon />
            <Sheet>
                <SheetTrigger>
                    <Menu className="text-orange-500"/>
                </SheetTrigger>
                <SheetContent className="space-y-3">
                    <SheetTitle>
                        {isAuthenticated ? (
                            <div className="flex items-center font-normal tracking-wide gap-1">
                                <CircleUserRound className="hover:text-primary mr-2" />
                                {user?.name}
                            </div>
                        ) : (
                            <span>Welcome to poketown.com!</span>
                        )}

                    </SheetTitle>
                    <Separator className="border border-gray-200" />
                    <SheetDescription className="flex">
                        {isAuthenticated ? (
                            <MobileNavLinks />
                        ) : (
                            <div className="w-full">
                                <Link to="/menu" className="flex items-center text-primary-foreground font-bold hover:text-primary hover:underline font-normal tracking-wide text-xl mb-1">Menu</Link>
                                <Link to="/about-us" className="flex items-center text-primary-foreground font-bold hover:text-primary hover:underline font-normal tracking-wide text-xl mb-1">About Us</Link>
                                <Link to="/locations" className="flex items-center text-primary-foreground font-bold hover:text-primary hover:underline font-normal tracking-wide text-xl  mb-1">Locations</Link>
                                <Separator className="border border-gray-200 mt-3 mb-2" />
                                <Button onClick={onLogin} variant="secondary" className="w-full text-xl mt-2">Log In</Button>
                            </div>
                        
                        )}
                    </SheetDescription>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default MobileNav;
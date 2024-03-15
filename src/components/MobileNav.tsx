import { CircleUserRound, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLinks";

const MobileNav = () => {
    const {loginWithRedirect, isAuthenticated, user } = useAuth0();
    return(
        <Sheet>
            <SheetTrigger>
                <Menu className="text-orange-500"/>
            </SheetTrigger>
            <SheetContent className="space-y-3">
                <SheetTitle>
                    {isAuthenticated ? (
                        <div className="flex items-center gap-2">
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
                        <Button variant="secondary" className="flex-1">Log In</Button>
                    )}
                </SheetDescription>
            </SheetContent>
        </Sheet>
    );
}

export default MobileNav;
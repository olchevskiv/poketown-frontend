import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import UserNav from "./UserNav";

const Header = () => {

    return (
    <div className="py-6">
        <div className="container mx-auto flex justify-between  items-center">
            <div className="hidden lg:block">
                <MainNav />
            </div>

            <Link to="/" className="text-3xl font-bold tracking-wide text-primary-foreground hover:text-primary">
                {import.meta.env.VITE_APP_NAME}
            </Link>

            <div className="lg:hidden">
                <MobileNav/>
            </div>

            <div className="hidden lg:block">
                <UserNav />
            </div>
        </div>
    </div>
    );
}

export default Header;
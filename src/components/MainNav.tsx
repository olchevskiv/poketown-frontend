import { Link } from "react-router-dom";

const MainNav = () => {
    return (
        <div className="flex flex-row space-x-5">
            <Link to="/menu" className="text-lg tracking-wider uppercase text-primary-foreground hover:underline hover:underline-offset-2 hover:text-primary">
                Menu
            </Link>

            <Link to="/about-us" className="text-lg tracking-wider uppercase text-primary-foreground hover:underline hover:underline-offset-2 hover:text-primary">
                About Us
            </Link>

            <Link to="/locations" className="text-lg tracking-wider uppercase text-primary-foreground hover:underline hover:underline-offset-2 hover:text-primary">
                Locations
            </Link>
        </div>
    );
}

export default MainNav;
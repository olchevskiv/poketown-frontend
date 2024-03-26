import { NavLink } from "react-router-dom";

const MainNav = () => {
    return (
        <div className="flex flex-row space-x-5">
            <NavLink to="/menu"  className="text-lg tracking-wider active:underline uppercase text-primary-foreground hover:underline hover:underline-offset-2 hover:text-primary">
                Menu
            </NavLink>

            <NavLink to="/about-us" className="text-lg tracking-wider uppercase text-primary-foreground hover:underline hover:underline-offset-2 hover:text-primary">
                About Us
            </NavLink>

            <NavLink to="/locations" className="text-lg tracking-wider uppercase text-primary-foreground hover:underline hover:underline-offset-2 hover:text-primary">
                Locations
            </NavLink>
        </div>
    );
}

export default MainNav;
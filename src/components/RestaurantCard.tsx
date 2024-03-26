import { Restaurant } from "@/types";
import { Link } from "react-router-dom";

type Props = {
    restaurant: Restaurant;
}

const RestaurantCard = ({restaurant}: Props) => {
    return (
        <Link to={`menu`} className="w-full">
            <div className="flex flex-row space-x-5 py-5 justify-start items-center rounded-xl hover:border hover:border-primary-foreground bg-muted hover:bg-background px-10" >
                <div className="w-2/12">
                    <img className="w-full" src={restaurant.image_url}></img>
                </div>
                <div className="flex flex-col">
                    <div className="text-2xl mb-2 uppercase tracking-wide">{restaurant.address}</div>
                    <div className="text-lg">{restaurant.city}, {restaurant.state} {restaurant.zipCode}</div>
                    <div>
                        {restaurant.daysOpen[0]} - {restaurant.daysOpen[restaurant.daysOpen.length - 1]} {restaurant.hourOpenStart}-{restaurant.hourOpenEnd > 12 ? restaurant.hourOpenEnd - 12 : restaurant.hourOpenEnd}
                    </div>
                </div>
            </div>
        </Link>
       
    );
};

export default RestaurantCard;
import { Restaurant } from "@/types";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useRestaurantContext } from "@/contexts/RestaurantContext";
import { toast } from "sonner";

type Props = {
    restaurant: Restaurant;
}

const RestaurantCard = ({restaurant}: Props) => {
    const { setRestaurant } = useRestaurantContext();
    const navigate = useNavigate();
    const updateRestaurantOrderFrom = () => {
        setRestaurant( () => {
            const updatedRestaurant = restaurant;
            sessionStorage.setItem(
                `orderFromRestaurant`,
                JSON.stringify(updatedRestaurant)
            );

            return updatedRestaurant;
        });
      
        toast.success(`Ordering from ${restaurant.address}, ${restaurant.city}`)
    };

    return (
        <div className="flex flex-col md:flex-row py-5 justify-between items-center rounded-xl border border-primary-foreground bg-background pl-5 md:px-10" >
            <div className="flex flex-row space-x-5 justify-start items-center md:px-10">
                <div className="w-2/12">
                    <img className="w-full" src={restaurant.image_url}></img>
                </div>
                <div className="flex flex-col space-y-1">
                    <div className="text-3xl mb-2 uppercase tracking-wide font-normal"> {restaurant.city}, {restaurant.state}</div>
                    <div className="text-xl font-normal">{restaurant.address}</div>
                    <div className="text-xl font-normal">{restaurant.city}, {restaurant.state} {restaurant.zipCode}</div>
                    <div className="text-lg">
                        {restaurant.daysOpen[0]} - {restaurant.daysOpen[restaurant.daysOpen.length - 1]} {restaurant.hourOpenStart}am -{restaurant.hourOpenEnd > 12 ? restaurant.hourOpenEnd - 12 : restaurant.hourOpenEnd}pm
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-2 pt-3">
                <Button onClick={() => {navigate('/menu')}} className="text-2xl uppercase font-normal" size="lg" variant="outline">View Menu</Button>
                <Button onClick={updateRestaurantOrderFrom} className="text-2xl uppercase font-normal" size="lg" variant="secondary">Order From Here</Button>
            </div>
        </div>
    );
};

export default RestaurantCard;
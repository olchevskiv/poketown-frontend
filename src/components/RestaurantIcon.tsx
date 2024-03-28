import { MapPin } from "lucide-react";
import { useRestaurantContext } from "@/contexts/RestaurantContext";
import { useNavigate } from "react-router-dom";

const RestaurantIcon = () => {
  const {restaurant} = useRestaurantContext();
  const navigate = useNavigate();

    if (restaurant && restaurant.address) {
        return (
            <div onClick={() => { navigate('/locations') }} className="cursor-pointer items-center rounded-full flex flex-row p-2" aria-label="Change my pick up restaurant location">
                <MapPin className="mr-2 hover:text-primary"/>
                <div className="text-nowrap text-lg">
                    {(restaurant.address).substring(0,12)}...
                </div>
            </div>
        );
    } else {
        return (
            <div onClick={() => { navigate('/locations') }} className="cursor-pointer hover:text-primary hover:bg-background" aria-label="Set my pick up restaurant location">
                <MapPin className="hover:text-primary mr-2" />
            </div>
        );
    }

}

export default RestaurantIcon;
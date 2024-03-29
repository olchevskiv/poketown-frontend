import { Clock, MapPin, User } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { useAuth0 } from "@auth0/auth0-react";
import { useRestaurantContext } from "@/contexts/RestaurantContext";
import { Link } from "react-router-dom";

type Props = {
  
}

const PickupDetailsCard = ({}: Props) => {
    const { user } = useAuth0();
    const { restaurant } = useRestaurantContext();

    return (
        <Card className="md:px-4 bg-background">
            <CardHeader className="text-lg uppercase pb-1">Pickup Details</CardHeader>
            <CardContent>
                <Separator className="mb-5"/>

                <div className="flex flex-row items-center space-x-4 md:space-x-2 mb-3">
                    <div className="w-1/12">
                        <MapPin className="text-primary-foreground"/>
                    </div>
                    {
                        restaurant && restaurant.address ? (
                            <div className="flex flex-row flex-wrap justify-between items-center">
                                <div className="flex flex-col self-start text-wrap text-sm">
                                    <div>{restaurant.address}</div>
                                    <div>{restaurant.city}, {restaurant.state} {restaurant.zipCode}</div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col space-x-2 items-center mb-3 w-full">
                                <Link to="/locations" className=" w-full font-bold hover:underline hover:text-primary">Select a location</Link>
                            </div>
                        )
                    }
                </div>

                <div className="flex flex-row items-center space-x-2 mb-3">
                    <div className="w-1/12">
                        <Clock className="text-primary-foreground"/>
                    </div>
                    <div className="flex flex-col space-x-2 justify-between mb-3 w-full">
                        <div className=" w-full">Pickup time</div>           
                    </div>
                </div>

                <div className="flex flex-row items-center  space-x-2  mb-3">
                    <div className="w-1/12">
                        <User className="text-primary-foreground"/>
                    </div>
                    <div className="flex flex-col justify-between mb-3 w-full">
                        {user?.name}
                        <br/>{user?.email}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default PickupDetailsCard;
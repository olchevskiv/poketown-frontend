import { Loader2, MapPin, User } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { useGetRestaurants } from "@/api/RestaurantAPI";
import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";

type Props = {
  
}

const PickupDetailsCard = ({}: Props) => {
    const { user } = useAuth0();
    const { restaurants, isLoading } = useGetRestaurants();
    if (isLoading) {
        return <Loader2 className="mr-2 h-6 w-6 animate-spin h-[800px]"/>;
    }

    if (!restaurants || restaurants.length <= 0 || !Array.isArray(restaurants)) {
        return <Loader2 className="mr-2 h-6 w-6 animate-spin h-[800px]"/>;
    }

  return (
    <Card className="px-4">
        <CardHeader className="text-lg uppercase pb-1">Pickup Details</CardHeader>
        <CardContent>
            <Separator className="mb-5"/>

            <div className="flex flex-row items-center space-x-2  mb-3">
                <div className="w-1/12">
                    <MapPin className="text-primary-foreground"/>
                </div>
                <div className="flex flex-col justify-between mb-3 w-full">
                    <Select>
                        <SelectTrigger className="w-full pl-0">
                            <SelectValue placeholder="Select a restaurant to pick up from" />
                        </SelectTrigger>
                        <SelectContent>
                            {restaurants.map((restaurant: Restaurant) => (
                                <SelectItem value={restaurant._id}>
                                    {restaurant.address + ', ' + restaurant.city + ', ' + restaurant.state + ' ' + restaurant.zipCode}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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
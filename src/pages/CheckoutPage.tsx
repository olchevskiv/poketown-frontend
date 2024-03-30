
import OrderDetailsCard from "@/components/OrderDetailsCard";
import PickupDetailsCard from "@/components/PickupDetailsCard";
import { useRestaurantContext } from "@/contexts/RestaurantContext";
import { useState } from "react";

const CheckoutPage = () => {
    const { restaurant } = useRestaurantContext();
    const [pickUpTime, setPickUpTime] = useState<Date|undefined>();
    

  return (
    <div className="w-full flex-col pb-10">
        <h2 className="text-2xl pl-3 mb-4 hidden">Checkout</h2>
        <div className="flex flex-col md:flex-row w-full">
            <div className="md:basis-1/2 px-3 space-y-4 mb-4">
                { restaurant && restaurant.address ? (
                        <PickupDetailsCard restaurant={restaurant} setPickUpTime={setPickUpTime}/>
                    ) : (
                        <></>
                    )

                }
             
            </div>

            <div className="md:basis-1/2 px-3">
                <OrderDetailsCard restaurant={restaurant} pickUpTime={pickUpTime}/>
            </div>

        </div>
    </div>
  );
}

export default CheckoutPage;
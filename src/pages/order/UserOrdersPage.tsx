import { useGetOrders } from "@/api/MyOrderAPI";
import image from "@/assets/about-us-1.jpg";
import Loader from "@/components/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Restaurant } from "@/types";
import { useCartItemsContext } from "@/contexts/CartItemsContext";
import { Button } from "@/components/ui/button";
import { useRestaurantContext } from "@/contexts/RestaurantContext";
import { toast } from "sonner";
import OrderCarousel from "@/components/OrderCarousel";
import { ArrowRight } from "lucide-react";
import OrderDetail from "@/components/OrderDetail";

type Props = {
  
}

const UserOrdersPages = ({}: Props) => {
  const { orders, isLoading } = useGetOrders();
  const navigate = useNavigate();
  const { loginWithRedirect, user, isLoading: isAuthLoading } = useAuth0();
  const { pathname } = useLocation();
  const { cartItems } = useCartItemsContext();
  const { restaurant:currentRestaunt, setRestaurant } = useRestaurantContext();
  
  if(isLoading || isAuthLoading) {
    return <Loader />;
  }

  if (!user){
    loginWithRedirect({
        appState: {
            returnTo: pathname,
        },
    });
  }

  let setNewRestaurant = false;
  let lastRestaurant: Restaurant | undefined;

  if (currentRestaunt && currentRestaunt.address) {
    lastRestaurant = currentRestaunt;
  } else {
    setNewRestaurant = true;
    if(orders && orders.length > 0) {
        lastRestaurant = orders[0].restaurant;
    }
  } 

  let inProgressOrders = orders?.filter(order =>
    order.status == 'paid' || order.status == "inProgress" || order.status == "readyForPickup"
  );


  const updateRestaurantOrderFrom = () => {
    setRestaurant( (restaurant): Restaurant => {
        if (lastRestaurant) {
            const updatedRestaurant = lastRestaurant;
            sessionStorage.setItem(
                `orderFromRestaurant`,
                JSON.stringify(updatedRestaurant)
            );
    
            toast.success(`Ordering from ${lastRestaurant.address}, ${lastRestaurant.city}`);
            navigate('/menu');

            return updatedRestaurant;
        } else {
            return restaurant;
        }
    });
  
};

  return(
    <div className="flex flex-col justify-between">
        <div className="flex flex-col md:flex-row md:h-[470px] pb-10 md:pb-1">
            <div className="w-full md:w-3/4">
                <img src={image} className="rounded-xl"></img>
            </div>
            <div className="w-full md:w-3/4 flex flex-col pb-1 pt-10 md:pt-1 px-1 md:px-10 space-y-3">
                <h2 className="text-3xl">Welcome, {user?.name?.split(' ')[0]}</h2>
                { cartItems && cartItems.length > 0 ? (
                    <Button onClick={() => navigate('/checkout')} variant="default" size="lg" className="rounded-xl normal-case p-10 text-xl flex flex-row justify-between text-white hover:text-primary">
                        Complete checkout order
                        <ArrowRight className="" size="28"/>
                    </Button>
                ) : (
                    <></>
                )}
                <div className="grid grid-cols-2 gap-4">
                { lastRestaurant ? (
                    <div className="bg-secondary rounded-lg w-full flex flex-col justify-start items-center h-[180px] py-7 px-4">
                        <div className="text-sm uppercase">
                            Recent Location
                        </div>
                        <div className="text-xl">
                            {lastRestaurant.city}
                        </div>
                    
                        {
                            setNewRestaurant ? (
                                <Button variant="default" className="mt-6 " onClick={updateRestaurantOrderFrom}>Order pickup</Button>
                            ) : (
                                <Button className="mt-6 w-full bg-secondary-foreground hover:bg-secondary hover:border-secondary-foreground hover:text-secondary-foreground" onClick={() => navigate('/menu')}>View Menu</Button>
                            )
                        }
                    
                    </div>
                    ) : (
                        <></>
                    )}
                     <div className="bg-muted rounded-lg w-full flex flex-col justify-start items-center h-[180px] py-7 px-4">
                        <div className="text-sm uppercase">
                            Search For
                        </div>
                        <div className="text-xl">
                            Locations
                        </div>
                        <Button className="mt-6 w-full bg-muted border hover:bg-muted text-primary-foreground hover:border-primary hover:text-primary" onClick={() => navigate('/locations')}>Search</Button>
                    </div>
                </div>
            </div>
        </div>

        {
            inProgressOrders?.map((order) => (
                <OrderDetail order={order} />
            ))
        }

        {
            orders && orders.length > 0 ? (
                <div className="mt-8">
                    <h3 className="text-2xl mb-3 tracking-wide md:-pl-3">My Past Orders</h3>
                    <div className="flex flex-col md:flex-row pb-10">
                        <OrderCarousel orders={orders}/>
                    </div>
                </div>
            ) : (
                <></>
            )
        }


    </div>
  );
}

export default UserOrdersPages;
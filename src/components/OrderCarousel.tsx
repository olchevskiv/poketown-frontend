
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "./ui/carousel";
import image from "@/assets/order-1.jpg";
import { Order } from "@/types";
import Loader from "./Loader";
import OrderCard from "./OrderCard";
import { Link } from "react-router-dom";

  type Props = {
    orders: Order[];
  }
  
  const OrderCarousel = ({orders}: Props) => {

    if (!orders) {
      <Loader />
    }

    try {
        return (
        <Carousel className="w-full">
            <CarouselContent className="-ml-2">
            {orders.map((order: Order) => (
                <CarouselItem  key={order._id} className="pl-1 md:pl-10 md:basis-1/2 lg:basis-1/3">
                    <OrderCard order={order}/>
                </CarouselItem>
            ))};
                <CarouselItem className="pl-1 md:pl-10 md:basis-1/2 lg:basis-1/3">
                <Link to="/menu" className="relative hover:brightness-75">
                  <div className="absolute text-2xl bottom-4 left-5">Start a new order!</div>
                  <img src={image} className="rounded-xl md:h-[400px]"></img>
                </Link>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
        );
    } catch (err) {
        console.log(err);
    }
   
  }
  export default OrderCarousel;
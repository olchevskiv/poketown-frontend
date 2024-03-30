import { Order } from "@/types";
import { Separator } from "./ui/separator";
import { ORDER_STATUS } from "@/config/order-status-config";
import { ProgressBar } from "react-step-progress-bar";
import { ShoppingBag } from "lucide-react";
import "react-step-progress-bar/styles.css";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import moment from "moment";

type Props = {
  order: Order
}

const OrderDetail = ({order}: Props) => {

    const getOrderStatusInfo = () => {
      return (
        ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
      );
    };

    return (
      <div className="space-y-8 bg-muted p-5 md:p-10 rounded-lg">

        <div className="tracking-wider flex flex-col gap-5 md:flex-row md:justify-between">
          <h2 className="text-4xl flex flex-row items-center justify-center">
            <ShoppingBag size="28" className="mr-3 mt-1" />
            <div>{getOrderStatusInfo().label}</div>
          </h2>
          <div className="text-lg flex flex-col text-right"> 
            Expected pickup time 
            <span className="text-2xl">{moment(order.pickUpTime).calendar()}</span>
          </div>
        </div>
        <ProgressBar percent={getOrderStatusInfo().progressValue} filledBackground="hsl(var(--primary)" unfilledBackground="hsl(43, 11%, 74%)"/>
        
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-5">
            <div className="flex flex-col">
              <div className="font-normal">Pickup from:</div>
              <div className="text-xl font-normal">{order.restaurant.address}</div>
              <div className="text-xl font-normal">
                {order.restaurant.city}, {order.restaurant.state} {order.restaurant.zipCode}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="font-normal">Your Order</div>
              <ul>
                {order.cartItems.map((item) => (
                  <li key={item._id}>
                    <span className="text-xl">{item.name}</span> <span className="text-lg ml-2">x {item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Separator />
            <div className="flex flex-col">
              <span className="font-bold">Total</span>
              <span className="text-xl">${(order.totalAmount / 100).toFixed(2)}</span>
            </div>
          </div>
          <AspectRatio ratio={16 / 5}>
            <img
              src={order.cartItems[0].image_url}
              className="rounded-md object-cover h-full w-full"
            />
          </AspectRatio>
        </div>
      </div>
    );
}

export default OrderDetail;
import { Order } from "@/types";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import customBowlImage from "../assets/custom-bowl.png";

type Props = {
    order: Order;
}

const OrderCard = ({order}: Props) => {
    const navigate = useNavigate(); 
    const orderRoute = () =>{ 
        navigate(`/order/${order._id}`,{ replace: true });
    }

    let cartItemsList = order.cartItems.slice(1, 3).reduce( 
        (list, cartItem) => list + ', ' + cartItem.name,
        order.cartItems[0].name
    )

    if (order.cartItems.length > 3) {
        cartItemsList += "...";
    }


    return (
        <div  onClick={orderRoute} className="py-5 md:py-10 md:h-[400px] flex flex-col space-y-6 justify-start items-center rounded-xl hover:border hover:border-primary-foreground bg-muted hover:bg-background px-10" >
            {
                order.cartItems[0].image_url != '' ? (
                    <img className="h-[220px]" src={order.cartItems[0].image_url}></img>
                ) : (
                    <img className="h-[220px]" src={customBowlImage}></img>
                )
            }
            
            <div className="w-full" >
                <div className="text-lg mb-2 tracking-wide">{cartItemsList}</div>
                <div className="text-lg">{moment(order.createdAt).format("LL")}</div>
                <div className="text-lg">Total ${order.totalAmount} </div>
            </div>

        </div>
    );
};

export default OrderCard;
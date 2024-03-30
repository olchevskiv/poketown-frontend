import { useGetOrder } from "@/api/MyOrderAPI";
import Loader from "@/components/Loader";
import OrderDetail from "@/components/OrderDetail";
import { useParams } from "react-router-dom";

const OrderDetailPage = () => {
  const { orderID } = useParams();
  const { order, isLoading } = useGetOrder(orderID);

  console.log(orderID);
  if (isLoading) {
      return <Loader />;
  }

  if (!order) {
    return "Order does not exist";
  }


  return (
    <OrderDetail order={order} />
  );
}

export default OrderDetailPage;
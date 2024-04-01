import { useGetOrder } from "@/api/MyOrderAPI";
import Loader from "@/components/Loader";
import OrderDetail from "@/components/OrderDetail";
import { useParams, useSearchParams } from "react-router-dom";

const OrderDetailPage = () => {
  const { orderID } = useParams();
  const { order, isLoading } = useGetOrder(orderID);
  const [ searchParams ] = useSearchParams();

  if (isLoading) {
    return <Loader />;
  }

  if (searchParams.get("success") == "true") {
  // order succesfully paid and placed
  // remove order from local storage
   sessionStorage.removeItem(`cartItems`);
  }

  if (!order) {
    return "Order does not exist";
  }

  return (
    <OrderDetail order={order} />
  );
}

export default OrderDetailPage;
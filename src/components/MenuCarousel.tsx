
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import MenuCard from "./MenuItemCard";
import { useGetMenuItems } from "@/api/MenuItemsAPI";
import { MenuItem } from "@/types";

const MenuCarousel = () => {
  const { menuItems, isLoading } = useGetMenuItems();

  if (isLoading) {
    return "Loading...";
  }

  if (!menuItems || menuItems.length <= 0) {
    return "No menu found";
  }
try {
  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-2">
        {menuItems.map((item: MenuItem) => (
            <CarouselItem  key={item._id} className="pl-1 md:pl-10 md:basis-1/2 lg:basis-1/3">
            <MenuCard menuItem={item} showPriceCalories={false} />
            </CarouselItem>
        ))};
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
} catch (err) {
  console.log(err);
}
 
}
export default MenuCarousel;
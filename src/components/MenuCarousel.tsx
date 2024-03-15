
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import bowl1 from "../assets/bowl-1.png";
import bowl2 from "../assets/bowl-2.png";
import bowl3 from "../assets/bowl-3.png";
import MenuCard from "./MenuCard";

const MenuCarousel = () => {
    return (
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
              <CarouselItem key="1" className="pl-1 md:pl-10 md:basis-1/2 lg:basis-1/3">
                <MenuCard image={bowl1} title="Spicy Tuna Bowl" description="Salmon, cucumber, sweet onion, edamame, Sriracha Aioli flavor, seaweed salad, green onion, sesame seeds, onion crisps, shredded nori, white rice" />
              </CarouselItem>
              <CarouselItem key="2" className="pl-1 md:pl-10 md:basis-1/2 lg:basis-1/3">
              <MenuCard image={bowl2} title="Shrimp Mushroom Bowl" description="Salmon, cucumber, sweet onion, edamame, Sriracha Aioli flavor, seaweed salad, green onion, sesame seeds, onion crisps, shredded nori, white rice" />
              </CarouselItem>
              <CarouselItem key="3" className="pl-1 md:pl-10 md:basis-1/2 lg:basis-1/3">
                <MenuCard image={bowl3} title="Summer Chicken Bowl" description="Grilled chicken, corn, pepper, tomato, shredded cabbage, brown rice" />
              </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )
}
export default MenuCarousel;
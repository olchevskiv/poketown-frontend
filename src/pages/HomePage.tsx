
import MenuCarousel from "@/components/MenuCarousel";
import Hero from "@/components/Hero";

const HomePage = () => {
  return(
    <div className="flex flex-col gap-12 pb-10">
        <Hero />
        <div className="py-10">
            <MenuCarousel />
        </div>
    </div>
  );
}

export default HomePage;
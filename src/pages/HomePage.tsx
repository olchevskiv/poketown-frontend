
import MenuCarousel from "@/components/MenuCarousel";
import Hero from "@/components/Hero";

/*
 <div className="gap-5 bg-white rounded-lg shadow-md text-center py-8 mb-10">
            <h2 className="text-5xl font-bold tracking-tight text-primary mb-3">
              
          </h2>
      </div>
*/
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
import hero from "../assets/poke-hero.png"
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="container flex flex-col md:flex-row justify-evenly md:pt-10 pt-0 pb-10">
        <div className="flex flex-col pt-10">
            <div className="text-5xl font-bold mb-5 pt-10"> 
                POKE YOUR WAY
            </div>
            <div className="text-2xl text-wrap mb-5"> 
                Enjoy healthy and delicious Hawaiian inspired poke bowls, made your way or choose from our hand-crafted menu!
            </div>
            <div className="flex flex-row space-x-4 "> 
                <Button size="lg" variant="secondary">SEE LOCATIONS</Button>
                <Button size="lg" variant="default">ORDER NOW!</Button>
            </div>
        </div>
        <div className="w-full md:w-3/4 pt-10 md:pt-0 flex items-end">
            <img src={hero} className="w-full max-h-[600px] object-cover"/>
        </div>

    </div>
  );
}

export default Hero;
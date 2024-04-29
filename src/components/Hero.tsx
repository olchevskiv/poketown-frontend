import { useNavigate } from "react-router-dom";
import hero from "../assets/poke-hero.png"
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

const Hero = () => {
    const navigate = useNavigate(); 
    const {loginWithRedirect, isAuthenticated } = useAuth0();

    return (
    <div className="container flex flex-col lg:flex-row justify-evenly lg:pt-10 pt-0 pb-10">
        <div className="flex flex-col pt-10">
            <div className="text-5xl font-bold mb-5 pt-10"> 
                POKÉ YOUR WAY
            </div>
            <div className="text-2xl text-wrap mb-5 pe-3 tracking-wide"> 
                Enjoy healthy and delicious Hawaiian inspired poké bowls, made your way or choose from our hand-crafted menu!
            </div>
            <div className="flex  flex-col lg:flex-row lg:space-x-4 lg:space-y-0 space-y-3"> 
                <Button onClick={() => navigate('/menu')} size="lg" variant="secondary" className="text-xl font-normal">View Menu</Button>

                {isAuthenticated ? (
                    <Button onClick={() => navigate('/menu')} size="lg" variant="default" className="text-xl font-normal">ORDER NOW!</Button>
                ) : (
                    <Button onClick={async () => await loginWithRedirect()} size="lg" variant="default" className="text-xl font-normal">ORDER NOW!</Button>
                )}
                
            </div>
        </div>
        <div className="w-full lg:w-3/4 pt-10 lg:pt-0 hidden lg:flex flex items-end">
            <AspectRatio ratio={1041/1043}>
            <img src={hero} className="w-full max-h-[600px]"/>
            </AspectRatio>
          
        </div>

    </div>
    );
}

export default Hero;
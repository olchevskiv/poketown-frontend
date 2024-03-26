
/*
  <div className="flex flex-col w-full">
        <h2 className="text-2xl mb-2">Origin Story</h2>
        <div className="text-lg mb-5">
            Poketown is a fictional Poké bowl restaurant created out of my love for Poké bowls and web design! I spent about a week working and refining this website to be my version of my dream Poké restaurant web application. I order custom Poké bowls from my local restaurants almost every week and from ordering online, and one day when I was ordering my weekly Poké bowl, I realized I wanted to create my own improved version of the site. 
        </div>
        <h2 className="text-2xl mb-2">What is Poké</h2>
            <div className="text-lg">
            
            </div>
        </div>
*/
import { Link } from "react-router-dom";
import image1 from "../assets/about-us-1.jpg";
import image2 from "../assets/about-us-2.jpg";

const AboutUsPage = () => {
    return (
        <div className="flex flex-col w-full">
            <div  className="grid grid-cols-1 lg:grid-cols-2 auto-rows-fr">
                <figure>
                    <img className="object-cover w-full h-[450px] lg:h-[750px]" src={image1}></img>
                </figure>
                <div className="bg-secondary px-20 py-20 h-[450px] lg:h-[750px]">
                    <div className="flex flex-col space-y-10">
                        <h2 className="text-4xl lg:text-5xl">Origin Story</h2>
                        <div className="text-3xl">
                            Poketown is a fictional Poké bowl restaurant created out of my love for Poké bowls and web design! 
                            I spent about a week working and refining this website to be my version of my dream Poké restaurant web application. 
                        </div>
                        <div className="text-2xl">   
                            The design was adapted from the design of another restaurant website I love, <Link to="https://www.sweetgreen.com/" className="hover:underline">Sweetgreen</Link>. 
                        </div>
                    </div>
                </div>
               
                <div className="bg-muted px-20 py-20 space-y-10 h-[450px] lg:h-[750px]">
                    <div className="flex flex-col space-y-10">
                        <h2 className="text-4xl lg:text-5xl">What is Poké?</h2>
                        <div className="text-2xl lg:text-3xl">
                            Poké is native Hawaiian cuisine, traditionally made up of diced fresh fish served as an appetizer or main course. 
                            Modern twists by poké bowl companies include chicken, tofu, shrimp or salmon with strong influences of Japanese and Korean cuisine. 
                        </div>
                    </div>
                </div>
                <figure>
                    <img className="object-cover w-full h-[450px] lg:h-[750px]" src={image2}></img>
                </figure>
            </div>
           

        </div>



  
    );
}

export default AboutUsPage;
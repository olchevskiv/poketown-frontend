import MenuCard from "@/components/MenuItemCard";
import customBanner from "../assets/poke-custom-banner.jpg";
import { Button } from "@/components/ui/button";
import { useGetMenuItems } from "@/api/MenuItemsAPI";
import { MenuItem } from "@/types";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MenuPage = () => {
  const { menuItems, isLoading } = useGetMenuItems();
  const navigate = useNavigate(); 
  
  if (isLoading) {
    return <Loader2 className="mr-2 h-6 w-6 animate-spin h-[800px]"/>;
  }

  if (!menuItems || menuItems.length <= 0 || !Array.isArray(menuItems)) {
    return <Loader2 className="mr-2 h-6 w-6 animate-spin h-[800px]"/>;
  }

  const menuItemsByCategory = new Map();

  menuItems.forEach((item) => {
    const category = item.category;
    menuItemsByCategory.set(
      category,
      (menuItemsByCategory.get(category) || []).concat(item)
    );
  });

  const bowls = menuItemsByCategory.get('BOWL');
  const sides = menuItemsByCategory.get('SIDE');
  const beverages = menuItemsByCategory.get('BEVERAGE');


  try {
  return <div className="flex flex-col w-full">

    <div className="mb-6">
      <h3 className="text-primary-foreground text-3xl tracking-wide mb-2" id="bowls" >Bowls</h3>
      <div className="flex flex-wrap -ml-3">
        {bowls.map((item: MenuItem) => (
          <div className="w-full sm:w-1/2 lg:w-1/4 px-3 py-3" key={item._id}>
            <MenuCard menuItem={item} />
          </div>
            
        ))}
      </div>
    </div>

    <div className="mb-6">
      <h3 className="text-primary-foreground text-3xl tracking-wide mb-2" id="custom" >Custom</h3>
      <div className="h-[450px] w-full items-center rounded-xl bg-muted px-10 justify-center content-start flex flex-col items-start space-y-4 md:mb-3"  style={{backgroundImage: `url(${customBanner})`, backgroundPosition: 'right',
        backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
            <h4 className="text-5xl text-primary-foreground self-start ml-10 tracking-wider">Make Your Own</h4>
            <span className="text-xl text-primary-foreground self-start ml-10 tracking-wide">Design your own custom Poke bowl just the way you want it!</span>
            <Button onClick={() => navigate('/menu/custom')} variant="secondary" size="lg" className="self-start ml-10 hover:bg-transparent">Get Started!</Button>
      </div>
    </div>

    <div className="mb-6">
      <h3 className="text-primary-foreground text-3xl tracking-wide mb-2" id="sides" >Sides</h3>
      <div className="flex flex-wrap -ml-3">
        {sides.map((item: MenuItem) => (
          <div className="w-full sm:w-1/2 lg:w-1/4 px-3 py-3" key={item._id}>
            <MenuCard menuItem={item}/>
          </div>
            
        ))}
      </div>
    </div>

    <div className="mb-6">
      <h3 className="text-primary-foreground text-3xl tracking-wide mb-2" id="beverages" >Beverages</h3>
      <div className="flex flex-wrap -ml-3">
        {beverages.map((item: MenuItem) => (
          <div className="w-full sm:w-1/2 lg:w-1/4 px-3 py-3" key={item._id}>
            <MenuCard menuItem={item} />
          </div>
            
        ))}
      </div>
    </div>

  </div>;
 } catch (err) {
    console.log(err);
  }
}

export default MenuPage;
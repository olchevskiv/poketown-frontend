import { MenuItem } from "@/types";
import { useNavigate } from "react-router-dom";

type Props = {
    menuItem: MenuItem;
    showPriceCalories?: boolean;
}

const MenuItemCard = ({menuItem,showPriceCalories=true}: Props) => {
    const navigate = useNavigate(); 
    const menuItemRoute = () =>{ 
        navigate(`/menu/${menuItem._id}`,{ replace: true });
    }
    
    return (
        <div  onClick={menuItemRoute} className="py-5 md:py-10 md:h-[520px] flex flex-col justify-start items-center rounded-xl hover:border hover:border-primary-foreground bg-muted hover:bg-background px-10" >
            <img className="pb-5 pt-5 md:w-11/12 w-3/5 max-h-[340px]" src={menuItem.image_url}></img>
            <div >
                <div className="text-2xl mb-2 uppercase tracking-wide">{menuItem.name}</div>
                <div className="text-md">{menuItem.description}</div>
                {showPriceCalories ? (
                    <div className="text-md py-3">${menuItem.price} - {menuItem.baseCalories} CAL</div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
};

export default MenuItemCard;
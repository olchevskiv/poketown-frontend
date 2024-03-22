import { Minus } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  action: String;
  count?: number;
}

const IngredientActionButton = ({action, count=0}: Props) => {

    const renderButton = () => {
        switch(action) {
            case "counter":   
                return <div className=" rounded-full bg-primary text-white text-md font-bold py-1 px-3">{count}</div>;
            case "remove":   
                return <Button variant="secondary" size="sm"  className="px-1 rounded-full hover:border-primary-foreground"><Minus className="text-primary-foreground hover:text-primary-foreground" /></Button>;

            default:      return <div></div>
        }
    }

    return (
        <div>{ renderButton() }</div>
    );
}

export default IngredientActionButton;
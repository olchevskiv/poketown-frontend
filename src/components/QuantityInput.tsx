import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const QuantityInput = ({quantity, setQuantity}: Props) => {
  return (
    <div className="flex flex-row justify-between space-x-3">
        <Button aria-label="Remove 1 Quantity" onClick={() => {setQuantity(quantity > 1 ? --quantity : quantity)}} variant="outline" size="sm"  className="px-1 w-[28px] h-[28px] rounded-full hover:border-primary-foreground">
            <Minus className="text-primary-foreground" />
        </Button>
        <div>{quantity}</div>
        <Button aria-label="Add 1 Quantity" onClick={() => {setQuantity(quantity < 10 ? ++quantity : quantity)}} variant="outline" size="sm" className="px-1 w-[28px] h-[28px] rounded-full text-white hover:border-primary-foreground text-md font-bold">
            <Plus className="text-primary-foreground" />
        </Button>
    </div>
  );
}

export default QuantityInput;
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  variantProp?: IntrinsicAttributes & ButtonProps & RefAttributes<HTMLButtonElement>
}


const LoadingButton = ({variantProp}: Props) => {
  return (
    <Button disabled variant={variantProp}>
        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
        Please wait...
    </Button>
  );
}

export default LoadingButton;
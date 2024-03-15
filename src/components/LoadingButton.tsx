import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { type VariantProps } from "class-variance-authority"

type Props = {
  variant?: VariantProps
}


const LoadingButton = ({variant}: Props) => {
  return (
    <Button disabled variant={variant}>
        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
        Please wait...
    </Button>
  );
}

export default LoadingButton;
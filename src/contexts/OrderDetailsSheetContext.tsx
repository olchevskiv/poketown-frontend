import OrderDetailsSheet from "@/components/OrderDetailsSheet";
import React, { createContext, useState } from "react";

/* 
  OrderDetailsSheetContext allows for rendering (opening and closing) of the OrderDetailsSheet component
  across all componenets so that the sheet can be opened and closed from wherever needed.

  Example:
  Used in ShoppingBagIcon.tsx so that when a user clicks on the shopping bag icon in the header
  the sheet is then opened so the user can quickly view what items they have added to their order/cart.

*/

interface OrderDetailsSheetContextValue {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderDetailsSheetContext = createContext<OrderDetailsSheetContextValue | undefined>(undefined);

type Props = {
    children: React.ReactNode;
}

const OrderDetailsSheetProvider = ({ children }: Props) => {
    const [open, setOpen] = useState(false);

    return (
      <OrderDetailsSheetContext.Provider value={{open, setOpen}}>
        {children}
        <OrderDetailsSheet open={open} onOpenChange={setOpen} />
      </OrderDetailsSheetContext.Provider>
    );
};

const useOrderDetailsSheetContext = () => {
    const context = React.useContext(OrderDetailsSheetContext);
    if (context === undefined) {
      throw new Error('useOrderDetailsSheetContext must be inside a OrderDetailsSheetProvider');
    }
    return context;
};

export { 
    OrderDetailsSheetProvider, useOrderDetailsSheetContext 
}

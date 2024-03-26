export type User = {
    _id: string,
    email: string,
    name: string,
    addressLine: string,
    city: string,
    zipCode: string,
    country: string
};

export type Restaurant = {
    _id: string,
    address: string,
    city: string,
    state: string,
    zipCode: string,
    country: string,
    image_url: string,
    daysOpen: string[],
    hourOpenStart: number,
    hourOpenEnd: number
};


export type Ingredient = {
    _id: string,
    name: string,
    category: string,
    description: string,
    price: number,
    calories: number,
    image_url: string,
    quantity: number
};

export type MenuItem = {
    _id: string,
    name: string,
    description: string,
    price: number,
    category: string,
    image_url: string,
    ingredients: Ingredient[]
};

export type CartItem = {
    _id: string,
    name: string,
    price: number,
    quantity: number,
    calories: number,
    image_url: string,
    ingredients: Ingredient[]
};

export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "readyForPickup";

export type Order = {
    _id: string;
    restaurant: Restaurant;
    cartItems: CartItem[];
    user: User;
    totalAmount: number;
    status: OrderStatus;
    createdAt: string;
    restaurantId: string;
}

export type SearchState = {
    searchQuery: string;
    page: number;
    sortOption: string;
};

export type RestaurantSearchResponse = {
    data: Restaurant[];
    pagination: {
      total: number;
      page: number;
      pages: number;
    };
  };
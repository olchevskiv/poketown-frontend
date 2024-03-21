export type User = {
    _id: string,
    email: string,
    name: string,
    addressLine: string,
    city: string,
    zipCode: string,
    country: string
};

export type Ingredient = {
    _id: string,
    name: string,
    category: string,
    description: string,
    price: number,
    calories: number,
    image_url: string,
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

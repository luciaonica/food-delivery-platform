import { Restaurant } from "./Restaurant";

export interface Dish {
    id?: number,
    name: string,
    description: string,
    size: string,
    price: number,
    picture: string,
    restaurant: Restaurant,
    imageUrl?: string
}
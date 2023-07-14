import { Restaurant } from "./Restaurant";

export interface ActivationRequest {
    id?: number;
    restaurant: Restaurant;
    requestDate?: Date;
    status: string;
}
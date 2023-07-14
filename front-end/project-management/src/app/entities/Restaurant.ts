export interface Restaurant {
    id?: number;
    name: string;
    username: string;
    address: string;
    email: string;
    password: string | null;
    license: string;
    registerDate:Date;
    enabled:boolean;
    picture:string;
    imageUrl?: string;
    description:string;
    hasPendingRequest:boolean;
}
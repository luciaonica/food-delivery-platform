import { Role } from "./Role"

export interface User {
    username: string,
    password: string | null,
    enabled: boolean,
    roles: Role[]
}
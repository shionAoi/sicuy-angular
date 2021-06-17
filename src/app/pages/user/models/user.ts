import { Access } from "./access"
import { Rol } from "./rol"

export class User {
    _id: string
    names: string
    firstName: string
    lastName: string
    dni: string
    photo: string
    email: string
    phone: string
    roles : Rol[]
    accessLifeCycle: Access
}
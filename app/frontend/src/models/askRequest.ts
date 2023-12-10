import { UserRoles } from "./userRoles"

/* This type constains questions according to the user roles*/
export type AskRequest = {
    question: string,
    role: UserRoles
}
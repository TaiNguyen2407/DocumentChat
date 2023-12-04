import { UserRoles } from "./userRoles"

export type AskRequest = {
    question: string,
    role: UserRoles
}
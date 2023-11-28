export const enum UserRoles {
    User = "user",
    Assistant = "assistant"
}

export type AskRequest = {
    question: string,
    role: UserRoles
}

export type UserDetails = {
    username: string,
    password: string,
}
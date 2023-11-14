import { BaseUrl } from "../constants";
import { AskRequest } from "./models";

export async function postMessageToBackendApi(messageToBackend: AskRequest) {
    try {
        const response = await fetch(BaseUrl + '/api/chat/user-question', {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(messageToBackend)
        })

        const parsedRepsonse = await response.json();
        if (response.status > 299 || !response.ok) {
            throw Error(parsedRepsonse.error || "unknown error");
        }

        return parsedRepsonse;
    } catch (error: unknown) {
        console.error("error fetching data", error);
        if (typeof error === "object" && error !== null && "message" in error) {
            return error.message as string;
        } else {
            return "An unknown error occurred";
        }
    }
}
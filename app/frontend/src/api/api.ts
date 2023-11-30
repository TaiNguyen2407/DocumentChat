import { BaseUrl } from "../constants";
import { AskRequest } from "./models";

export async function postMessageToBackendApi(messageToBackend: AskRequest, chatId: number) {
    try {
        const response = await fetch(BaseUrl + `/api/chat/user-question?chat_id=${chatId}`, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(messageToBackend)
        })

        const parsedResponse = await response.json();
        if (response.status > 299 || !response.ok) {
            throw Error(parsedResponse.error || "unknown error");
        }
        return parsedResponse;
    } catch (error: unknown) {
        console.error("error fetching data", error);
        if (typeof error === "object" && error !== null && "message" in error) {
            return error.message as string;
        } else {
            return "An unknown error occurred";
        }
    }
}

export async function getNewMessageFromBackendApi(chatId: number) {
    try {
        const response = await fetch(BaseUrl + `/api/chat_history?chat_id=${chatId}`, {
            method: "GET",
            headers: {
                'Content-Type' : 'application/json'
            }
        })

        const parsedResponse = await response.json();
        if (response.status > 299 || !response.ok) {
            throw Error(parsedResponse.error || "unknown error");
        }
        return parsedResponse[parsedResponse.length - 1];
    } catch (error: unknown) {
        console.error("error fetching data", error);
        if (typeof error === "object" && error !== null && "message" in error) {
            return error.message as string;
        } else {
            return "An unknown error occurred";
        }
    }
}

export async function getAllMessagesFromBackendApi(chatId: number) {
    try {
        const response = await fetch(BaseUrl + `/api/chat_history?chat_id=${chatId}`, {
            method: "GET",
            headers: {
                'Content-Type' : 'application/json'
            }
        })

        const parsedResponse = await response.json();
        if (response.status > 299 || !response.ok) {
            throw Error(parsedResponse.error || "unknown error");
        }
        return parsedResponse;
    } catch (error: unknown) {
        console.error("error fetching data", error);
        if (typeof error === "object" && error !== null && "message" in error) {
            return error.message as string;
        } else {
            return "An unknown error occurred";
        }
    }
}
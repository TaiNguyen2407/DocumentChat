import { BaseUrl, LoginUrl } from "../constants";
import axios from "axios";
import { AskRequest } from "../models/askRequest";
import { UserDetails } from "../models/userDetails";

export async function postMessageToBackendApi(messageToBackend: AskRequest, chatId: number) {
    try {
        const response = await fetch(BaseUrl + `/api/chat/user-question?chat-id=${chatId}`, {
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
        const response = await fetch(BaseUrl + `/api/chat-history?chat-id=${chatId}`, {
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
        const response = await fetch(BaseUrl + `/api/chat-history?chat-id=${chatId}`, {
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

export async function getMessagesFromBackendApi() {
  try {
    const response = await fetch(BaseUrl + "/api/chat/all-messages", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const parsedRepsonse = await response.json();
    if (response.status > 299 || !response.ok) {
      throw Error(parsedRepsonse.error || "unknown error");
    }
    return parsedRepsonse[parsedRepsonse.length - 1];
  } catch (error: unknown) {
    console.error("error fetching data", error);
    if (typeof error === "object" && error !== null && "message" in error) {
      return error.message as string;
    } else {
      return "An unknown error occurred";
    }
  }
}

export async function postMessageToLoginApi(userCredentials: UserDetails) {
  try {
    const response = await fetch(LoginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    });

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

export async function postDocumentToBackendApi(data: FormData) {
  try {
    const response = await axios.post(
      BaseUrl + "/api/upload/upload-document",
      data
    );
    if (response.status > 299) {
      throw Error("document upload error");
    }
    return response;
  } catch (error: unknown) {
    console.error("error fetching data", error);
    if (typeof error === "object" && error !== null && "message" in error) {
      return error.message as string;
    } else {
      return "An unknown error occurred";
    }
  }
}


export async function postDocumentRelatedQuestionToBackendApi(questionToBackend: AskRequest) {
  try {
    const response = await fetch(BaseUrl + "/api/chat/document-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionToBackend),
    });

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

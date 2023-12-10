import { BaseUrl, LoginUrl } from "../constants";
import axios from "axios";
import { AskRequest } from "../models/askRequest";
import { UserDetails } from "../models/userDetails";

/* This controller is created for fetching the logged in user's username from the local storage */
export const getUsernameFromLocalStorage = () => {
  if (localStorage.getItem("user") !== null) {
    const userData = JSON.parse(localStorage.getItem("user")!);

    return userData ? userData.user : null;
  }
}

/* This controller is created for posting a message to our backend api */
export async function postMessageToBackendApi(
  messageToBackend: AskRequest,
  chatId: number
) {
  try {
    const username = getUsernameFromLocalStorage();

    const response = await fetch(
      BaseUrl + `/api/chat/user-question?chat-id=${chatId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Username: username,
        },
        body: JSON.stringify(messageToBackend),
      }
    );

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

/* This controller is created for fetching new message from our backend api */
export async function getNewMessageFromBackendApi(chatId: number) {
  try {
    const username = getUsernameFromLocalStorage();

    const response = await fetch(
      BaseUrl + `/api/chat-history?chat-id=${chatId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Username: username,
        },
      }
    );

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

/* This controller is created for fetch messages of a single chat according to the chat id */
export async function getAllMessagesFromBackendApi(chatId: number) {
  try {
    const username = getUsernameFromLocalStorage();

    const response = await fetch(
      BaseUrl + `/api/chat-history?chat-id=${chatId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Username: username,
        },
      }
    );

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
/* This controller is created for fetch list of all the messages saved according to the logged in user */
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

/* This controller is created for posting login credentials to Metropolia Login api. */
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

/* This controller is created for posting document to our backend api. */
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

/* This controller is created for posting questions related to uploaded document to our backend api. */
export async function postDocumentRelatedQuestionToBackendApi(
  questionToBackend: AskRequest
) {
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

import { BaseUrl, LoginUrl } from "../constants";
import { AskRequest, UserDetails } from "./models";
import axios, { AxiosResponse } from "axios";

export async function postMessageToBackendApi(messageToBackend: AskRequest) {
  try {
    const response = await fetch(BaseUrl + "/api/chat/user-question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageToBackend),
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

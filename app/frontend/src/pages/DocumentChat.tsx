import { useState } from "react";
import ChatMessages, { Message } from "../components/ChatMessages";
import {
  getMessagesFromBackendApi,
  postDocumentToBackendApi,
  postDocumentRelatedQuestionToBackendApi,
} from "../api/api";
import QuestionInput from "../components/QuestionInput";
import UploadDocument from "../components/UploadDocument";
import FileDetail from "../components/FileDetail";
import { UserRoles } from "../models/userRoles";

/*This page is created for displaying a chat related to document between user and LLM */
const DocumentChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileUploaded, setFileUploaded] = useState<boolean>(false);
  const [file, setFile] = useState<File>();

  /*Method for asking question related to the document in documentChat page. */
  const onSendTextMessage = async (text: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      content: text,
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsLoading(true);

    try {
      await postDocumentRelatedQuestionToBackendApi({
        question: text,
        role: UserRoles.User,
      });
      const botMessage = await getMessagesFromBackendApi();
      const newMessageBot: Message = {
        id: messages.length + 2,
        content: botMessage["content"],
        sender: botMessage["sender"],
      };
      setMessages((prevMessages) => [...prevMessages, newMessageBot]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  /*Method for uploading the document */
  const uploadDocument = async (file: File) => {
    try {
      setFileUploaded(false);
      if (file.type === "application/pdf") {
        setFile(file);
        const formData = new FormData();
        formData.append("file", file);
        try {
          await postDocumentToBackendApi(formData);
        } catch (e) {
          console.warn("Document upload unsuccessful", e);
        }
      } else {
        console.error("please upload correct file");
      }
    } catch (e) {
      console.error("error: ", e);
    } finally {
      setFileUploaded(true);
    }
  };

  //IF else used for displaying correct phase between before uploading document, document uplading and document uploaded"
  if (fileUploaded && file !== undefined) {
    return (
      <div className="h-full my-5 border border-solid mx-20 bg-gray-50 flex flex-col justify-between overflow-hidden border shadow-lg rounded-lg xl:mx-40">
        <FileDetail file={file} />
        <ChatMessages messages={messages} loadingAnswer={isLoading} />
        <QuestionInput
          onSend={onSendTextMessage}
          isDisabled={isLoading}
          placeholder="Type a new question (e.g. what is this data about?)"
          clearOnSend
        />
      </div>
    );
  } else if (fileUploaded === false && file !== undefined) {
    return (
      <div className="h-full my-5 border border-solid mx-20 bg-gray-50 flex flex-col overflow-hidden border shadow-lg rounded-lg xl:mx-40">
        <UploadDocument uploadDocument={uploadDocument} />
        <div className="grid place-items-center w-full pt-40">
          <div className="animate-pulse flex flex-col items-center gap-8 w-2/3">
            <div className="">
              <div className="w-48 h-6 bg-slate-400 rounded-md"></div>
              <div className="w-28 h-4 bg-slate-400 mx-auto mt-3 rounded-md"></div>
            </div>
            <div className="h-7 bg-slate-400 w-full rounded-md"></div>
            <div className="h-7 bg-slate-400 w-full rounded-md"></div>
            <div className="h-7 bg-slate-400 w-full rounded-md"></div>
            <div className="h-7 bg-slate-400 w-full rounded-md"></div>
            <div className="h-7 bg-slate-400 w-1/2 rounded-md"></div>
          </div>
          <h1 className="font-semibold text-2xl pt-8">Studying the uploaded document</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-full my-5 border border-solid mx-20 bg-gray-50 flex flex-col justify-between overflow-hidden border shadow-lg rounded-lg xl:mx-40">
        <UploadDocument uploadDocument={uploadDocument} />
      </div>
    );
  }
};

export default DocumentChat;

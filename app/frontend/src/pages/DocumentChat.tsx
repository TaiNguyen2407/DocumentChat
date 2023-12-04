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

const DocumentChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileUploaded, setFileUploaded] = useState<boolean>(false);
  const [file, setFile] = useState<File>();

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
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadDocument = async (file: File) => {
    try {
      if (file.type === "application/pdf") {
        console.log("file: ", file);
        const formData = new FormData();
        formData.append("file", file);
        try {
          const response = await postDocumentToBackendApi(formData);
          setFile(file);
          setFileUploaded(true);
          console.log("response: ", response);
        } catch (e) {
          console.warn("Document upload unsuccessful", e);
        }
      } else {
        console.log("please upload correct file");
      }
    } catch (e) {
      console.log("error: ", e);
    }
  };

  return (
    <div className="h-full my-5 border border-solid mx-20 bg-gray-50 flex flex-col justify-between overflow-hidden border shadow-lg rounded-lg 2xl:mx-60">
      {fileUploaded && file !== undefined ? (
        <FileDetail file={file} />
      ) : (
        <UploadDocument uploadDocument={uploadDocument} />
      )}
      <ChatMessages messages={messages} loadingAnswer={isLoading} />
      <QuestionInput
        onSend={onSendTextMessage}
        isDisabled={isLoading}
        placeholder="Type a new question (e.g. what is this data about?)"
        clearOnSend
      />
    </div>
  );
};

export default DocumentChat;

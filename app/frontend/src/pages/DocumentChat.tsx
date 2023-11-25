import { useState } from "react";
import ChatMessages, { Message } from "../components/ChatMessages";
import { getMessagesFromBackendApi, postMessageToBackendApi } from "../api/api";
import { UserRoles } from "../api/models";
import QuestionInput from "../components/QuestionInput";
import UploadDocument from "../components/UploadDocument";
import FileDetail from "../components/FileDetail";

const DocumentChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileUploaded, setFileUploaded] = useState<boolean>(false);
  const [file, setFile] = useState<File>();

  const onSendTextMessage = async (text: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsLoading(true);

    try {
      await postMessageToBackendApi({ question: text, role: UserRoles.User });
      const botMessage = await getMessagesFromBackendApi();
      const newMessageBot: Message = {
        id: messages.length + 2,
        text: botMessage["content"],
        sender: botMessage["sender"],
      };
      setMessages((prevMessages) => [...prevMessages, newMessageBot]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadDocument = (file: File) => {
    console.log("file: ", file);
    setFile(file);
    setFileUploaded(true);
  };

  return (
    <div className="h-full my-5 border border-solid mx-20 bg-gray-50 flex flex-col justify-between overflow-hidden border shadow-lg rounded-lg 2xl:mx-60">
      {fileUploaded ? (
        <FileDetail file={file!} />
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

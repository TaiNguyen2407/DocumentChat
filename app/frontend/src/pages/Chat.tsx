import { useState, useEffect, useCallback  } from 'react';
import { useParams } from 'react-router-dom';
import { postMessageToBackendApi, getNewMessageFromBackendApi, getAllMessagesFromBackendApi } from '../api/api';
import ChatMessages, { Message } from '../components/ChatMessages';
import QuestionInput from '../components/QuestionInput';
import { UserRoles } from '../models/userRoles';
import { checkAndUpdateChatName } from '../utils/chatUtils';
import { ChatHistory } from './Layout';

interface ChatHistoryProps {
    setChatHistories: React.Dispatch<React.SetStateAction<ChatHistory[]>>;
  }

const Chat = ({ setChatHistories }: ChatHistoryProps) => {
    const { id } = useParams<{ id: string }>();
    const chatId = id ? parseInt(id, 10) : 1;
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchChatHistory = useCallback(async () => {
        try {
            const chatHistory = await getAllMessagesFromBackendApi(chatId);
            setMessages(Array.isArray(chatHistory) ? chatHistory : []);
        } catch (error) {
            console.log(error);
        }
    }, [chatId]);
    
    useEffect(() => {
        fetchChatHistory();
    }, [chatId, fetchChatHistory]);

    const onSendTextMessage = async (text: string) => {
        const newMessage: Message = { id: messages.length + 1, content: text, sender: 'user', session: chatId };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setIsLoading(true);

        try {
            checkAndUpdateChatName(chatId, text, setChatHistories);
            await postMessageToBackendApi({ question: text, role: UserRoles.User }, chatId);
            const newMessageBot = await getNewMessageFromBackendApi(chatId);
            setMessages((prevMessages) => [...prevMessages, newMessageBot]);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full my-5 border border-solid mx-20 bg-gray-50 flex flex-col justify-between overflow-hidden border shadow-lg rounded-lg xl:mx-40">
            <ChatMessages messages={messages} loadingAnswer={isLoading} />
            <QuestionInput
                onSend={onSendTextMessage}
                isDisabled={isLoading}
                placeholder='Type a new question'
                clearOnSend
            />
        </div>
    );
}

export default Chat;
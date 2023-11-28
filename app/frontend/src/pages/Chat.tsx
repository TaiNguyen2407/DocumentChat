import { useState, useEffect } from 'react';
import { postMessageToBackendApi, getNewMessageFromBackendApi, getAllMessagesFromBackendApi } from '../api/api';
import { UserRoles } from '../api/models';
import ChatMessages, { Message } from '../components/ChatMessages';
import QuestionInput from '../components/QuestionInput';

const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchChatHistory = async () => {
        try {
            const initialMessages = await getAllMessagesFromBackendApi();
            setMessages(Array.isArray(initialMessages) ? initialMessages : []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchChatHistory();
    }, []);

    const onSendTextMessage = async (text: string) => {
        const newMessage: Message = { id: messages.length + 1, content: text, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setIsLoading(true);

        try {
            await postMessageToBackendApi({ question: text, role: UserRoles.User });
            const newMessageBot = await getNewMessageFromBackendApi();
            setMessages((prevMessages) => [...prevMessages, newMessageBot]);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full my-5 border border-solid mx-20 bg-gray-50 flex flex-col justify-between overflow-hidden border shadow-lg rounded-lg 2xl:mx-60">
            <ChatMessages messages={messages} loadingAnswer={isLoading} />
            <QuestionInput
                onSend={onSendTextMessage}
                isDisabled={isLoading}
                placeholder='Type a new question (e.g. what is this data about?)'
                clearOnSend
            />
        </div>
    );
}

export default Chat;
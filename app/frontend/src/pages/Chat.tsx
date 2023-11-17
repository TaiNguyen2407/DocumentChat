import { useState } from 'react';
import { postMessageToBackendApi, getMessagesFromBackendApi } from '../api/api';
import { UserRoles } from '../api/models';
import ChatMessages, { Message } from '../components/ChatMessages';
import QuestionInput from '../components/QuestionInput';

const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const onSendTextMessage = async (text: string) => {
        const newMessage: Message = { id: messages.length + 1, text, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setIsLoading(true);

        try {
            await postMessageToBackendApi({question: text, role: UserRoles.User})
            const botMessage = await getMessagesFromBackendApi()
            const newMessageBot: Message = { id: messages.length + 2, text: botMessage["content"], sender: botMessage["sender"] };
            setMessages((prevMessages) => [...prevMessages, newMessageBot]);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
      };
    return (
        <div className="h-full border border-solid mx-20 mb-7 bg-[#faf6ec] flex flex-col justify-between overflow-hidden">
            <ChatMessages messages={messages} />
            <QuestionInput 
                onSend={onSendTextMessage} 
                isDisabled={isLoading} 
                placeholder='Type a new question (e.g. what is this data about?)' 
                clearOnSend
            />
        
        </div>
    )
}

export default Chat;
import { useState } from 'react';
import { postMessageToBackendApi } from '../../api/api';
import { UserRoles } from '../../api/models';
import ChatMessages, { Message } from '../../components/ChatMessages/ChatMessages';
import QuestionInput from '../../components/QuestionInput/QuestionInput';
import './Chat.css'

const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const onSendTextMessage = async (text: string) => {
        const newMessage: Message = { id: messages.length + 1, text, sender: 'user' };
        setMessages([...messages, newMessage]);
        try {
            await postMessageToBackendApi({question: text, role: UserRoles.User})
            setIsLoading(true)
        } catch (error) {
            console.log(error);
        }
      };
    return (
        <div className="chat-container">
            <ChatMessages messages={messages} />
            <QuestionInput 
                onSend={onSendTextMessage} 
                isDisabled={false} 
                placeholder='Type a new question (e.g. what is this data about?)' 
                clearOnSend
            />
        
        </div>
    )
}

export default Chat;
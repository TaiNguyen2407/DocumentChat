import { faRobot, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as UserIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon as BotIcon } from "@fortawesome/react-fontawesome";
import "./ChatMessages.css";

export interface Message {
  id?: number;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages = ({messages} : ChatMessagesProps) => {
  	return (
    	<div className="chat-message-container">
      		{messages.map((message) => (
        		<div className="chat-message">
          			{message.sender == "user" ? 
          				<UserIcon icon={faUser} size="xl"  style={{ marginRight: '8px' }}/> : 
					  	<BotIcon icon={faRobot} size="xl" style={{ marginRight: '8px' }}/>
          			}
				<div key={message.id} className={`message ${message.sender}`}>          
					{message.text}
				</div>
        		</div>
      ))}
    </div>
  );
};

export default ChatMessages;

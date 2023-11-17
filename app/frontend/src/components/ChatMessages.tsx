import { faRobot, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as UserIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon as BotIcon } from "@fortawesome/react-fontawesome";

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
    	<div className="h-full w-full flex-1 overflow-y-auto p-4">
      		{messages.map((message) => (
        		<div className="flex flex-row">
          			{message.sender === "user" ? 
          				<UserIcon icon={faUser} size="xl" className="pr-4"/> : 
					  	<BotIcon icon={faRobot} size="xl" className="pl-4"/>
          			}
				<div key={message.id} className={`w-fit mb-2 p-1 rounded ${message.sender === "user" ? "bg-[#007bff] text-[#fff]" : "bg-[#e0e0e0] text-[#000] items-start"}`}>          
					{message.text}
				</div>
        		</div>
      ))}
    </div>
  );
};

export default ChatMessages;

import { faRobot, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as UserIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon as BotIcon } from "@fortawesome/react-fontawesome";

export interface Message {
  id?: number;
  text: string;
  sender: "user" | "assistant";
}

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
    <div className="h-full w-full flex-1 overflow-y-auto p-4">
      {messages.map((message) => (
        <div key={messages.indexOf(message)}>
          {message.sender === "user" ? (
            <div className="flex flex-row">
              <UserIcon icon={faUser} size="2xl" className="pr-4 pt-6 self-end" />
              <div
                key={message.id}
                className={"w-fit max-w-xl mb-4 p-1.5 rounded-tr-lg rounded-tl-lg rounded-br-lg border shadow-lg bg-[#007bff] text-[#fff] text-lg"}
              >
                {message.text}
              </div>
            </div>
          ) : (
            <div className="flex flex-row-reverse">
              <BotIcon icon={faRobot} size="2xl" className="pl-4 pt-6 self-end" />
              <div
                key={message.id}
				className={"w-fit max-w-xl mb-4 p-1.5 rounded-tr-lg rounded-tl-lg rounded-bl-lg bg-[#e0e0e0] text-[#000] text-lg"}
              >
                {message.text}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;

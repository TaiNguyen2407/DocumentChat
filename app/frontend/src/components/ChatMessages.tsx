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
  loadingAnswer: boolean;
}

const ChatMessages = ({ messages, loadingAnswer }: ChatMessagesProps) => {

  return (
    <div className="h-full w-full flex-1 overflow-y-auto p-4">
      {messages.map((message) => (
        <div key={messages.indexOf(message)}>
          {message.sender === "user" ? (
            <div className="flex flex-row">
              <UserIcon
                icon={faUser}
                size="2xl"
                className="pr-4 pt-6 self-end"
              />
              <div
                key={message.id}
                className={
                  "w-fit max-w-xl mb-4 p-1.5 rounded-tr-lg rounded-tl-lg rounded-br-lg border shadow-lg bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r text-[#fff] text-lg"
                }
              >
                {message.text}
              </div>
            </div>
          ) : (
            <div className="flex flex-row-reverse">
              <BotIcon
                icon={faRobot}
                size="2xl"
                className="pl-4 pt-6 self-end"
              />
              <div
                key={message.id}
                className={
                  "w-fit max-w-xl mb-4 p-1.5 rounded-tr-lg rounded-tl-lg rounded-bl-lg bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 text-gray-800 text-lg"
                }
              >
                {message.text}
              </div>
            </div>
          )}
        </div>
      ))}
      {messages[messages.length - 1]?.sender === "user" && loadingAnswer ? (
        <div className="flex flex-row-reverse">
          <BotIcon icon={faRobot} size="2xl" className="pl-4 pt-6 self-end" />
          <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-100 animate-bounce [animation-delay:.7s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-200 animate-bounce [animation-delay:.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-300 animate-bounce [animation-delay:.7s]"></div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ChatMessages;

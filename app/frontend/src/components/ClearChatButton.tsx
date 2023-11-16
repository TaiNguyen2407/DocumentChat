import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as TrashCanIcon } from "@fortawesome/react-fontawesome";

interface ClearChatButtonProps {
    className?: string;
    onClearChat: () => void;
    isDisabled?: boolean;
}

export const ClearChatButton = ({className, onClearChat, isDisabled} : ClearChatButtonProps) => {
    return (
        <div className={`flex flex-row items-start cursor-pointer ${className ?? ""} ${isDisabled && 'opacity-40 pointer-events-none'}`} onClick={onClearChat} >
            <TrashCanIcon icon={faTrashCan} size="2xl" />
            <h4 className="text-lg mt-2">Clear Chat</h4>
        </div>
    )
}
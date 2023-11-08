import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as TrashCanIcon } from "@fortawesome/react-fontawesome";
import "./ClearChatButton.css"

interface ClearChatButtonProps {
    className?: string;
    onClearChat: () => void;
    isDisabled?: boolean;
}

export const ClearChatButton = ({className, onClearChat, isDisabled} : ClearChatButtonProps) => {
    return (
        <div className={`clear-chat-button-container, ${className ?? ""} ${isDisabled && 'clear-chat-button-is-disabled'}`} onClick={onClearChat} >
            <TrashCanIcon icon={faTrashCan} size="2xl" />
            <h4 className="trashcan-text">Clear Chat</h4>
        </div>
    )
}
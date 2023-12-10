import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as TrashCanIcon } from "@fortawesome/react-fontawesome";

/*This type contains props for clearChatButton component */
interface ClearChatButtonProps {
    className?: string;
    onClearChat: () => void;
    isDisabled?: boolean;
}
/*This component is used for clearing the selected chat */
export const ClearChatButton = ({className, onClearChat, isDisabled} : ClearChatButtonProps) => {
    return (
        <div className={`flex flex-row items-start cursor-pointer ${className ?? ""} ${isDisabled && 'opacity-40 pointer-events-none'}`} onClick={onClearChat} >
            <TrashCanIcon icon={faTrashCan} size="2xl" />
            <h4 className="text-lg mt-2">Clear Chat</h4>
        </div>
    )
}
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as UploadDocumentIcon } from "@fortawesome/react-fontawesome";

interface UploadDocumentAreaProps {
    className?: string;
    onUploadDocument: () => void;
}

const UploadDocumentArea = ({className, onUploadDocument} : UploadDocumentAreaProps) => {
    return (
        <div className={`upload-document-area-container, ${className ?? ""} `} onClick={onUploadDocument}>
            <UploadDocumentIcon icon={faFileArrowUp} size={"xl"} />
            <p className="upload-document-area-text">Click to choose a .pdf or .docx</p>
        </div>
    );  
}

export default UploadDocumentArea
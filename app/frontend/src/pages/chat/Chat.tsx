import { ClearChatButton } from '../../components/ClearChatButton/ClearChatButton';
import QuestionInput from '../../components/QuestionInput/QuestionInput';
import UploadDocumentArea from '../../components/UploadDocumentArea/UploadDocumentArea';
import './Chat.css'

const Chat = () => {
    const clearChat = () => {
        console.log("clear chat");
    }

    const uploadDocument = () => {
        console.log("upload document");
    }

    const onSend = () => {
        console.log("send question");
    }
    return (
        <div className="chat-container">
            <ClearChatButton 
                onClearChat={clearChat} 
                isDisabled={false} 
                className="chat-clear-chat-button" 
            />
            {/*
                <div className='chat-main-section'>
                <h1 className="chat-title">Chat with your own data</h1>
                <UploadDocumentArea 
                    onUploadDocument={uploadDocument}  
                    className="chat-upload-document-area" 
                />
            </div>
            */}
            
            <div className='chat-question-input'>
                <QuestionInput 
                    onSend={onSend} 
                    isDisabled={false} 
                    placeholder='Type a new question (e.g. what is this data about?)' 
                    clearOnSend
                />
            </div>
       
        </div>
    )
}

export default Chat;
import { Stack, TextField } from "@fluentui/react"
import { Send28Filled } from "@fluentui/react-icons"
import { useState } from "react"

interface QuestionInputProps {
    onSend: (question: string) => void 
    isDisabled: boolean
    placeholder?: string
    clearOnSend?: boolean
}

const QuestionInput = ({onSend, isDisabled, placeholder, clearOnSend} : QuestionInputProps) => {
    const [question, setQuestion] = useState<string>('');

    const sendQuestion = () => {
        if (isDisabled || !question.trim()) {
            return
        }

        onSend(question);

        if (clearOnSend) {
            setQuestion("");
        }
    };

    const onQuestionChange = (_e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        if (!newValue) {
            setQuestion("")
        } else if (newValue.length <= 1000) {
            setQuestion(newValue);
        }
    }

    const onEnterPress = (e: React.KeyboardEvent<Element>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendQuestion();
        }
    }

    const sendQuestionDisabled = isDisabled || !question.trim();

    return (
        <Stack horizontal className="question-input-container">
            <TextField
                className="question-input-text-area"
                placeholder={placeholder}
                multiline
                resizable={false}
                borderless
                value={question}
                onChange={onQuestionChange}
                onKeyDown={onEnterPress}
            />
            <div className="question-input-buttons-container">
                <div
                    className={`question-input-send-button ${sendQuestionDisabled ?? "question-input-send-button-is-disabled"}`}
                    aria-label="Ask question button"
                    onClick={sendQuestion}
                >
                    <Send28Filled primaryFill="rgba(115, 118, 225, 1)" />
                </div>
            </div>
        </Stack>
    )
}

export default QuestionInput;
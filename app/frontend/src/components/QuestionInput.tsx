import { Stack, TextField } from "@fluentui/react"
import { Send28Filled } from "@fluentui/react-icons"
import { useState } from "react"

/*This object contains props for QuestionInput component. */
interface QuestionInputProps {
    onSend: (question: string) => void 
    isDisabled: boolean
    placeholder?: string
    clearOnSend?: boolean
}

/* This component is used for taking user's question input for posting it to our backend. */
const QuestionInput = ({onSend, isDisabled, placeholder, clearOnSend} : QuestionInputProps) => {
    const [question, setQuestion] = useState<string>('');

    /*Method for posting the question */
    const sendQuestion = () => {
        if (isDisabled || !question.trim()) {
            return
        }

        onSend(question);

        if (clearOnSend) {
            setQuestion("");
        }
    };

    /*Method for handling the question input. */
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
        <Stack horizontal className="rounded-lg shadow-lg bg-white m-8 focus:border-2 focus:border-gray-800">
            <TextField
                id="questionInput"
                className="w-full px-4 leading-6"
                placeholder={placeholder}
                multiline
                resizable={false}
                borderless
                value={question}
                onChange={onQuestionChange}
                onKeyDown={onEnterPress}
            />
            <div className="pr-2">
                <div
                    className={`cursor-pointer mt-4 ${sendQuestionDisabled ?? "opacity-40"}`}
                    aria-label="Ask question button"
                    onClick={sendQuestion}
                >
                    <Send28Filled primaryFill="rgba(115, 118, 225, 1)" className="pr-1" />
                </div>
            </div>
        </Stack>
    )
}

export default QuestionInput;
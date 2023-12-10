import { ChatHistory } from '../pages/Layout';

export const CHAT_FIRST_MESSAGE_KEY = "chatFirstMessage";
export const CHAT_HISTORIES_KEY = "chatHistories";

/*This interface is used for storing the details of first message of a chat. */
export interface FirstMessage {
  chatId: number;
  firstMessageWritten: boolean;
}

/*This method is used to update chat along with the chat history. */
export const updateChat = (chatHistories: ChatHistory[], chatId: number, newName: string) => {
  return chatHistories.map((chat) =>
    chat.id === chatId ? { ...chat, name: newName } : chat
  );
};

/*This method is used for checking and updating the chat name according to the chats. */
export const checkAndUpdateChatName = (
  chatId: number,
  text: string,
) => {
  const storedChatHistoriesJSON = localStorage.getItem(CHAT_HISTORIES_KEY);
  const storedChatHistories = storedChatHistoriesJSON ? JSON.parse(storedChatHistoriesJSON) : [];
  const chatToUpdate = storedChatHistories.find((chat: ChatHistory) => {
    return chat.id === chatId;
  });

  const storedFirstMessageJSON = localStorage.getItem(CHAT_FIRST_MESSAGE_KEY);
  const storedFirstMessage = storedFirstMessageJSON ? JSON.parse(storedFirstMessageJSON) : [];

  if (chatToUpdate && !storedFirstMessage.includes(chatId)) {
    const firstWords = text.split(' ').slice(0, 3).join(' ');
    
    const newChatHistories = updateChat(storedChatHistories, chatId, firstWords);
    localStorage.setItem(CHAT_HISTORIES_KEY, JSON.stringify(newChatHistories));

    const newFirstMessage: FirstMessage = { chatId, firstMessageWritten: true };
    storedFirstMessage.push(newFirstMessage);

    localStorage.setItem(CHAT_FIRST_MESSAGE_KEY, JSON.stringify(storedFirstMessage));
  }
};
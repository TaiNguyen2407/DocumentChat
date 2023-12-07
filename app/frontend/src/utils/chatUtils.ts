import { ChatHistory } from '../pages/Layout';

export const updateChatName = (chatHistories: ChatHistory[], chatId: number, newName: string) => {
  return chatHistories.map((chat) =>
    chat.id === chatId ? { ...chat, name: newName } : chat
  );
};

export const checkAndUpdateChatName = (
  chatId: number,
  text: string,
  setChatHistories: React.Dispatch<React.SetStateAction<ChatHistory[]>>
) => {
  const chatKey = `chat_${chatId}_first_message_sent`;

  const isFirstMessageSent = localStorage.getItem(chatKey) === 'true';

  if (!isFirstMessageSent) {
    const firstWords = text.split(' ').slice(0, 3).join(' ');
    setChatHistories((prevHistories) =>
      prevHistories.map((chat) =>
        chat.id === chatId ? { ...chat, name: firstWords } : chat
      )
    );

    localStorage.setItem(chatKey, 'true');
  }
};
import { ChatHistory } from '../pages/Layout';

export const updateChatName = (chatHistories: ChatHistory[], chatId: number, newName: string) => {
  return chatHistories.map((chat) =>
    chat.id === chatId ? { ...chat, name: newName } : chat
  );
};

export const checkAndUpdateChatName = (
  chatId: number,
  text: string,
) => {
  const chatKey = `chat_${chatId}_first_message_sent`;

  const isFirstMessageSent = localStorage.getItem(chatKey) === 'true';

  if (!isFirstMessageSent) {
    const firstWords = text.split(' ').slice(0, 3).join(' ');

    const storedChatHistoriesJSON = localStorage.getItem('chatHistories');
    const storedChatHistories = storedChatHistoriesJSON ? JSON.parse(storedChatHistoriesJSON) : [];

    const newChatHistories = updateChatName(storedChatHistories, chatId, firstWords);

    localStorage.setItem('chatHistories', JSON.stringify(newChatHistories));

    localStorage.setItem(chatKey, 'true');
  }
};
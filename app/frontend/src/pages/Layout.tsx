
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../resources/images/logo.png";
import { removeFromBrowserMemory } from "../utils/BrowserMemory";
import { Sidebar } from "flowbite-react";
import { IoChatbox, IoLogOut } from "react-icons/io5";
import { FaLayerGroup, FaInfoCircle, FaPlusSquare } from "react-icons/fa";
import { IconContext } from "react-icons";
import { CHAT_HISTORIES_KEY } from "../utils/chatUtils";

export interface ChatHistory {
  id: number;
  name: string;
}

const Layout = () => {
  const navigate = useNavigate();
  const initialId = 1;
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>(() => {
    const storedHistories = localStorage.getItem(CHAT_HISTORIES_KEY);
    return storedHistories
      ? JSON.parse(storedHistories)
      : [
          {
            id: initialId,
            name: `Chat ${initialId}`
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem(CHAT_HISTORIES_KEY, JSON.stringify(chatHistories));
  }, [chatHistories]);

  const logOut = () => {
    try {
      removeFromBrowserMemory("user");
      window.location.reload();
    } catch (e) {
      console.warn("Log out failed", e);
    }
  };

  const createNewChat = () => {
    const newChatId = chatHistories.length + 1;
    const defaultChatName = `Chat ${newChatId}`;
    setChatHistories((prevHistories) => [
      ...prevHistories,
      {
        id: newChatId,
        name: defaultChatName
      },
    ]);
  
    navigate(`/chat/${newChatId}`);
  };

  return (
    <div className="flex flex-row w-full h-full overflow-y-scroll">
      <IconContext.Provider value={{className: 'react-icons'}}>
      <Sidebar className="border shadow-lg" >
        <div className="h-full flex flex-col justify-between overflow-scroll">
          <div>
            <div className="">
              <img src={logo} alt="logo" />
            </div>
            <div className="h-fit">
              <Sidebar.Items>
                <Sidebar.ItemGroup>
                  <Sidebar.Item
                    className=" text-black relative flex justify-start py-2 mb-2 pl-4 text-black text-sm overflow-hidden transition-all duration-400 ease-in-out hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] hover:before:left-0 rounded-lg hover:font-semibold"
                    icon={FaPlusSquare}
                    onClick={createNewChat}
                  >
                    New General Chat
                  </Sidebar.Item>
                  <Sidebar.Item
                    className="relative flex justify-start py-2 mb-2 pl-4 w-full text-black text-sm overflow-hidden transition-all duration-400 ease-in-out hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] hover:before:left-0 rounded-lg hover:font-semibold"
                    icon={IoChatbox}
                    href="/documentChat"
                  >
                    New Document Chat
                  </Sidebar.Item>
                  <Sidebar.Collapse label="Recent Chats" icon={FaLayerGroup} className="relative flex justify-start py-2 mb-2 pl-4 w-full text-black text-sm overflow-hidden transition-all duration-400 ease-in-out hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] hover:before:left-0 rounded-lg hover:font-semibold">
                    {chatHistories.map((chat) => (
                      <Sidebar.Item key={chat.id} href={`/chat/${chat.id}`}>
                        {chat.name}
                      </Sidebar.Item>
                    ))}
                  </Sidebar.Collapse>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </div>
          </div>

          <div>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="/info"
                className="relative flex justify-start py-2 mb-2 pl-4 w-full text-black text-sm overflow-hidden transition-all duration-400 ease-in-out hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] hover:before:left-0 rounded-lg hover:font-semibold"
                icon={FaInfoCircle}
              >
                Info
              </Sidebar.Item>
              <Sidebar.Item
                className="relative flex justify-start py-2 mb-2 pl-4 w-full text-black text-sm overflow-hidden transition-all duration-400 ease-in-out hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] hover:before:left-0 rounded-lg hover:font-semibold"
                onClick={logOut}
                icon={IoLogOut}
              >
                Log out
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </div>
        </div>
      </Sidebar>
      <div className="flex flex-col w-full h-full bg-gradient-to-tl from-gray-900 to-gray-600 bg-gradient-to-r overflow-scroll">
        <Outlet />
      </div>
      </IconContext.Provider>
    </div>
  );
};

export default Layout;

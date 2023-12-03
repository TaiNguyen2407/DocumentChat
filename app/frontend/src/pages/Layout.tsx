import {
  faBars,
  faCircleInfo,
  faMessage,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as HamburgerMenuIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon as ChatIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon as InfoIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon as LogOutIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, Outlet } from "react-router-dom";
import logo from "../resources/images/logo.png";
import { removeFromBrowserMemory } from "../utils/browserMemory";

const CHAT_HISTORIES_KEY = "chatHistories";

export interface ChatHistory {
  id: number;
  name: string;
}

const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const initialId = 1;
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>(() => {
    const storedHistories = localStorage.getItem(CHAT_HISTORIES_KEY);
    return storedHistories ? JSON.parse(storedHistories) : [
      {
        id: initialId,
        name: `Chat ${initialId}`,
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem(CHAT_HISTORIES_KEY, JSON.stringify(chatHistories));
  }, [chatHistories]);

  const collapseHamburgerMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  const logOut = () => {
    try {
      removeFromBrowserMemory("user");
      window.location.reload();
    } catch (e) {
      console.warn("Log out failed", e);
    }
  };


  const createNewChat = () => {
    setChatHistories((prevHistories) => [
      ...prevHistories,
      {
        id: prevHistories.length + 1,
        name: `Chat ${prevHistories.length + 1}`,
      },
    ]);
  };

  return (
    <div className="flex flex-row w-full h-full">
      <Sidebar collapsed={isCollapsed} className="border shadow-lg">
        <div className="h-full flex flex-col justify-between overflow-hidden">
          <div>

            <div className="border-b shadow-lg">
              <img src={logo} alt="logo" />
            </div>

            <div>
              <Menu>
                <MenuItem
                  icon={<HamburgerMenuIcon icon={faBars} />}
                  onClick={collapseHamburgerMenu}
                />
                <MenuItem
                  icon={<ChatIcon icon={faMessage} />}
                  component={<Link to="/" />}
                >
                  Chat
                </MenuItem>
                <MenuItem
                  icon={<ChatIcon icon={faMessage} />}
                  component={<Link to="/documentChat" />}
                >
                  Document Chat
                </MenuItem>
                    <MenuItem onClick={createNewChat}>
                      New Chat
                    </MenuItem>
                    {chatHistories.map((chat) => (
                      <MenuItem 
                        icon={<ChatIcon icon={faMessage} /> } 
                        key={chat.id} 
                        component={<Link to={`/chat/${chat.id}`} />}>
                        {chat.name}
                      </MenuItem>
                  ))}
              </Menu>
            </div>
          </div>
          
          <div>
            <Menu>
              <MenuItem
                icon={<InfoIcon icon={faCircleInfo} />}
                component={<Link to="/info" />}
              >
                Info
              </MenuItem>
            </Menu>
            <button
              className="relative flex justify-start py-2 mb-2 pl-8 w-full text-black text-sm overflow-hidden transition-all duration-400 ease-in-out hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] hover:before:left-0"
              onClick={() => logOut()}
            >
              <LogOutIcon icon={faRightFromBracket} className="pr-2 pt-1" />
              Log out
            </button>
          </div>

        </div>
      </Sidebar>
      <div className="flex flex-col w-full h-full bg-gradient-to-tl from-gray-900 to-gray-600 bg-gradient-to-r overflow-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

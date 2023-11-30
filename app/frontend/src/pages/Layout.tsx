import {
  faBars,
  faCircleInfo,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as HamburgerMenuIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon as ChatIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon as InfoIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, Outlet } from "react-router-dom";
import logo  from "../resources/images/logo.png"

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
        <div className="h-full border flex flex-col justify-between overflow-hidden">
          <div>

            <div className="border-b shadow-lg">
              <img src={logo} alt="logo" />
            </div>

            <div>
                <Menu>
                    <MenuItem icon={<HamburgerMenuIcon icon={faBars} />} onClick={collapseHamburgerMenu}  />
                    <MenuItem icon={<ChatIcon icon={faMessage} /> } component={<Link to='/'/>}> 
                        Chat
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
                  <MenuItem icon={<InfoIcon icon={faCircleInfo} />} component={<Link to='/info' />}> 
                      Info
                  </MenuItem>
              </Menu>
          </div>

        </div>
      </Sidebar>
      <div className="flex flex-col w-full h-full bg-gradient-to-r from-gray-200 to-gray-100 overflow-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

import { faBars, faCircleInfo, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as HamburgerMenuIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon as ChatIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon as InfoIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const collapseHamburgerMenu = () => {
        setIsCollapsed(!isCollapsed);
    }
    return (
        <div className="flex flex-row w-full h-full">
            <Sidebar collapsed={isCollapsed} className="border shadow-lg">
                {!isCollapsed ? (
                    <h1 className="text-2xl font-extrabold py-4 pl-4 border-b shadow-lg ease-linear delay-750">Document Chat</h1>
                ) : (<></>)
                }
                <Menu>
                    <MenuItem icon={<HamburgerMenuIcon icon={faBars} />} onClick={collapseHamburgerMenu}  />
                    <MenuItem icon={<ChatIcon icon={faMessage} /> } component={<Link to='/'/>}> 
                        Chat
                    </MenuItem>
                    <MenuItem icon={<InfoIcon icon={faCircleInfo} />} component={<Link to='/info' />}> 
                        Info
                    </MenuItem>
                </Menu>
            </Sidebar>
            <div className="flex flex-col w-full h-full bg-gradient-to-r from-gray-200 to-gray-100">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;
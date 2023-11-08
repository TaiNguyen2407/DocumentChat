import { faBars, faCircleInfo, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as HamburgerMenuIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon as ChatIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon as InfoIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, Outlet } from "react-router-dom";
import './Layout.css'

const Layout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const collapseHamburgerMenu = () => {
        setIsCollapsed(!isCollapsed);
    }
    return (
        <div className="root-layout">
            <Sidebar collapsed={isCollapsed}>
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
            <div className="layout">
                <header className="layout-header">
                    <h1>Document Chat Application</h1>
                </header>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;
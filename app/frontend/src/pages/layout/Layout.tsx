import { faBars, faCircleInfo, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as HamburgerMenuIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon as ChatIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon as InfoIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import './Layout.css'

const Layout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const collapseHamburgerMenu = () => {
        setIsCollapsed(!isCollapsed);
    }
    return (
      <div className="layout">
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
      </div>
    )
}

export default Layout;
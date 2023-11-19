import {
  faBars,
  faCircleInfo,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as HamburgerMenuIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon as ChatIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon as InfoIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, Outlet } from "react-router-dom";
import logo  from "../resources/images/logo.png"

const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const collapseHamburgerMenu = () => {
    setIsCollapsed(!isCollapsed);
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

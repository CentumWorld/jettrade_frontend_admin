
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaAngleDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function AdminSideBarMenu({ route, isOpen, toggleSidebar }) {
  console.log("Sidebar Toggle", toggleSidebar);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleMenuClick = () => {
    toggleSidebar();
    toggleMenu();
  };
  return (
    <>
      <div className="admin_menu" onClick={toggleMenu}>
        <div className="admin_menu_item">
          <div className="admin-icon">{route.icon}</div>
          {isOpen && (
            <motion.div className="admin_link_text">{route.name}</motion.div>
          )}
        </div>
        {isOpen && (
          <motion.div animate={isMenuOpen ? { rotate: -180 } : { rotate: 0 }}>
            <FaAngleDown />
          </motion.div>
        )}
      </div>
      {isMenuOpen && (
        <div className="admin_menu_container">
          {route.subRoutes.map((subRoutes, i) => {
            return (
              <NavLink
                to={subRoutes.path}
                key={subRoutes.name}
                className="admin_sidebar_link"
              >
                <div className="admin-icon" onClick={toggleMenuClick}>
                  {subRoutes.icon}
                </div>
                {isOpen && (
                  <motion.div
                    className="admin_link_text"
                    onClick={toggleMenuClick}
                  >
                    {subRoutes.name}
                  </motion.div>
                )}
              </NavLink>
            );
          })}
        </div>
      )}
    </>
  );
}

export default AdminSideBarMenu;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../AdminSideBar/AdminSideBar.css";
import { NavLink } from "react-router-dom";
import AdminSideBarMenu from "./AdminSideBarMenu";
import Adminroutes from "../../../utils/AdminRoutes";
import stateAdminRoutes from "../../../utils/StateAdminRoutes";
import subAdminRoutes from "../../../utils/SubAdminRoutes";
import franchiseAdminRoutes from "../../../utils/FranchiseRoutes";
import {FaBars} from "react-icons/fa";
import BussinessDeveloperRoutes from "../../../utils/BussinessDeveloperRoutes";

function AdminSideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState("");
  
  const isSubAdmin = localStorage.getItem("subAdminToken");
  const isStateHandler = localStorage.getItem("stateHandlerToken");
  const isAdmin  = localStorage.getItem("adminToken");
  const isBussinessDeveloper = localStorage.getItem("bussinessAdminToken");
  const isFranchise = localStorage.getItem("franchiseToken")

  const updateUser = () => {
    if(isSubAdmin){
      setUser("Sub Admin");
    } else if(isStateHandler){
      setUser("State Admin");
    } else if(isAdmin){
      setUser("Admin");
    }else if(isBussinessDeveloper){
      setUser("Bussiness Developer");
    } else if(isFranchise){
      setUser("Franchise Admin")
    }
  }

  useEffect(() => {
    updateUser();
  }, [])


  const toggle = () => setIsOpen(!isOpen);
  const userid = localStorage.getItem("userid");
  return (
    <div className="admin-sidebar-main-container">
      <motion.div
        animate={{ width: isOpen ? "350px" : "50px" }}
        className="admin-sidebar"
      >
        <div className="admin-top-section">
          {isOpen && (
            <h1 className="admin_logo">{user}</h1>
          )}
          {isOpen && <div>{isSubAdmin ? <small>{userid}</small> : ""}</div>}

          {/* <h1 className="">Badal</h1> */}
          <div className="admin-bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {
          isAdmin && (
            <section className="admin_routes">
              {Adminroutes.map((route) => {
                if (route.subRoutes) {
                  return <AdminSideBarMenu isOpen={isOpen} route={route} />;
                }
                return (
                  <NavLink
                    to={route.path}
                    key={route.name}
                    className={
                      isOpen ? "admin_sidebar_link" : "admin_sidebar_link_small"
                    }
                  >
                    <div className="admin-icon">{route.icon}</div>
                    <motion.div className="admin_link_text">
                      {route.name}
                    </motion.div>
                  </NavLink>
                );
              })}
            </section>
          )
        }
        {
          isStateHandler && (
            <section className="admin_routes">
              {stateAdminRoutes.map((route) => {
                if (route.subRoutes) {
                  return <AdminSideBarMenu isOpen={isOpen} route={route} />;
                }
                return (
                  <NavLink
                    to={route.path}
                    key={route.name}
                    className={
                      isOpen ? "admin_sidebar_link" : "admin_sidebar_link_small"
                    }
                  >
                    <div className="admin-icon">{route.icon}</div>
                    <motion.div className="admin_link_text">
                      {route.name}
                    </motion.div>
                  </NavLink>
                );
              })}
            </section>
          )
        }
        {
          isSubAdmin && (
            <section className="admin_routes">
              {subAdminRoutes.map((route) => {
                if (route.subRoutes) {
                  return <AdminSideBarMenu isOpen={isOpen} route={route} />;
                }
                return (
                  <NavLink
                    to={route.path}
                    key={route.name}
                    className={
                      isOpen ? "admin_sidebar_link" : "admin_sidebar_link_small"
                    }
                  >
                    <div className="admin-icon">{route.icon}</div>
                    <motion.div className="admin_link_text">
                      {route.name}
                    </motion.div>
                  </NavLink>
                );
              })}
            </section>
          )
        }
        {
          isFranchise && (
            <section className="admin_routes">
              {franchiseAdminRoutes.map((route) => {
                if (route.subRoutes) {
                  return <AdminSideBarMenu isOpen={isOpen} route={route} />;
                }
                return (
                  <NavLink
                    to={route.path}
                    key={route.name}
                    className={
                      isOpen ? "admin_sidebar_link" : "admin_sidebar_link_small"
                    }
                  >
                    <div className="admin-icon">{route.icon}</div>
                    <motion.div className="admin_link_text">
                      {route.name}
                    </motion.div>
                  </NavLink>
                );
              })}
            </section>
          )
        }
        {
          isBussinessDeveloper && (
            <section className="admin_routes">
              {BussinessDeveloperRoutes.map((route) => {
                if (route.subRoutes) {
                  return <AdminSideBarMenu isOpen={isOpen} route={route} />;
                }
                return (
                  <NavLink
                    to={route.path}
                    key={route.name}
                    className={
                      isOpen ? "admin_sidebar_link" : "admin_sidebar_link_small"
                    }
                  >
                    <div className="admin-icon">{route.icon}</div>
                    <motion.div className="admin_link_text">
                      {route.name}
                    </motion.div>
                  </NavLink>
                );
              })}
            </section>
          )
        }
      </motion.div>
    </div>
  );
}

export default AdminSideBar;

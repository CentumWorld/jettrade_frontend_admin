import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../AdminSideBar/AdminSideBar.css";
import { NavLink } from "react-router-dom";
import AdminSideBarMenu from "./AdminSideBarMenu";
import Adminroutes from "../../../utils/AdminRoutes";
import stateAdminRoutes from "../../../utils/StateAdminRoutes";
import subAdminRoutes from "../../../utils/SubAdminRoutes";
import franchiseAdminRoutes from "../../../utils/FranchiseRoutes";
import { FaBars } from "react-icons/fa";
import BussinessDeveloperRoutes from "../../../utils/BussinessDeveloperRoutes";
import VideoCreatorRoutes from "../../../utils/VideoCreator"
import baseUrl from "../../../baseUrl";


const apiurl = baseUrl.apiUrl;

function AdminSideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  console.log("name ===> ", name)

  const isSubAdmin = localStorage.getItem("subAdminToken");
  const isStateHandler = localStorage.getItem("stateHandlerToken");
  const isAdmin = localStorage.getItem("adminToken");
  const isBussinessDeveloper = localStorage.getItem("bussinessAdminToken");
  const isFranchise = localStorage.getItem("franchiseToken");
  const isCreatorVideo = localStorage.getItem("videoCreatorToken");

  const isStateHandlerToken = localStorage.getItem("stateHandlerToken");
  const isFrachiseToken = localStorage.getItem("franchiseToken");
  const isBussinessDeveloperToken = localStorage.getItem("bussinessAdminToken");

  useEffect(() => {
    if (isStateHandlerToken) {
      async function fetchStateDetails() {
        try {
          const response = await fetch(`${apiurl}`+"/state/get-own-state-details", {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${isStateHandlerToken}`,
            },
          });
          const data = await response.json();
          setName(data.data.fname);
        } catch (error) {
          console.error("Error fetching state details", error);
        }
      }
      fetchStateDetails();
    } else if (isFrachiseToken) {
      async function fetchFracnhiseDetails() {
        try {
          const response = await fetch(`${apiurl}`+"/franchise/get-own-franchise-details", {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${isFrachiseToken}`,
            },
          });
          const data = await response.json();
          setName(data.data.fname);
        } catch (error) {
          console.error("Error fetching state details", error);
        }
      }
      fetchFracnhiseDetails();
    } else if (isBussinessDeveloperToken) {
      async function fetchBussinessDetails() {
        try {
          const response = await fetch(
            `${apiurl}`+ "/businessDeveloper/get-own-business-developer-details",
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${isBussinessDeveloperToken}`,
              },
            }
          );
          const data = await response.json();
          setName(data.data.fname);
        } catch (error) {
          console.error("Error fetching state details", error);
        }
      }


      fetchBussinessDetails();
    }
  }, [isStateHandlerToken, isBussinessDeveloperToken, isFrachiseToken]);

  const updateUser = () => {
    if (isSubAdmin) {
      setUser("Back Office");
    } else if (isStateHandler) {
      setUser(name);
    } else if (isAdmin) {
      setUser("Admin");
    } else if (isBussinessDeveloper) {
      setUser(name);
    } else if (isFranchise) {
      setUser(name)
    } else if(isCreatorVideo){
      setUser(name)
    }
  };

  useEffect(() => {
    updateUser();
  }, []);

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
            <h5 className="admin_logo">{name || user}</h5>
          )}
          {isOpen && <div>{isSubAdmin ? <small>{userid}</small> : ""}</div>}

          {/* <h1 className="">Badal</h1> */}
          <div className="admin-bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {isAdmin && (
          <section className="admin_routes">
            {/* {Adminroutes.map((route) => {
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
              })} */}
            {Adminroutes.map((route) => {
              if (route.subRoutes) {
                return <AdminSideBarMenu isOpen={isOpen} route={route} />;
              }
              if (route.externalLink) {
                // For the "CENTUMO Swap" link, open in a new tab
                return (
                  <a
                    href={route.path}
                    key={route.name}
                    className={
                      isOpen ? "admin_sidebar_link" : "admin_sidebar_link_small"
                    }
                    target="_blank" // This will open "CENTUMO Swap" in a new tab
                    rel="noopener noreferrer" // Recommended for security
                  >
                    <div className="admin-icon">{route.icon}</div>
                    <motion.div className="admin_link_text">
                      {route.name}
                    </motion.div>
                  </a>
                );
              }
              // For other links, open in the same page using NavLink
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
        )}
        {isStateHandler && (
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
        )}
        {isSubAdmin && (
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
        )}
        {isFranchise && (
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
        )}
        {isBussinessDeveloper && (
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
        )}
        {isCreatorVideo && (
          <section className="admin_routes">
            {VideoCreatorRoutes.map((route) => {
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
        )}
      </motion.div>
    </div>
  );
}

export default AdminSideBar;

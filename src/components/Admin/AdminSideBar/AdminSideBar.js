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
import VideoCreatorRoutes from "../../../utils/VideoCreator";
import baseUrl from "../../../baseUrl";
import { BsBellFill } from "react-icons/bs";
import { Badge, Modal } from "antd";
import axios from "axios";

const apiurl = baseUrl.apiUrl;

function AdminSideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [openNotificationModal, setOpenNotificationModal] = useState(false);
  const [allNotification, setAllNotification] = useState([]);
  const [allStateNotification, setAllStateNotification] = useState([]);
  const [particularStateNotification, setParticularStateNotification] =
    useState([]);
  const [notification, setNotification] = useState(0);
  const openModal = () => {
    
  };

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
          const response = await fetch(
            `${apiurl}` + "/state/get-own-state-details",
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${isStateHandlerToken}`,
              },
            }
          );
          const data = await response.json();
          setName(data.data.fname);
          setNotification(data.data.notification);
        } catch (error) {
        
        }
      }
      fetchStateDetails();
    } else if (isFrachiseToken) {
      async function fetchFracnhiseDetails() {
        try {
          const response = await fetch(
            `${apiurl}` + "/franchise/get-own-franchise-details",
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${isFrachiseToken}`,
              },
            }
          );
          const data = await response.json();
          setName(data.data.fname);
          setNotification(data.data.notification);
      
        } catch (error) {
         
        }
      }
      fetchFracnhiseDetails();
    } else if (isBussinessDeveloperToken) {
      async function fetchBussinessDetails() {
        try {
          const response = await fetch(
            `${apiurl}` +
            "/businessDeveloper/get-own-business-developer-details",
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
          setNotification(data.data.notification);
        } catch (error) {
          
        }
      }

      fetchBussinessDetails();
    }
  }, [isStateHandlerToken, isBussinessDeveloperToken, isFrachiseToken]);

  // callApiToFetchAllNotification
  const callApiToFetchAllNotification = () => {
    const token = localStorage.getItem("stateHandlerToken") || localStorage.getItem("franchiseToken");

    const stateHandlerId = localStorage.getItem("stateHandlerId");
    const frenchiseId = localStorage.getItem('frenchiseId')
    const data = { stateHandlerId };
    const data1 ={frenchiseId}
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (isStateHandler) {
      axios
        .post(`${apiurl}` + "/state/state/fetch-state-notification", data, config)
        .then((result) => {
          setAllNotification(result.data.allNotitfication);
          setAllStateNotification(result.data.allShoNotification);
          setParticularStateNotification(result.data.particularState);
        })
        .catch((err) => {
         
        });
    }
    if(isFrachiseToken){
      axios
        .post(`${apiurl}` + "/franchise/frenchise/fetch-franchise-notification", data1, config)
        .then((result) => {
          setAllNotification(result.data.allNotitfication);
          setAllStateNotification(result.data.allFranchiseNotification);
          setParticularStateNotification(result.data.particularFranchise);
        })
        .catch((err) => {
          
        });
    }
  };

  // setNotificationFalse
  const setNotificationFalse = () => {
    const stateHandlerId = localStorage.getItem("stateHandlerId") ;
    const frenchiseId = localStorage.getItem('frenchiseId')
    const token = localStorage.getItem("stateHandlerToken") || localStorage.getItem("franchiseToken");
    const data = {
      stateHandlerId: stateHandlerId,
    };
    const data1 = {
      frenchiseId : frenchiseId
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if(isStateHandler){
      axios
      .post(
        `${apiurl}` + "/state/state/set-notification-to-false-state",
        data,
        config
      )
      .then((res) => {
        setNotification(data.data.notification);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    if(isFrachiseToken){
      axios
      .post(
        `${apiurl}` + "/franchise/frenchise/set-notification-to-false-franchise",
        data1,
        config
      )
      .then((res) => {
        setNotification(data.data.notification);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  // ---bell icon work
  const clickOnBell = () => {
    setOpenNotificationModal(true);
    callApiToFetchAllNotification();
     setNotificationFalse();
  };

  //handle all notification
  const handleOk = () => {
    setOpenNotificationModal(false);
  };
  // --------

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
      setUser(name);
    } else if (isCreatorVideo) {
      setUser(name);
    }
  };

  useEffect(() => {
    updateUser();
  }, []);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let width;

  if (isOpen && windowWidth < 768) {
    width = "100vw";
  } else if ((!isOpen && windowWidth > 768) || (!isOpen && windowWidth < 768)) {
    width = "50px";
  } else {
    width = "350px";
  }

  const toggle = () => setIsOpen((prev) => !prev);
  const userid = localStorage.getItem("userid");

  const options = {
    timeZone: "Asia/Kolkata",
    year: "2-digit",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
  };
  return (

    <>

      <div className="user-notification">
        <Modal
          title={<h6 style={{ color: '#007BFF', fontWeight: 700, fontFamily: "'Roboto',sans-serif", fontSize: '20px' }}>Notifications</h6>}
          className="user-notification-title"
          open={openNotificationModal}
          onOk={handleOk}
          onCancel={handleOk}
          footer={null}
          style={{ cursor: "pointer" }}
        >
          <p className="user-general-notification" style={{ color: '#0000FF', fontWeight: 'bold' }}>General Notification</p>
          <div className="user-general-notification-section">
            {allNotification.map((object) => (
              <li key={object.id}>
                {" "}
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <BsBellFill />
                    &nbsp;{object.message}
                  </div>
                  <div>
                    {new Date(object.date).toLocaleString("en-IN", options)}
                  </div>{" "}
                </div>
              </li>
            ))}
          </div>
          <br />
          <p className="for-traders-notification" style={{ color: '#A52A2A', fontWeight: 'bold' }}>For State Handlers(SHO)</p>
          <div className="for-traders-notification-section">
            {allStateNotification.map((object) => (
              <li key={object.id}>
                {" "}
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <BsBellFill />
                    &nbsp;{object.message}
                  </div>
                  <div>
                    {new Date(object.date).toLocaleString("en-IN", options)}
                  </div>{" "}
                </div>
              </li>
            ))}
          </div>
          <br />
          <p className="for-trader-only-notification" style={{ color: 'blueviolet', fontWeight: 'bold' }}>For You Only</p>
          <div className="for-trader-only-notification-section">
            {particularStateNotification.map((object) => (
              <li key={object.id}>
                {" "}
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <BsBellFill />
                    &nbsp;{object.message}
                  </div>
                  <div>
                    {new Date(object.date).toLocaleString("en-IN", options)}
                  </div>{" "}
                </div>
              </li>
            ))}
          </div>
        </Modal>
      </div>


      <div className="admin-sidebar-main-container" style={{ width: width }}>
        <div className="admin-sidebar" style={{ width: width }}>
          <div className="admin-top-section">
            {isOpen && <h5 className="admin_logo">{name || user}</h5>}
            {isOpen && <div>{isSubAdmin ? <small>{userid}</small> : ""}</div>}

            {/* <h1 className="">Badal</h1> */}
            <div className="notification">
             {(!isAdmin && !isSubAdmin) &&  (
              <Badge count={notification} >
                {isOpen && (
                  <BsBellFill
                    onClick={clickOnBell}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </Badge>
             )}
            </div>
        

            <div className="admin-bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          {isAdmin && (
            <section className="admin_routes">
              {Adminroutes.map((route) => {
                if (route.subRoutes) {
                  return (
                    <AdminSideBarMenu
                      isOpen={isOpen}
                      route={route}
                      toggleSidebar={toggle}
                    />
                  );
                }
                if (route.externalLink) {
                  return (
                    <a
                      onClick={toggle}
                      href={route.path}
                      key={route.name}
                      className={
                        isOpen ? "admin_sidebar_link" : "admin_sidebar_link_small"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="admin-icon">{route.icon}</div>
                      <div className="admin_link_text" onClick={toggle}>
                        {route.name}
                      </div>
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
                    onClick={toggle}
                  >
                    <div className="admin-icon">{route.icon}</div>
                    <div className="admin_link_text" onClick={toggle}>
                      {route.name}
                    </div>
                  </NavLink>
                );
              })}
            </section>
          )}
          {isStateHandler && (
            <section className="admin_routes">
              {stateAdminRoutes.map((route) => {
                if (route.subRoutes) {
                  return (
                    <AdminSideBarMenu
                      isOpen={isOpen}
                      route={route}
                      onClick={toggle}
                    />
                  );
                }
                if (route.externalLink) {
                
                  return (
                    <a
                      href={route.path}
                      key={route.name}
                      className={
                        isOpen ? "admin_sidebar_link" : "admin_sidebar_link_small"
                      }
                      target="_blank" 
                      rel="noopener noreferrer" 
                    >
                      <div className="admin-icon">{route.icon}</div>
                      <motion.div className="admin_link_text" onClick={toggle}>
                        {route.name}
                      </motion.div>
                    </a>
                  );
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
                    <motion.div className="admin_link_text" onClick={toggle}>
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
                  return (
                    <AdminSideBarMenu
                      isOpen={isOpen}
                      route={route}
                      onClick={toggle}
                    />
                  );
                }
                if (route.externalLink) {
                  
                  return (
                    <a
                      href={route.path}
                      key={route.name}
                      className={
                        isOpen ? "admin_sidebar_link" : "admin_sidebar_link_small"
                      }
                      target="_blank" 
                      rel="noopener noreferrer" 
                    >
                      <div className="admin-icon">{route.icon}</div>
                      <motion.div className="admin_link_text" onClick={toggle}>
                        {route.name}
                      </motion.div>
                    </a>
                  );
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
                    <motion.div className="admin_link_text" onClick={toggle}>
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
                  return (
                    <AdminSideBarMenu
                      isOpen={isOpen}
                      route={route}
                      onClick={toggle}
                    />
                  );
                }
                if (route.externalLink) {
                  
                  return (
                    <a
                      href={route.path}
                      key={route.name}
                      className={
                        isOpen ? "admin_sidebar_link" : "admin_sidebar_link_small"
                      }
                      target="_blank" 
                      rel="noopener noreferrer" 
                    >
                      <div className="admin-icon">{route.icon}</div>
                      <motion.div className="admin_link_text" onClick={toggle}>
                        {route.name}
                      </motion.div>
                    </a>
                  );
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
                    <motion.div className="admin_link_text" onClick={toggle}>
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
                  return (
                    <AdminSideBarMenu
                      isOpen={isOpen}
                      route={route}
                      onClick={toggle}
                    />
                  );
                }
                if (route.externalLink) {
                 
                  return (
                    <a
                      href={route.path}
                      key={route.name}
                      className={
                        isOpen ? "admin_sidebar_link" : "admin_sidebar_link_small"
                      }
                      target="_blank" 
                      rel="noopener noreferrer" 
                    >
                      <div className="admin-icon">{route.icon}</div>
                      <motion.div className="admin_link_text" onClick={toggle}>
                        {route.name}
                      </motion.div>
                    </a>
                  );
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
                    <motion.div className="admin_link_text" onClick={toggle}>
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
                  return (
                    <AdminSideBarMenu
                      isOpen={isOpen}
                      route={route}
                      onClick={toggle}
                    />
                  );
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
                    <motion.div className="admin_link_text" onClick={toggle}>
                      {route.name}
                    </motion.div>
                  </NavLink>
                );
              })}
            </section>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminSideBar;

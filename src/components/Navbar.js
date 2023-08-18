import React, { useContext, useState } from "react";
import "../css/Navbar.css";
import { NavLink } from "react-router-dom";
import { UserContext } from "../App";
import UserRegistration from "./UserRegistration";
import AdminLogin from "./AdminLogin";
import UserLogin from "./UserLogin";
import Button from "react-bootstrap/Button";
import logo from "./../img/logo1.png";
import { RiLogoutBoxLine, RiLogoutCircleFill } from "react-icons/ri";
import { Dropdown, Menu } from "antd";
import SubAdmin from "./SubLoginAdmin";
import StateAdminLogin from "./StateAdminLogin";

function Navbar() {
  const { state, dispatch } = useContext(UserContext);
  const login = localStorage.getItem("login");

  const [userShow, setUserShow] = useState(false);
  const [adminShow, setAdminShow] = useState(false);
  const [subAdminShow, setSubAdminShow] = useState(false);
  const [stateOfficerShow, setStateOfficerShow] = useState(false);

  const openUserLoginFuction = () => setUserShow(true);
  const pull_data = (data) => setUserShow(data);

  const pull_addmin = (data) => setAdminShow(data);
  const pullsubadmin = (data) => setSubAdminShow(data);
  const pullSho = (data) => setStateOfficerShow(data);

  const RenderMenu = () => {


    const adminSubAdminModal = (e) =>{
      if(e.key === 'admin'){
        setAdminShow(true)
      }
      if(e.key=== "subadmin"){
        setSubAdminShow(true);
      }
      if(e.key=== "sho"){
        setStateOfficerShow(true);
      }
    }
    const menu = (
      <Menu onClick={adminSubAdminModal}>
        <Menu.Item key="admin">Admin</Menu.Item>
        <Menu.Item key="subadmin">Sub Admin</Menu.Item>
        <Menu.Item key="sho">State Head Officer</Menu.Item>
        <Menu.Item key="frenchiese">Franchise</Menu.Item>
        <Menu.Item key="trader">Trader</Menu.Item>
        <Menu.Item key="refferal">Refferal</Menu.Item>
      </Menu>
    );

    
    if (login) {
      return (
        <>
          <li className="nav-item">
            <NavLink
              className="btn rounded btn-outline-primary rounded-pill"
              to="/logout"
              aria-current="page"
              style={{ marginRight: "1rem", display: 'flex', alignItems: 'center', gap: '.5rem', width: "max-content" }}
            >
              Logout
              <RiLogoutBoxLine style={{ height: '1rem', width: '1rem' }} />
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            {/* <button className=" btn rounded btn-outline-primary rounded-pill" data-bs-toggle="modal" data-bs-target="#adminLogin" aria-current="page">Admin</button> */}
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button
                variant=" btn rounded btn-outline-primary rounded-pill"
                //onClick={openAdminLoginFuction}
              >
                Login
              </Button>
            </Dropdown>

          </li>
          &nbsp;&nbsp;
        </>
      );
    }
  };

  return (
    <>
      <nav className="navbar navbar-box navbar-expand-lg navbar-light bg-light">
        {/* <div className="container-fluid"> */}
        <div className="navbar-brand">
          <div>
            <h3>JETTRADE FX </h3>
          </div>
          <div>
            <img src={logo} alt="" style={{ width: "100px", height: "35px" }} />
          </div>
          <div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <RenderMenu />
          </ul>
        </div>

        {/* Admin Login */}
        {adminShow ? <AdminLogin adminFunc={pull_addmin} /> : ""}
        {subAdminShow ? <SubAdmin subadminfunc={pullsubadmin}/> : ""}
        {stateOfficerShow ? <StateAdminLogin stateLoginFunc={pullSho}/> : ""}
      </nav>
    </>
  );
}

export default Navbar;

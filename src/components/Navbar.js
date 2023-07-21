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

function Navbar() {
  const { state, dispatch } = useContext(UserContext);
  const login = localStorage.getItem("login");

  const [userShow, setUserShow] = useState(false);
  const [adminShow, setAdminShow] = useState(false);

  const openUserLoginFuction = () => setUserShow(true);
  const pull_data = (data) => setUserShow(data);

  const openAdminLoginFuction = () => setAdminShow(true);
  const pull_addmin = (data) => setAdminShow(data);

  const RenderMenu = () => {
    if (login) {
      return (
        <>
          <li className="nav-item">
            <NavLink
              className="btn rounded btn-outline-primary rounded-pill"
              to="/logout"
              aria-current="page"
              style={{ marginRight: "1rem", display:'flex', alignItems:'center', gap:'.5rem', width:"max-content"}}
            >
              Logout
              <RiLogoutBoxLine style={{height:'1rem', width:'1rem'}}/>
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            {/* <button className=" btn rounded btn-outline-primary rounded-pill" data-bs-toggle="modal" data-bs-target="#adminLogin" aria-current="page">Admin</button> */}
            <Button
              variant=" btn rounded btn-outline-primary rounded-pill"
              onClick={openAdminLoginFuction}
            >
              Admin
            </Button>
          </li>
          &nbsp;&nbsp;
          {/* <li className="nav-item">
                       
                        <Button variant=" btn rounded btn-outline-primary rounded-pill" onClick={openUserLoginFuction}>
                            User
                        </Button>
                       
                    </li> */}
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
              <span className="navbar-toggler-icon"/>
            </button>
          </div>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <RenderMenu />
          </ul>
        </div>
        {/* </div> */}
        {/* {userShow?
                    <UserLogin func={pull_data}/>:''

                } */}

        {/* Admin Login */}
        {adminShow ? <AdminLogin adminFunc={pull_addmin} /> : ""}
      </nav>
    </>
  );
}

export default Navbar;

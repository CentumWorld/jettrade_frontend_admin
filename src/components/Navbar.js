import React, { useContext, useEffect, useState } from "react";
import "../css/Navbar.css";
import AdminLogin from "./AdminLogin";
import Button from "react-bootstrap/Button";
import logo from "./../img/logo1.png";
import { Avatar, Dropdown, Menu } from "antd";
import SubAdmin from "./SubLoginAdmin";
import StateAdminLogin from "./StateAdminLogin";
import FranchiseAdminLogin from "./FranchiseAdminLogin";
import BussinessAdminLogin from "./BussinessAdminLogin";
import { UserOutlined } from '@ant-design/icons';
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

function Navbar() {
  const login = localStorage.getItem("login");
  const navigate = useNavigate();

  const [userShow, setUserShow] = useState(false);
  const [adminShow, setAdminShow] = useState(false);
  const [subAdminShow, setSubAdminShow] = useState(false);
  const [stateOfficerShow, setStateOfficerShow] = useState(false);
  const [franchiseShow, setFranchiseShow] = useState(false);
  const [bussinessDevShow, setBussinessDevShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  

  const openUserLoginFuction = () => setUserShow(true);
  const pull_data = (data) => setUserShow(data);

  const pull_addmin = (data) => setAdminShow(data);
  const pullsubadmin = (data) => setSubAdminShow(data);
  const pullSho = (data) => setStateOfficerShow(data);
  const pullFranchise = (data) => setFranchiseShow(data);
  const pullBussiness = (data) => setBussinessDevShow(data);


  const RenderMenu = () => {
    const adminSubAdminModal = (e) => {
      if (e.key === "admin") {
        setAdminShow(true);
      }
      if (e.key === "subadmin") {
        setSubAdminShow(true);
      }
      if (e.key === "sho") {
        setStateOfficerShow(true);
      }
      if (e.key === "franchise") {
        setFranchiseShow(true);
      }
      if (e.key === "bussinessDev") {
        setBussinessDevShow(true);
      }
    };

    const menu = (
      <Menu onClick={adminSubAdminModal}>
        <Menu.Item key="admin" >Admin</Menu.Item>
        <Menu.Item key="subadmin">Sub Admin</Menu.Item>
        <Menu.Item key="sho">State Head Officer</Menu.Item>
        <Menu.Item key="franchise">Franchise</Menu.Item>
        <Menu.Item key="bussinessDev">BusinessDeveloper</Menu.Item>
      </Menu>
    );

    const handleLogout = () => {
    fetch("/admin/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (res.ok) {
          console.log('Logout successful');
          localStorage.clear();
          navigate('/');
        } else {
          throw new Error('Logout failed');
          navigate('/');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleMenuClick = ({ key }) => {
    if (key === 'profile') {
      setModalVisible(true);
    }
  };

    const userMenu = (
      <Menu style={{ width: 200 }}>
        <Menu.Item key="profile" onClick={handleMenuClick}>Profile</Menu.Item>
        <Menu.Item key="account">Add Account Details</Menu.Item>
        <Menu.Item key="wallet">Wallet</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout" onClick={handleLogout}>Logout</Menu.Item>
      </Menu>
    );

    if (login) {
      return (
        <>
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <Avatar icon={<UserOutlined />} size="large" />
          </Dropdown>
          <ProfileModal visible={modalVisible} onCancel={handleCloseModal} />
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
        {subAdminShow ? <SubAdmin subadminfunc={pullsubadmin} /> : ""}
        {stateOfficerShow ? <StateAdminLogin stateLoginFunc={pullSho} /> : ""}
        {franchiseShow ? (
          <FranchiseAdminLogin franchiseLoginFunc={pullFranchise} />
        ) : (
          ""
        )}
        {bussinessDevShow ? (
          <BussinessAdminLogin bussinessLoginFunc={pullBussiness} />
        ) : (
          ""
        )}
      </nav>
    </>
  );
}

export default Navbar;

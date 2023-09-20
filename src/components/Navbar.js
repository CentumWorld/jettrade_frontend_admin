import React, { useCallback, useContext, useEffect, useState } from "react";
import "../css/Navbar.css";
import AdminLogin from "./AdminLogin";
import Button from "react-bootstrap/Button";
import logo from "./../img/logo1.png";
import { Avatar, Dropdown, Menu } from "antd";
import SubAdmin from "./SubLoginAdmin";
import StateAdminLogin from "./StateAdminLogin";
import FranchiseAdminLogin from "./FranchiseAdminLogin";
import BussinessAdminLogin from "./BussinessAdminLogin";
import VideoCreatorLogin from "./VideoCreatorLogin";
import { UserOutlined } from "@ant-design/icons";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import AccountModal from "./AccountModal";
import centumPDF from "../../src/utils/pdf/CENTUMWORLDFRANCHISEMODULE.pdf";
import baseUrl from "../baseUrl";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import adminAv from "../img/admin-av.png";

const apiurl = baseUrl.apiUrl;

function Navbar() {
  const login = localStorage.getItem("login");
  const navigate = useNavigate();

  const [userShow, setUserShow] = useState(false);
  const [adminShow, setAdminShow] = useState(false);
  const [subAdminShow, setSubAdminShow] = useState(false);
  const [stateOfficerShow, setStateOfficerShow] = useState(false);
  const [franchiseShow, setFranchiseShow] = useState(false);
  const [bussinessDevShow, setBussinessDevShow] = useState(false);
  const [videoCreatorShow, setVideoCreatorShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const isStateHandlerToken = localStorage.getItem("stateHandlerToken");
  const [walletamount, setWalletAmount] = useState("");
  const isFrachiseToken = localStorage.getItem("franchiseToken");
  const [isAccountModalVisible, setAccountModalVisible] = useState(false);
  const isBussinessDeveloperToken = localStorage.getItem("bussinessAdminToken");
  const isSubAdminToken = localStorage.getItem("subAdminToken");
  const isAdminToken = localStorage.getItem("adminToken");
  const [userAv, setUserAv] = useState(null);

  useEffect(() => {
    if(isStateHandlerToken){
      fetchSHOProfilePicture();
    }
    else if(isFrachiseToken){
      fetchFranchProfilePicture();
    }else{
      fetchBussinessProfilePicture();
    }
  })

  const fetchSHOProfilePicture =  async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${isStateHandlerToken}`,
      },
    };
    const data = {
      userid: localStorage.getItem("stateHandlerId"),
    };
    try {
      const res = await axios.post("/state/get-sho-profile-photo", data, config );
      setUserAv(res.data.data.imageUrl);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchFranchProfilePicture =  async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${isFrachiseToken}`,
      },
    };
    const data = {
      userid: localStorage.getItem("frenchiseId"),
    };
    try {
      const res = await axios.post("/franchise/get-franchise-profile-photo", data, config );
      setUserAv(res.data.data.imageUrl);
    } catch (err) {
      console.log(err.message);
    }
  };
  
  const fetchBussinessProfilePicture =  async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${isBussinessDeveloperToken}`,
      },
    };
    const data = {
      userid: localStorage.getItem("businessId"),
    };
    try {
      const res = await axios.post("/businessDeveloper/get-bd-profile-photo", data, config );
      setUserAv(res.data.data.imageUrl);
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleAccountModalOpen = () => {
    setAccountModalVisible(true);
  };

  const handleAccountModalClose = () => {
    setAccountModalVisible(false);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

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
          setWalletAmount(data.data.stateHandlerWallet);
        } catch (error) {
          console.error("Error fetching state details", error);
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
          setWalletAmount(data.data.frenchiseWallet);
        } catch (error) {
          console.error("Error fetching state details", error);
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
          setWalletAmount(data.data.businessDeveloperWallet);
        } catch (error) {
          console.error("Error fetching state details", error);
        }
      }

      fetchBussinessDetails();
    } else if (isAdminToken) {
      async function fetchAdminDetails() {
        try {
          const response = await fetch(`${apiurl}` + "/admin/fetch-admin", {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${isAdminToken}`,
            },
          });
          const data = await response.json();
          function formatIndianRupees(adminWallet) {
            const formatter = new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            });
            return formatter.format(adminWallet);
          }

          const adminWallet = data.data.adminWallet; // Get the adminWallet value from the response
          const formattedAdminWallet = formatIndianRupees(adminWallet); // Convert to Indian Rupees format

          console.log("Formatted admin wallet:", formattedAdminWallet); // Log the formatted wallet amount
          setWalletAmount(formattedAdminWallet);
        } catch (error) {
          console.error("Error fetching state details", error);
        }
      }
      fetchAdminDetails();
    }
  }, [
    isStateHandlerToken,
    isBussinessDeveloperToken,
    isFrachiseToken,
    isAdminToken,
  ]);

  const openUserLoginFuction = () => setUserShow(true);
  const pull_data = (data) => setUserShow(data);

  const pull_addmin = (data) => setAdminShow(data);
  const pullsubadmin = (data) => setSubAdminShow(data);
  const pullSho = (data) => setStateOfficerShow(data);
  const pullFranchise = (data) => setFranchiseShow(data);
  const pullBussiness = (data) => setBussinessDevShow(data);
  const pullVideoCreator = (data) => setVideoCreatorShow(data);

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
      if (e.key === "video") {
        setVideoCreatorShow(true);
      }
    };

    const menu = (
      <Menu onClick={adminSubAdminModal}>
        <Menu.Item key="admin">Admin</Menu.Item>
        <Menu.Item key="subadmin">Back Office</Menu.Item>
        {/* <Menu.Item key="sho">State Head Officer</Menu.Item>
        <Menu.Item key="franchise">Franchise</Menu.Item>
        <Menu.Item key="bussinessDev">BusinessDeveloper</Menu.Item> */}
        {/* <Menu.Item key="video">Video Creator</Menu.Item> */}
      </Menu>
    );

    const handleLogout = () => {
      fetch(`${apiurl}` + "/admin/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            console.log("Logout successful");
            localStorage.clear();
            navigate("/");
          } else {
            throw new Error("Logout failed");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const handleMenuClick = ({ key }) => {
      if (key === "profile") {
        setModalVisible(true);
      }
      if (key === "brochure") {
        const pdfUrl = centumPDF;
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "CENTUM WORLD FRANCHISE MODULE.pdf";
        link.click();
      }
    };

    const userMenu = (
      <Menu style={{ width: 200 }}>
        {!isAdminToken && (
          <Menu.Item key="profile" onClick={handleMenuClick}>
            Profile
          </Menu.Item>
        )}
        {!isAdminToken && !isSubAdminToken && (
          <Menu.Item key="account" onClick={handleAccountModalOpen}>
            Add Account Details
          </Menu.Item>
        )}
        {!isSubAdminToken && (
          <Menu.Item key="wallet">
            Wallet <span className="wallet-ammount">Rs.{walletamount}</span>{" "}
          </Menu.Item>
        )}
        {(isStateHandlerToken || isFrachiseToken) && (
          <Menu.Item key="brochure" onClick={handleMenuClick}>
            Download brochure
          </Menu.Item>
        )}
        <Menu.Divider />
        <Menu.Item key="logout" onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu>
    );

    if (login) {
      return (
        <>
        <ToastContainer />
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <img
              src={userAv || adminAv}
              height={50}
              width={50}
              style={{ marginRight: "1rem", borderRadius: "100%", objectFit: "cover" }}
              // onClick={fetchSHOProfilePicture()}
            />
          </Dropdown>
          <ProfileModal visible={modalVisible} onCancel={handleCloseModal} />
          <AccountModal
            isVisible={isAccountModalVisible}
            onClose={handleAccountModalClose}
          />
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button variant=" btn rounded btn-outline-primary rounded-pill">
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
        {videoCreatorShow ? (
          <VideoCreatorLogin VideoCreatorLoginFunc={pullVideoCreator} />
        ) : (
          ""
        )}
      </nav>
    </>
  );
}

export default Navbar;

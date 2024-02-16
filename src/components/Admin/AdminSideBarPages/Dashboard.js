import React, { useState, useEffect } from "react";
import "../css/Dashboard.css";
import {
  Table,
  Button,
  Modal,
  Menu,
  Dropdown,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  message,
} from "antd";
import axios from "axios";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import aadharImage from "../../../img/aadhar.jpg";
import aadharBackImage from "../../../img/Aadhaar-back.jpg";
import panImage from "../../../img/pan.jpg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import baseUrl from "../../../baseUrl";
import { BiArrowBack } from "react-icons/bi";

const apiurl = baseUrl.apiUrl;
const { Option } = Select;
const { Search } = Input;

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [length, setLength] = useState(null);
  const [visible, setVisible] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [aadhar, setAadhar] = useState("");
  const [pan, setPan] = useState("");
  const [myID, setMyID] = useState("");
  const [aadharFrontImage, setAadharFrontImage] = useState({
    placeholder: aadharImage,
    file: null,
  });
  const [aadharBackImageSide, setAadharBackImage] = useState({
    placeholder: aadharBackImage,
    file: null,
  });

  const [panImageSide, setPanImage] = useState({
    placeholder: panImage,
    file: null,
  });
  const [idCard, setIdCard] = useState({
    placeholder: "",
    file: null,
    no: "",
  });
  // edit user details -----------
  const [isModalVisible, setIsEditModalVisible] = useState(false);
  const [editUserData, setEditUserData] = useState({
    fname: "",
    lname: "",
    phone: "",
    gender: "",
    address: "",
    aadhar: "",
    pan: "",
    Id_No: "",
    dob: null,
  });
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [userStatus, setUserStatus] = useState(false);
  const [userType, setUserType] = useState("");
  const [userId, setUserID] = useState("");
  const [userTypeView, setUserTypeView] = useState("");

  //isBlock
  const [isBlocked, setIsBlock] = useState(true);
  const [isSubAdmin, setIsSubAdmin] = useState(false);
  // search bar -------------
  const notAllow = localStorage.getItem("isSubAdmin");
  const handleSearch = (value) => {
    setSearchText(value);
  };
  // -------------

  // edit modal
  const editModal = () => {
    setIsEditModalVisible(true);
  };

  const handleUserModalEditCancel = () => {
    setIsEditModalVisible(false);
  };

  //   --------------

  useEffect(() => {
    fetchData();
  }, []);

  const token = localStorage.getItem("adminToken");
  const subadminToken = localStorage.getItem("subAdminToken");
  const stateToken = localStorage.getItem("stateHandlerToken");
  const stateHandlerRefferalID = localStorage.getItem("stateHandlerRefferalID");
  const frenchiseToken = localStorage.getItem("franchiseToken");
  const franchiseRefferal = localStorage.getItem("franchiseRefferal");
  const bussinessDeveloperToken = localStorage.getItem("bussinessAdminToken");
  const bussinessDeveloperReferralId = localStorage.getItem(
    "bussinessRefferalId"
  );

  const fetchData = async () => {
    if (token || subadminToken) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token || subadminToken}` },
        };
        const response = await axios.get(
          `${apiurl}` + "/admin/fetch-user-details",
          config
        );
        setData(response.data.result);
        setFilteredDataSource(response.data.result);
        setLength(response.data.result.length);
      } catch (error) {
      }
    } else if (stateToken && stateHandlerRefferalID) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${stateToken}` },
        };

        const requestData = {
          stateReferralId: stateHandlerRefferalID,
        };

        const response = await axios.post(
          `${apiurl}` + "/state/fetch-all-users-in-state",
          requestData,
          config
        );

        setData(response.data.data);

        setFilteredDataSource(response.data.data);
        setLength(response.data.data.length);
      } catch (error) {
       
      }
    } else if (frenchiseToken && franchiseRefferal) {
      const config = {
        headers: { Authorization: `Bearer ${frenchiseToken}` },
      };

      const requestData = {
        franchiseReferralId: franchiseRefferal,
      };
      axios
        .post(
          `${apiurl}` + "/franchise/get-all-users-in-franchise",
          requestData,
          config
        )
        .then((res) => {

          setData(res.data.data);

          setFilteredDataSource(res.data.data);
        })
        .catch((err) => {

        });
    } else if (bussinessDeveloperToken || bussinessDeveloperReferralId) {
      const config = {
        headers: { Authorization: `Bearer ${bussinessDeveloperToken}` },
      };

      const requestData = {
        businessDevRefferalId: bussinessDeveloperReferralId,
      };
      axios
        .post(
          `${apiurl}` +
          "/businessDeveloper/get-all-users-in-business-developer",
          requestData,
          config
        )
        .then((res) => {
          setData(res.data.users);

          setFilteredDataSource(res.data.users);
        })
        .catch((err) => {
          
        });
    }
  };

  const handleVerifyClick = (id) => {
    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("subAdminToken");
    let data = {
      id: id,
      status: true,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    };
    axios
      .post(`${apiurl}` + "/admin/verify-user", data, config)
      .then((res) => {
        toast.success("User Verify Successfully", {
          autoClose: 2000,
          theme: "dark",
        });
        fetchData();
      })
      .catch((error) => {
        toast.warning("Not verified!");
      });
  };

  const handleViewClick = (id) => {
    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("subAdminToken");
    let data = {
      _id: id,
    };
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${apiurl}` + "/admin/fetch-particular-user-details", data, config)
      .then((res) => {
        setAadhar(res.data.result.aadhar);
        setPan(res.data.result.pan);
        fetchUserDocuments(res.data.result.userid);
      })
      .catch((error) => {
        toast.warning("Somthing went wrong!");
      });

    setVisible(true);
  };
  const handleImageError = () => {
    setImageError(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const buttonStyle = {
    marginRight: "5px",
    marginBottom: "5px",
  };

  const columns = [
    { title: "Trader ID", dataIndex: "userid", key: "userid" },
    { title: "First Name", dataIndex: "fname", key: "fname" },
    { title: "Last Name", dataIndex: "lname", key: "lname" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Referred ID", dataIndex: "reffered_id", key: "reffered_id" },
    { title: "Referral ID", dataIndex: "refferal_id", key: "refferal_id" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        const cellStyle = status ? { color: "green" } : { color: "red" };
        return (
          <span style={cellStyle}>{status ? "Verified" : "Not Verified"}</span>
        );
      },
    },
    {
      title: "Block Status",
      dataIndex: "isBlocked",
      render: (isBlocked) => {
        const cellStyle = isBlocked ? { color: "red" } : { color: "green" };
        return (
          <span style={cellStyle}>
            {isBlocked ? "Blocked" : "Not Blocked "}
          </span>
        );
      },
    },
  ];

  if (token || subadminToken) {
    columns.push({
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <>
          <Dropdown
            overlay={token ? menu : Submenu}
            placement="bottomLeft"
            trigger={["click"]}
          >
            <BsThreeDotsVertical
              size={24}
              onClick={() =>
                trigerAction(
                  record._id,
                  record.userid,
                  record.status,
                  record.isBlocked,
                  record.isSubAdmin
                )
              }
              style={{ cursor: "pointer" }}
            />
          </Dropdown>
        </>
      ),
    });
  }

  // handle action
  const trigerAction = (id, userid, status, block, subadmin) => {
    setMyID(id, block);
    setUserStatus(status);
    setIsBlock(block);
    setUserID(userid);
    setIsSubAdmin(subadmin);
  };
  const handleMenuClick = (e) => {
    if (e.key === "verify") {
      handleVerifyClick(myID);
    }
    if (e.key === "view") {
      handleViewClick(myID);
    }
    if (e.key === "edit") {
      editModal();
      fetchUserDetailsForEdit(myID);
    }
    if (e.key === "block") {
      blockUnblock(myID);
    }
    if (e.key === "account") {
      navigate(`/admindashboard/trader-accounts/${userId}`);
    }
    if (e.key === "withdrawal") {
      navigate(`/admindashboard/trader-withdrawal/${userId}`);
    }
    if (e.key === "admin") {
      makeSubAdmin(myID);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="verify" disabled={userStatus}>
        Verify
      </Menu.Item>
      <Menu.Item key="view">View</Menu.Item>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="block">{isBlocked ? "Unblock" : "Block"}</Menu.Item>
      <Menu.Item key="account">Account</Menu.Item>
      <Menu.Item key="withdrawal">Withdrawal</Menu.Item>
    </Menu>
  );

  const Submenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="verify" disabled={userStatus}>
        Verify
      </Menu.Item>
      <Menu.Item key="view">View</Menu.Item>
    </Menu>
  );

  //   ------------------------------
  const fetchUserDocuments = (userid) => {
    let token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("subAdminToken");
    let data = {
      userid: userid,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${apiurl}` + "/admin/fetch-user-document-adminside", data, config)
      .then((res) => {
        setUserTypeView(res.data.result[0].userType);
        if (res.data.result.length > 0) {
          if (res.data.result[0].userTpe === "indian") {
            setLoading(true);
            setAadharFrontImage({
              placeholder: res.data.result[0].aadhar_front_side,
            });
            setAadharBackImage({
              placeholder: res.data.result[0].aadhar_back_side,
            });
            setPanImage({ placeholder: res.data.result[0].pan_card });
          } else {
            setLoading(true);
            setIdCard({
              placeholder: res.data.result[0].ID_Card,
              no: res.data.result[0].Id_No,
            });
          }
        } else {
          setAadharFrontImage({ placeholder: aadharImage });
          setAadharBackImage({ placeholder: aadharBackImage });
          setPanImage({ placeholder: panImage });
          setLoading(false);
        }
      })
      .catch((err) => {
      
      });
  };

  const downloadAadharFrontImage = (frontImage) => {
    const link = document.createElement("a");
    link.href = frontImage;
    link.download = "image.jpg";
    link.click();
  };

  //downloadAadharBackImage
  const downloadAadharBackImage = (backImage) => {
    const link = document.createElement("a");
    link.href = backImage;
    link.download = "image.jpg";
    link.click();
  };

  const downloadPanImage = (panImage) => {
    const link = document.createElement("a");
    link.href = panImage;
    link.download = "image.jpg";
    link.click();
  };
  

  const fetchUserDetailsForEdit = (id) => {
    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("subAdminToken");
    let data = {
      _id: id,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    };
    axios
      .post(`${apiurl}` + "/admin/fetch-particular-user-details", data, config)
      .then((result) => {
        setUserType(result.data.result.userType);
        const dateTimeString = result.data.result.dob;
        const date = new Date(dateTimeString);
        const formattedDate = date.toLocaleDateString();
        const parts = formattedDate.split("/");
        const newDateFormat = `${parts[2]}-${parts[0].padStart(
          2,
          "0"
        )}-${parts[1].padStart(2, "0")}`;
        if (result.data.result.userType === "indian") {
          setEditUserData({
            fname: result.data.result.fname,
            lname: result.data.result.lname,
            phone: result.data.result.phone,
            address: result.data.result.address,
            dob: newDateFormat,
            aadhar: result.data.result.aadhar,
            pan: result.data.result.pan,
            gender: result.data.result.gender,
          });
        }
        if (result.data.result.userType === "otherCountry") {
          setEditUserData({
            fname: result.data.result.fname,
            lname: result.data.result.lname,
            phone: result.data.result.phone,
            address: result.data.result.address,
            dob: newDateFormat,
            Id_No: result.data.result.Id_No,
            gender: result.data.result.gender,
          });
        }
      })
      .catch((error) => {
      });
  };

  const editInputChange = (e) => {
    const { name, value } = e.target;
    setEditUserData((editUserData) => ({
      ...editUserData,
      [name]: value,
    }));
  };

  const handleGenderChange = (value) => {
    setEditUserData((editUserData) => ({
      ...editUserData,
      gender: value,
    }));
  };

  const handleDobChange = (e) => {
    
    setEditUserData({ ...editUserData, dob: e.target.value });
  };
  // save edit value
  const editModalSubmit = (e) => {
    e.preventDefault();
    if (userType === "indian") {
      const data = {
        userWhat: "indian",
        id: myID,
        fname: editUserData.fname,
        lname: editUserData.lname,
        phone: editUserData.phone,
        address: editUserData.address,
        dob: editUserData.dob,
        aadhar: editUserData.aadhar,
        pan: editUserData.pan,
        gender: editUserData.gender,
      };
      const token = localStorage.getItem("adminToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .post(`${apiurl}` + "/admin/user-details-edit-admin", data, config)
        .then((res) => {
          message.success("Updated Successfully");
          setIsEditModalVisible(false);
          fetchData();
        })
        .catch((err) => {
          message.warning("Something went wrong!");
        });
    }
    if (userType === "otherCountry") {
      const data = {
        userWhat: "otherCountry",
        id: myID,
        fname: editUserData.fname,
        lname: editUserData.lname,
        phone: editUserData.phone,
        address: editUserData.address,
        dob: editUserData.dob,
        Id_No: editUserData.Id_No,
        gender: editUserData.gender,
      };
      const token = localStorage.getItem("adminToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .post(`${apiurl}` + "/admin/user-details-edit-admin", data, config)
        .then((res) => {
          message.success("Updated Successfully");
          setIsEditModalVisible(false);
          fetchData();
        })
        .catch((err) => {
          message.warning("Something went wrong!");
        });
    }
  };

  // --------------
  // delete user
  const confirmDelete = (id) => {
    Modal.confirm({
      title: "Delete Record",
      content: "Are you sure you want to delete this record?",
      onOk() {
        deleteUser(id);
      },
      onCancel() {
        
      },
    });
  };
  const deleteUser = (id) => {
    const token = localStorage.getItem("adminToken");
    const data = {
      id: id,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    };
    axios
      .post(`${apiurl}` + "/admin/delete-user-admin", data, config)
      .then((res) => {
        fetchData();
        message.success("Deleted Successfully");
      })
      .catch((err) => {
       
      });
  };

  //block  or unblock

  const blockUnblock = (id) => {
    const actionText = isBlocked ? "Unblock" : "Block";
    Modal.confirm({
      title: `${actionText} User`,
      content: `Are you sure you want to  ${actionText.toLowerCase()} this User?`,
      onOk() {
        const token =
          localStorage.getItem("adminToken") ||
          localStorage.getItem("subAdminToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const data = {
          id: id,
          block: !isBlocked,
        };
        axios
          .post(`${apiurl}` + "/admin/block-user", data, config)
          .then((res) => {
            message.success(res.data.message);
            fetchData();
          })
          .catch((err) => {
            message.warning("Something went wrong!");
          });
      },
      onCancel() {
        
      },
    });
  };

  //serch text
  const searchUser = (value) => {
    setSearchText(value);

    const searchNumber = Number(value); 

    const filteredData = data.filter((record) => {
      
      if (record.phone === searchNumber) {
     
        return true;
      }

      // Search by other fields
      return Object.values(record).some((recordValue) => {
        if (typeof recordValue === "string") {
          const lowercaseRecordValue = recordValue.toLowerCase();
          return lowercaseRecordValue.includes(value.toLowerCase());
        }
        return false;
      });
    });

    setFilteredDataSource(filteredData);
  };

  // ---------------

  const activeStyle = {
    backgroundColor: "#333333",
    color: "#ffffff",
  };
  const home = () => {
    navigate("/admindashboard/dashboard");
  };

  // make sub admin

  const makeSubAdmin = (myID) => {
    const actionText = isSubAdmin ? "Remove" : "Make";
    Modal.confirm({
      title: `${actionText} Sub-Admin`,
      content: `Do you want to ${actionText.toLowerCase()} this user Sub-Admin?`,
      okText: "Sure",
      cancelText: "Cancel",
      onOk() {
        let data = {
          userId: myID,
          isSubAdmin: !isSubAdmin,
        };
        const token = localStorage.getItem("adminToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .post(`${apiurl}` + "/admin/manage-subadmin", data, config)
          .then((res) => {
            message.success(res.data.message);
            fetchData();
          })
          .catch((err) => {
          
          });
      },
      onCancel() { },
    });
  
  };

  const gotoDashboard = ()=>{
    navigate('/admindashboard/dashboard');
  }

  return (
    <>
      <Modal
        className="document_verification"
        title="Documents Verification"
        open={visible}
        onCancel={handleCancel}
        footer={null}
        style={{ fontFamily: "Calibri" }}
      >
        <>
          {userTypeView === "indian" ? (
            <div>
              <h6>Aadhar Front Side</h6>
              <p>
                Aadhar Number:{" "}
                <span style={{ fontWeight: "bold" }}>{aadhar}</span>
              </p>
              {!imageError ? (
                <img
                  src={aadharFrontImage.placeholder}
                  width={200}
                  height={100}
                  alt=""
                  onError={handleImageError}
                />
              ) : (
                <p>Error loading image.</p>
              )}
              <Button
                className="aadhar-front"
                disabled={!loading}
                type="primary"
                onClick={() =>
                  downloadAadharFrontImage(aadharFrontImage.placeholder)
                }
              >
                Download
              </Button>

              <hr />

              <h6>Aadhar Back Side</h6>
              {!imageError ? (
                <img
                  src={aadharBackImageSide.placeholder}
                  width={200}
                  height={100}
                  alt=""
                  onError={handleImageError}
                />
              ) : (
                <p>Error loading image.</p>
              )}
              <Button
                className="aadhar-front"
                disabled={!loading}
                type="primary"
                onClick={() =>
                  downloadAadharBackImage(aadharBackImageSide.placeholder)
                }
              >
                Download
              </Button>

              <hr />

              <h6>PAN</h6>
              <p>
                PAN Number: <span style={{ fontWeight: "bold" }}>{pan}</span>{" "}
              </p>
              <img
                src={panImageSide.placeholder}
                width={200}
                height={100}
                alt=""
              />
              <Button
                className="aadhar-front"
                disabled={!loading}
                type="primary"
                onClick={() => downloadPanImage(panImageSide.placeholder)}
              >
                Download
              </Button>
            </div>
          ) : (
            <>
              <h6>ID Card</h6>
              <p>
                Card no: <span style={{ fontWeight: "bold" }}>{idCard.no}</span>{" "}
              </p>
              <img src={idCard.placeholder} width={200} height={100} alt="" />
              <Button
                className="aadhar-front"
                disabled={!loading}
                type="primary"
                onClick={() => downloadPanImage(idCard.placeholder)}
              >
                Download
              </Button>
            </>
          )}
        </>
      </Modal>
      <div className="admin-dashboard">
        <div className="admin-dashboard-card">
          <div className="profile-verification-heading">
            <div className="txt-btn">
              <h5 style={{ fontFamily: "Calibri" }}><BiArrowBack onClick={gotoDashboard} style={{cursor:'pointer'}}/>&nbsp;Trader Profile Details</h5>
              {token || subadminToken?<NavLink
                className="create-user"
                to="/admindashboard/createuser"
                exact
                activeClassName="active"
                activeStyle={activeStyle}
              >
                + Create Trader
              </NavLink>:""}
            </div>
            <Search
              placeholder="Enter search text"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={searchUser}
            />
          </div>
          <div className="user-table">
            <Table
              dataSource={filteredDataSource}
              style={{
                width: "fit-content",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              columns={columns}
              scroll={{ x: true, y: 320 }}
              pagination={{ pageSize: 7 }}
            />
          </div>
        </div>
      </div>
      <ToastContainer />

      {/* modal */}
      <div>
        <Modal
          title={
            <span
              style={{ color: "#5e72e4", fontFamily: "Calibri", fontSize: 20 }}
            >
              EDIT INFORMATION
            </span>
          }
          open={isModalVisible}
          onCancel={handleUserModalEditCancel}
          footer={[
            <Button key="submit" type="primary" onClick={editModalSubmit}>
              Submit
            </Button>,
          ]}
        >
          <div className="edit-container">
            <div>
              <Row style={{ marginBottom: "5px", fontWeight: 600 }}>
                <Col span={12}>First Name :</Col>
                <Col span={12}>
                  <Input
                    value={editUserData.fname}
                    name="fname"
                    onChange={editInputChange}
                    placeholder="Enter first name"
                  />
                </Col>
              </Row>
            </div>
            <div>
              <Row style={{ marginBottom: "5px", fontWeight: 600 }}>
                <Col span={12}>Last Name :</Col>
                <Col span={12}>
                  <Input
                    value={editUserData.lname}
                    name="lname"
                    onChange={editInputChange}
                    placeholder="Enter last name"
                  />
                </Col>
              </Row>
            </div>
            <div>
              <Row style={{ marginBottom: "5px", fontWeight: 600 }}>
                <Col span={12}>Phone:</Col>
                <Col span={12}>
                  <Input
                    value={editUserData.phone}
                    name="phone"
                    onChange={editInputChange}
                    placeholder="Enter phone no"
                  />
                </Col>
              </Row>
            </div>
            <div>
              <Row style={{ marginBottom: "5px", fontWeight: 600 }}>
                <Col span={12}>Address :</Col>
                <Col span={12}>
                  <Input
                    value={editUserData.address}
                    name="address"
                    onChange={editInputChange}
                    placeholder="Enter address"
                  />
                </Col>
              </Row>
            </div>
            {userType === "indian" ? (
              <>
                <div>
                  <Row style={{ marginBottom: "5px", fontWeight: 600 }}>
                    <Col span={12}>Aadhar No. :</Col>
                    <Col span={12}>
                      <Input
                        value={editUserData.aadhar}
                        name="aadhar"
                        onChange={editInputChange}
                        placeholder="Enter aadhar no"
                      />
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row style={{ marginBottom: "5px", fontWeight: 600 }}>
                    <Col span={12}>Pan No. :</Col>
                    <Col span={12}>
                      <Input
                        value={editUserData.pan}
                        name="pan"
                        onChange={editInputChange}
                        placeholder="Enter Pan no"
                      />
                    </Col>
                  </Row>
                </div>
              </>
            ) : (
              <div>
                <Row style={{ marginBottom: "5px", fontWeight: 600 }}>
                  <Col span={12}>ID NO. :</Col>
                  <Col span={12}>
                    <Input
                      value={editUserData.Id_No}
                      name="Id_No"
                      onChange={editInputChange}
                      placeholder="Enter ID No.."
                    />
                  </Col>
                </Row>
              </div>
            )}

            <div>
              <Row style={{ marginBottom: "5px", fontWeight: 600 }}>
                <Col span={12}>Gender :</Col>
                <Col span={12}>
                  <Select
                    name="gender"
                    value={editUserData.gender}
                    onChange={handleGenderChange}
                    placeholder="Gender"
                  >
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Col>
              </Row>
            </div>
            <div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Dashboard;

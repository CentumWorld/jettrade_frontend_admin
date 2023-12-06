import React, { useEffect, useState } from "react";
import "../css/NewRenewal.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { Button, Table, message, Form, Input, Select } from "antd";
import StateRegister from "./Register/StateRegister";
import axios from "axios";
import { Menu, Dropdown, Modal } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import baseUrl from "../../../baseUrl";
import { useNavigate } from "react-router-dom";
import allState from "./AllStateAndDistrict";
import { BiArrowBack } from "react-icons/bi";

const apiurl = baseUrl.apiUrl;
const { Option } = Select;
const { Search } = Input;

const State = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stateData, setStateData] = useState([]);
  const [isBlocked, setIsBlock] = useState(true);
  const [isDeleted, setIsDeleted] = useState(true);
  const [myID, setMyID] = useState("");
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [stateHandlerID, setStateHandlerID] = useState("");
  const [visible, setVisible] = useState(false);
  const [uploadButton, setUploadButton] = useState(true);
  const [uploadButtonPan, setUploadButtonPan] = useState(true);
  const [stateVerify, setIsVerify] = useState(false);
  const [aadharCard, setAadharCard] = useState({
    placeholder: "",
    file: null,
  });
  const [panCard, setPanCard] = useState({
    placeholder: "",
    file: null,
  });

  const [aadharCardFront, setAadharCardFront] = useState({
    placeholder: "",
    file: null,
  });

  const [aadharCardBack, setAadharCardBack] = useState({
    placeholder: "",
    file: null,
  });

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [frenchieData, setFrenchieData] = useState([]);
  const [editFranchiseData, setFranchiseData] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    gender: "",
    selectedState: [],
    city: [],
  });

  const [searchText, setSearchText] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const closeEditModal = () => {
    setEditModalVisible(false);
  };

  useEffect(() => {
    fetchStateDataApi();
    //fetchFrenchieseDataApi();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const fetchStateDataApi = () => {
    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("subAdminToken");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(`${apiurl}` + "/admin/fetch-all-state", config)
      .then((res) => {
        // console.log("State response -> ", res.data);
        setLoading(true);
        setStateData(res.data.data);
        setFilteredDataSource(res.data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const adminToken = localStorage.getItem("adminToken");
  const subAdminToken = localStorage.getItem("subAdminToken");

  const columns = [
    {
      title: "BMM ID",
      dataIndex: "stateHandlerId",
      key: "stateHandlerId",
    },
    {
      title: "Fname",
      dataIndex: "fname",
      key: "fname",
    },
    {
      title: "Lname",
      dataIndex: "lname",
      key: "lname",
    },
    
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Referral ID",
      dataIndex: "referralId",
      key: "referralId",
      render: (text) => (
        <span
          style={{ cursor: "pointer", userSelect: "all" }}
          onClick={() => {
            navigator.clipboard.writeText(text);
            message.success("Text copied to clipboard: " + text);
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Referred ID",
      dataIndex: "referredId",
      key: "reffered_id",
    },
    {
      title: "Wallet",
      dataIndex: "stateHandlerWallet",
      key: "stateHandlerWallet",
      render: (amount) => (
        <span style={{fontWeight:'bold'}} >
          ₹ {amount.toFixed(2)}{" "}
        </span>
      ),
    },
    {
      title: "State",
      dataIndex: "selectedState",
      key: "selectedState",
      render: (selectedState) => selectedState.join(", "),
    },
    {
      title: "Status",
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
    {
      title: "Verification",
      dataIndex: "isVerify",
      render: (isVerify) => {
        const cellStyle = isVerify ? { color: "green" } : { color: "red" };
        return (
          <span style={cellStyle}>{isVerify ? "Verified" : "Not Verified "}</span>
        );
      },
    },
    {
      title: "Delete",
      dataIndex: "isDeleted",
      render: (isDeleted) => {
        const cellStyle = isDeleted ? { color: "red" } : { color: "green" };
        return (
          <span style={cellStyle}>{isDeleted ? "Deleted" : "Not Deleted"}</span>
        );
      },
    },
    {
      title: "P/R",
      dataIndex: "paymentRequestCount",
      key: "paymentRequestCount",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Dropdown
          overlay={adminToken ? menu : subMenu}
          placement="bottomLeft"
          trigger={["click"]}
        >
          <BsThreeDotsVertical
            size={24}
            onClick={() =>
              trigerAction(
                record._id,
                record.isBlocked,
                record.isDeleted,
                record.stateHandlerId,
                record.isVerify
              )
            }
            style={{ cursor: "pointer" }}
          />
        </Dropdown>
      ),
    },
  ];

  const token =
    localStorage.getItem("adminToken") || localStorage.getItem("subAdminToken");

  const stateToken = localStorage.getItem("stateHandlerToken");
  const stateHandlerRefferalID = localStorage.getItem("stateHandlerRefferalID");
  console.log("===============>", stateToken, stateHandlerRefferalID);

  const fetchFrenchieseDataApi = () => {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .get(`${apiurl}` + "/admin/fetch-all-frenchise", config)
        .then((res) => {
          console.log("Frenchese Data -> ", res.data);
          setFrenchieData(res.data.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else if (stateToken && stateHandlerRefferalID) {
      const requestData = {
        stateReferralId: stateHandlerRefferalID,
      };
      const config = {
        headers: { Authorization: `Bearer ${stateToken}` },
      };
      axios
        .post(
          `${apiurl}` + "/state/fetch-all-franchise-in-state",
          requestData,
          config
        )
        .then((res) => {
          console.log(
            "Franchise in state response -----> ",
            res.data.data[0].adharCard
          );
          setFrenchieData(res.data.data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  };

  // handle action
  const trigerAction = (id, block, stateDelete, stateHandlerid, verify) => {
    setMyID(id);
    setIsBlock(block);
    setIsDeleted(stateDelete);
    setStateHandlerID(stateHandlerid);
    setIsVerify(verify);
  };
  const handleMenuClick = (e) => {
    console.log(e.key);

    if (e.key === "block") {
      blockUnblock(myID);
    } else if (e.key === "view") {
      setVisible(true);
      openViewModal(myID);
    } else if (e.key === "edit") {
      setEditModalVisible(true);
      editFranchiseDataFunction(myID);
    } else if (e.key === "delete") {
      deleteAndRecoverState(myID);
    } else if (e.key === "account") {
      navigate(`/admindashboard/tracker/state-account/${stateHandlerID}`);
    } else if (e.key === "verify") {
      callApiToVerifyState(stateVerify);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="verify" disabled={stateVerify}>
        Verify
      </Menu.Item>
      <Menu.Item key="view">View</Menu.Item>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="block">{isBlocked ? "Unblock" : "Block"}</Menu.Item>
      <Menu.Item key="delete">{isDeleted ? "Recover" : "Delete"}</Menu.Item>
      <Menu.Item key="account">Account</Menu.Item>
    </Menu>
  );

  const subMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="verify" disabled={stateVerify}>
        Verify
      </Menu.Item>
      <Menu.Item key="view">View</Menu.Item>
    </Menu>
  );
  const blockUnblock = (id) => {
    const actionText = isBlocked ? "Unblock" : "Block";
    Modal.confirm({
      title: `${actionText} S.H.O`,
      content: `Are you sure you want to  ${actionText.toLowerCase()} this S.H.O?`,
      onOk() {
        const token = localStorage.getItem("adminToken");
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
          .post(`${apiurl}` + "/admin/block-state-by-admin", data, config)
          .then((res) => {
            message.success(res.data.message);
            fetchStateDataApi();
          })
          .catch((err) => {
            message.warning("Something went wrong!");
          });
      },
      onCancel() {
        console.log("Deletion cancelled");
      },
    });
  };

  const openViewModal = (id) => {
    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("stateHandlerToken") ||
      localStorage.getItem("subAdminToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let data = {
      id: id,
    };
    axios
      .post(`${apiurl}` + "/admin/get-one-state-details", data, config)
      .then((res) => {
        // setAadharCard({ placeholder: res.data.data.adharCard });

        setAadharCardFront({ placeholder: res.data.data.adhar_front_side });
        setAadharCardBack({ placeholder: res.data.data.adhar_back_side });

        setPanCard({ placeholder: res.data.data.panCard });
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const handleAdharFrontImageChange = (e) => {
    e.preventDefault();
    document.getElementById("adhar-front-image").click();
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      if (
        selectedFile.type === "image/png" ||
        selectedFile.type === "image/jpeg"
      ) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setAadharCardFront({
            placeholder: reader.result,
            file: selectedFile,
          });
          setUploadButton(false);
        };

        reader.readAsDataURL(selectedFile);
      } else {
        message.error("Invalid File !!");
      }
    }
  };

  const handleAdharBackImageChange = (e) => {
    e.preventDefault();
    document.getElementById("adhar-back-image").click();
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      if (
        selectedFile.type === "image/png" ||
        selectedFile.type === "image/jpeg"
      ) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setAadharCardBack({
            placeholder: reader.result,
            file: selectedFile,
          });
          setUploadButton(false);
        };

        reader.readAsDataURL(selectedFile);
      } else {
        message.error("Invalid File !!");
      }
    }
  };

  const uploadAadharCardFrontSide = () => {
    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("stateHandlerToken") ||
      localStorage.getItem("subAdminToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = new FormData();
    data.append("id", myID);
    data.append("adhar_front_side", aadharCardFront.file);
    axios
      .put(
        `${apiurl}` + "/admin/update-adhar-card-front-side-state-handler",
        data,
        config
      )
      .then((res) => {
        message.success(res.data.message);
        setUploadButton(true);
      })
      .catch((err) => {
        message.warning(err.response.data.message);
      });
  };

  const uploadAadharCardBackSide = () => {
    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("stateHandlerToken") ||
      localStorage.getItem("subAdminToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = new FormData();
    data.append("id", myID);
    data.append("adhar_back_side", aadharCardBack.file);
    axios
      .put(
        `${apiurl}` + "/admin/update-adhar-card-back-side-state-handler",
        data,
        config
      )
      .then((res) => {
        message.success(res.data.message);
        setUploadButton(true);
      })
      .catch((err) => {
        message.warning(err.response.data.message);
      });
  };

  const handleImageChangePan = (e) => {
    e.preventDefault();
    document.getElementById("pan-image").click();
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      if (
        selectedFile.type === "image/png" ||
        selectedFile.type === "image/jpeg"
      ) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setPanCard({
            placeholder: reader.result,
            file: selectedFile,
          });
          setUploadButtonPan(false);
        };

        reader.readAsDataURL(selectedFile);
      } else {
        message.error("Invalid File !!");
      }
    }
  };

  const uploadPan = () => {
    console.log(panCard.file);
    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("stateHandlerToken") ||
      localStorage.getItem("subAdminToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = new FormData();
    data.append("id", myID);
    data.append("panCard", panCard.file);
    axios
      .put(`${apiurl}` + "/admin/update-pan-card-state-handler", data, config)
      .then((res) => {
        message.success(res.data.message);
        setUploadButtonPan(true);
      })
      .catch((err) => {
        message.warning(err.response.data.message);
      });
  };

  const deleteAndRecoverState = (id) => {
    const actionText = isDeleted ? "Recover" : "Delete";
    Modal.confirm({
      title: `${actionText} S.H.O`,
      content: `Are you sure you want to  ${actionText.toLowerCase()} this S.H.O?`,
      onOk() {
        const token = localStorage.getItem("adminToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const data = {
          id: id,
          delete: !isDeleted,
        };
        axios
          .post(`${apiurl}` + "/admin/delete-state", data, config)
          .then((res) => {
            message.success(res.data.message);
            fetchStateDataApi();
          })
          .catch((err) => {
            message.warning("Something went wrong!");
          });
      },
      onCancel() {
        console.log("Deletion cancelled");
      },
    });
  };

  const handleCitySelectChange = (selectedCities) => {
    setFranchiseData({
      ...editFranchiseData,
      city: selectedCities,
    });
  };

  const editFranchiseDataFunction = (id) => {
    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("stateHandlerToken") ||
      localStorage.getItem("subAdminToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let data = {
      id: id,
    };
    axios
      .post(`${apiurl}` + "/admin/get-one-state-details", data, config)
      .then((res) => {
        console.log(res.data);
        setFranchiseData({
          fname: res.data.data.fname,
          lname: res.data.data.lname,
          phone: res.data.data.phone,
          email: res.data.data.email,
          gender: res.data.data.gender,
          state: res.data.data.selectedState,
        });
      })
      .catch((err) => {
        console.log(err.response.data.messsage);
      });
  };

  const submitEditForm = () => {
    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("stateHandlerToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(myID, "508");
    let data = {
      fname: editFranchiseData.fname,
      lname: editFranchiseData.lname,
      phone: editFranchiseData.phone,
      email: editFranchiseData.email,
      selectedState: editFranchiseData.state,
      gender: editFranchiseData.gender,
      id: myID,
    };
    axios
      .put(`${apiurl}` + "/admin/update-state-handler", data, config)
      .then((res) => {
        message.success(res.data.message);
        //fetchFrenchieseDataApi();
        fetchStateDataApi();
        setEditModalVisible(false);
        setFranchiseData({
          fname: "",
          lname: "",
          email: "",
          phone: "",
          selectedState: "",
          gender: "",
        });
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
    console.log(editFranchiseData);
  };

  const inputChangeValue = (event) => {
    const { name, value } = event.target;
    setFranchiseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const genderChange = (name, value) => {
    setFranchiseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const genderChangeValue = (value) => {
    genderChange("gender", value);
  };

  // const selectStateFromDeopDown = (selectedState) => {
  //   const selectedStateData = allState.states.find(state => state.state === selectedState);
  //   if (selectedStateData) {
  //     setFranchiseData({
  //       ...editFranchiseData,
  //       state: selectedState,
  //       city: [], // Use districts as cities for the selected state
  //     });
  //   }
  // };
  const selectStateFromDeopDown = (selectedStates) => {
    setFranchiseData({ ...editFranchiseData, state: selectedStates });
  };

  const callApiToVerifyState = (stateVerify) => {
    Modal.confirm({
      title: "Verify SHO",
      content: `Are you sure you want to  verify SHO?`,
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
          id: myID,
          isVerify: stateVerify,
        };
        axios
          .post(`${apiurl}` + "/admin/verify-state", data, config)
          .then((res) => {
            message.success(res.data.message);
            fetchStateDataApi();
          })
          .catch((err) => {
            message.warning("Something went wrong!");
          });
      },
      onCancel() {
        console.log("verify cancelled");
      },
    });
  };

  const updateList = (data) => {
    console.log("hiiiiiiiiiiiiii");
    fetchStateDataApi();
  };
  const downloadAadharCardFrontSide = (aadharCardFrontSideImage) => {
    const link = document.createElement("a");
    link.href = aadharCardFrontSideImage;
    link.download = "image.jpg";
    link.click();
  };

  function downloadAadharCardBackSide(imageUrl) {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "aadhar-card-back.png";
    link.click();
  }

  const downloadPanCard = (panCardImage) => {
    const link = document.createElement("a");
    link.href = panCardImage;
    link.download = "image.jpg";
    link.click();
  };

  const searchUser = (value) => {
    console.log(value, "value");

    setSearchText(value);

    const searchNumber = Number(value); // Convert search value to a Number

    console.log(stateData, "state daat is coming");

    const filteredData = stateData.filter((record) => {
      // Search by number field
      if (record.phone === searchNumber) {
        // Replace "numberField" with your actual field name
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
    console.log(filteredData, "this is filtered data");
    setFilteredDataSource(filteredData);
  };

  const gotoDashboard = () => {
    navigate("/admindashboard/dashboard");
  };

  const isScreenLessThan768px = window.innerWidth < 768;

  const style = {
    width: isScreenLessThan768px ? "100%" : "40%",
  };
  return (
    <>
      <StateRegister
        isModalVisible={isModalVisible}
        closeModal={closeModal}
        updateData={updateList}
      />
      <div className="new-renewal-container">
        <div className="new-renewal-header">
          <div className="new-renewal-content">
            <p>
              {" "}
              <BiArrowBack
                onClick={gotoDashboard}
                style={{ cursor: "pointer" }}
              />
              &nbsp;BMM
            </p>
            <Search
              placeholder="Enter search text"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={searchUser}
              style={style}
            />

            <Button type="primary" onClick={showModal}>
              <AiFillPlusCircle /> &nbsp;&nbsp;Add BMM
            </Button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <Table
            // dataSource={stateData}
            dataSource={filteredDataSource}
            columns={columns}
            pagination={{ pageSize: 7 }}
            scroll={{ x: true, y: true }}
            style={{
              flex: 1,
              overflow: "auto",
              maxWidth: "100%",
              marginTop: "1rem",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          />
        </div>
        {/* view model */}

        {visible ? (
          <Modal
            title={
              <h6
                style={{
                  color: "#007BFF",
                  fontWeight: 700,
                  fontFamily: "Calibri",
                  fontSize: "18px",
                }}
              >
                View Document Details:
              </h6>
            }
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <div className="d-flex">
              <div>
                <label htmlFor="adhar-front-image">Adhar Front Side</label>
                <input
                  id="adhar-front-image"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleAdharFrontImageChange}
                  title="Adhar Front Side"
                />
                <label htmlFor="adhar-front-image">
                  <img
                    src={aadharCardFront.placeholder}
                    height={200}
                    width={300}
                    alt="Selected Image"
                    style={{ cursor: "pointer" }}
                  />
                </label>
                <Button
                  // disabled={uploadButton}
                  onClick={uploadAadharCardFrontSide}
                >
                  Upload
                </Button>
                <Button
                  className="id-card"
                  disabled={!loading}
                  type="primary"
                  onClick={() =>
                    downloadAadharCardFrontSide(aadharCardFront.placeholder)
                  }
                >
                  Download
                </Button>
              </div>
            </div>

            <hr />

            <div className="d-flex">
              <div>
                <label htmlFor="adhar-back-image">Adhar Back Side</label>
                <input
                  id="adhar-back-image"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleAdharBackImageChange}
                  title="Adhar Back Side"
                />

                <label htmlFor="adhar-back-image">
                  <img
                    src={aadharCardBack.placeholder}
                    height={200}
                    width={300}
                    alt="Selected Image"
                    style={{ cursor: "pointer" }}
                  />
                </label>
                <Button
                  // disabled={uploadButton}
                  onClick={uploadAadharCardBackSide}
                >
                  Upload
                </Button>
                <Button
                  className="id-card"
                  disabled={!loading}
                  type="primary"
                  onClick={() =>
                    downloadAadharCardBackSide(aadharCardBack.placeholder)
                  }
                >
                  Download
                </Button>
              </div>
            </div>
            <hr />

            <div className="d-flex">
              <div>
                <label htmlFor="pan-image">Pan Card</label>
                <input
                  id="pan-image"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleImageChangePan}
                  title="Pan Card"
                />

                <label htmlFor="pan-image">
                  <img
                    src={panCard.placeholder}
                    height={200}
                    width={300}
                    alt="Selected Image"
                    style={{ cursor: "pointer" }}
                  />
                </label>
                <Button
                  //  disabled={uploadButtonPan}
                  onClick={uploadPan}
                >
                  Upload
                </Button>
                <Button
                  className="id-card"
                  disabled={!loading}
                  type="primary"
                  onClick={() => downloadPanCard(panCard.placeholder)}
                >
                  Download
                </Button>
              </div>
            </div>
            <hr />
          </Modal>
        ) : (
          ""
        )}

        {/* edit model   */}
        {editModalVisible ? (
          <Modal
            title={
              <h6
                style={{
                  color: "#007BFF",
                  fontWeight: 700,
                  fontFamily: "Calibri",
                  fontSize: "18px",
                }}
              >
                Edit Details
              </h6>
            }
            open={editModalVisible}
            onOk={submitEditForm}
            onCancel={closeEditModal}
            okText="Submit"
          >
            <Form.Item
              label="Fname:"
              style={{ color: "black", fontWeight: 700 }}
            >
              <Input
                placeholder="First name.."
                name="fname"
                onChange={inputChangeValue}
                type="text"
                value={editFranchiseData.fname}
              />
            </Form.Item>
            <Form.Item
              label="Lname:"
              style={{ color: "black", fontWeight: 700 }}
            >
              <Input
                placeholder="Last name"
                name="lname"
                onChange={inputChangeValue}
                type="text"
                value={editFranchiseData.lname}
              />
            </Form.Item>
            <Form.Item
              label="Email:"
              style={{ color: "black", fontWeight: 700 }}
            >
              <Input
                placeholder="Email"
                name="email"
                onChange={inputChangeValue}
                type="email"
                value={editFranchiseData.email}
              />
            </Form.Item>
            <Form.Item
              label="Phone:"
              style={{ color: "black", fontWeight: 700 }}
            >
              <Input
                placeholder="Phone"
                name="phone"
                onChange={inputChangeValue}
                type="text"
                value={editFranchiseData.phone}
              />
            </Form.Item>
            <Form.Item
              label="Gender"
              style={{ color: "black", fontWeight: 700 }}
            >
              <Select
                value={editFranchiseData.gender}
                style={{ width: 120 }}
                onChange={genderChangeValue}
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="State"
              style={{ color: "black", fontWeight: 700 }}
            >
              <Select
                mode="multiple"
                style={{ width: 200 }}
                value={editFranchiseData.state}
                onChange={selectStateFromDeopDown}
              >
                {allState.states.map((state) => (
                  <Option key={state.state} value={state.state}>
                    {state.state}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Modal>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default State;

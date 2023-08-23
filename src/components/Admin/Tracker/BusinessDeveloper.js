import React, { useEffect, useState } from "react";
import "../css/NewRenewal.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { Button, Table, Menu, Dropdown, Modal, message } from "antd";
import BusinessDeveloperRegister from "./Register/BusinessDeveloperRegister";
import axios from "axios";
import { BsThreeDotsVertical } from "react-icons/bs";

const BusinessDeveloper = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bussinessData, setbussinessData] = useState([]);
  const [isBlocked, setIsBlock] = useState(true);
  const [myID, setMyID] = useState("");

  useEffect(() => {
    fetchBussinesDeveloperDataApi();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "fname",
      key: "fname",
    },
    {
      title: "Last Name",
      dataIndex: "lname",
      key: "lname",
    },
    {
      title: "BussinessId",
      dataIndex: "businessDeveloperId",
      key: "businessDeveloperId",
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
      title: "Reffered Id",
      dataIndex: "referredId",
      key: "referredId",
    },
    {
      title: "Refferal Id",
      dataIndex: "referralId",
      key: "referralId",
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
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Dropdown overlay={menu} placement="bottomLeft" trigger={["click"]}>
          <BsThreeDotsVertical
            size={24}
            onClick={() => trigerAction(record._id, record.isBlocked)}
            style={{ cursor: "pointer" }}
          />
        </Dropdown>
      ),
    },
  ];
//token
  const token = localStorage.getItem("adminToken");
  const stateToken = localStorage.getItem("stateHandlerToken");
  const frenchiseToken = localStorage.getItem("franchiseToken");
  //referralId
  const stateHandlerRefferalID = localStorage.getItem("stateHandlerRefferalID");
  const franchiseRefferal = localStorage.getItem("franchiseRefferal");

  console.log("statedata=====>",stateToken,stateHandlerRefferalID);

  const fetchBussinesDeveloperDataApi = () => {

    if(token){

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .get("/admin/fetch-all-businessDeveloper", config)
        .then((res) => {
          console.log("Bussiness respone -> ", res.data);
          setbussinessData(res.data.data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    } else if (stateToken && stateHandlerRefferalID){
      const config = {
        headers: { Authorization: `Bearer ${stateToken}` },
      };

      const requestData = {
        stateReferralId: stateHandlerRefferalID,
      };
      axios
      .post("/state/fetch-all-business-developers-in-state",requestData, config)
      .then((res) => {
        console.log("Bussiness responebhejo -> ", res.data);
        setbussinessData(res.data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
      
    } else if (frenchiseToken && franchiseRefferal){
      const config = {
        headers: { Authorization: `Bearer ${frenchiseToken}` },
      };

      const requestData = {
        franchiseReferralId: franchiseRefferal,
      };
      axios
      .post("/franchise/get-all-business-developer-in-franchise",requestData, config)
      .then((res) => {
        console.log("Bussiness responebhejo -> ", res.data);
        setbussinessData(res.data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
    }
  };

  // handle action
  const trigerAction = (id, block) => {
    setMyID(id);
    setIsBlock(block);
  };
  const handleMenuClick = (e) => {
    console.log(e.key);

    if (e.key === "block") {
      blockUnblock(myID);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {/* <Menu.Item key="verify">Verify</Menu.Item> */}
      <Menu.Item key="view">View</Menu.Item>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="block">{isBlocked ? "Unblock" : "Block"}</Menu.Item>
      <Menu.Item key="delete">Delete</Menu.Item>
    </Menu>
  );

  const blockUnblock = (id) => {
    const actionText = isBlocked ? "Unblock" : "Block";
    Modal.confirm({
      title: `${actionText} Business Developer`,
      content: `Are you sure you want to  ${actionText.toLowerCase()} this member?`,
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
          .post("/admin/block-business-developer-by-admin", data, config)
          .then((res) => {
            message.success(res.data.message);
            fetchBussinesDeveloperDataApi();
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

  return (
    <>
      <BusinessDeveloperRegister
        isModalVisible={isModalVisible}
        closeModal={closeModal}
      />
      <div className="new-renewal-container">
        <div className="new-renewal-header">
          <div className="new-renewal-content">
            <p>Business Developer</p>
            <Button type="primary" onClick={showModal}>
              <AiFillPlusCircle /> &nbsp;&nbsp;Add Business Developer
            </Button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
         {token || (stateToken && stateHandlerRefferalID) ||  (frenchiseToken && franchiseRefferal)?
            <Table
            dataSource={bussinessData}
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
          />: null 
        }
        </div>
      </div>
    </>
  );
};

export default BusinessDeveloper;

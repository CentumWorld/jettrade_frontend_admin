import React, { useEffect, useState } from "react";
import "../css/NewRenewal.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { Button, Table, Dropdown, Menu,Modal ,message} from "antd";
import FrenchieRegister from "./Register/FrenchieRegister";
import axios from "axios";
import { BsThreeDotsVertical } from 'react-icons/bs';

const Frenchie = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [frenchieData, setFrenchieData] = useState([]);
  const [isBlocked, setIsBlock] = useState(true);
  const [myID, setMyID] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    fetchFrenchieseDataApi();
  }, []);

  const columns = [
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
      title: "Franchise Id",
      dataIndex: "frenchiseId",
      key: "frenchiseId",
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
      title: "Referal Id",
      dataIndex: "referralId",
      key: "referralId",
    },
    {
      title: "Reffered Id",
      dataIndex: "referredId",
      key: "referredId",
    },
    {
      title: "City",
      dataIndex: "franchiseCity",
      key: "franchiseCity",
    },
    {
      title: 'Status', dataIndex: 'isBlocked', render: (isBlocked) => {
        const cellStyle = isBlocked ? { color: 'red' } : { color: 'green' };
        return <span style={cellStyle}>{isBlocked ? 'Blocked' : 'Not Blocked '}</span>;
      },
    },
    {
      title: 'Action', dataIndex: 'action',
      render: (_, record) => (
        <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
          <BsThreeDotsVertical size={24} onClick={() => trigerAction(record._id, record.isBlocked)} style={{ cursor: 'pointer' }} />
        </Dropdown>
      ),

    }
  ];

  const token = localStorage.getItem("adminToken");

  const stateToken = localStorage.getItem("stateHandlerToken");
  const stateHandlerRefferalID = localStorage.getItem(
    "stateHandlerRefferalID"
  );
  console.log("===============>",stateToken,stateHandlerRefferalID);

  const fetchFrenchieseDataApi = () => {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .get("/admin/fetch-all-frenchise", config)
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
        .post("/state/fetch-all-franchise-in-state", requestData, config)
        .then((res) => {
          console.log("Franchise in state response -----> ", res.data);
          setFrenchieData(res.data.data)
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }; 

  return (
    <>
      <FrenchieRegister
        isModalVisible={isModalVisible}
        closeModal={closeModal}
      />
      <div className="new-renewal-container">
        <div className="new-renewal-header">
          <div className="new-renewal-content">
            <p>Frenchie</p>
            <Button type="primary" onClick={showModal}>
              <AiFillPlusCircle /> &nbsp;&nbsp;Add Frenchie
            </Button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {token ||  (stateToken && stateHandlerRefferalID) ?
            <Table
              dataSource={frenchieData}
              columns={columns}
              pagination={{ pageSize: 7 }}
              scroll={{ x: true, y: true }}
              style={{
                flex: 1,
                overflow: "auto",
                maxWidth: "100%",
                marginTop: "1rem",
              }}
            />:null
            }
        </div>
      </div>
    </>
  );
};

export default Frenchie;


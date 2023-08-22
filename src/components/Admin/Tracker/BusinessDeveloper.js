import React, { useEffect, useState } from "react";
import "../css/NewRenewal.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { Button, Table } from "antd";
import BusinessDeveloperRegister from "./Register/BusinessDeveloperRegister";
import axios from "axios";

const BusinessDeveloper = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bussinessData, setbussinessData] = useState([]);

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
  ];

  const fetchBussinesDeveloperDataApi = () => {
    const token = localStorage.getItem("adminToken");
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

        <div
          style={{display: "flex", flexDirection: "column" }}
        >
          <Table
            dataSource={bussinessData}
            columns={columns}
            pagination={{ pageSize: 7 }}
            scroll={{x: true, y:true}}
            style={{
              flex: 1,
              overflow: "auto",
              maxWidth: "100%",
              marginTop: "1rem",
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          />
        </div>
      </div>
    </>
  );
};

export default BusinessDeveloper;

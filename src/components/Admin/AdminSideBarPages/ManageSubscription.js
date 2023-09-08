import React, { useEffect, useState } from "react";
import "../css/ManageSubscription.css";
import axios from "axios";
import { Table, Modal, Row, Col, Select, Input, Menu, Dropdown, message, Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { BsThreeDotsVertical } from "react-icons/bs";
import baseUrl from "../../../baseUrl";

const { Option } = Select;

const apiurl = baseUrl.apiUrl;

const ManageSubscription = () => {
  const [data, setData] = useState([]);
  const [myID, setMyID] = useState("");
  const [userStatus, setUserStatus] = useState(false);
  const [dropDownValue, setDropDownValue] = useState('All');
  const [searchButtonVisible, setSearchButtonVisible] = useState(false);
  const [userIDForFilter,setUserIDForFilter] = useState('');

  //isBlock
  const [isBlocked, setIsBlock] = useState(true);

  // const [filteredDataSource, setFilteredDataSource] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('adminToken') || localStorage.getItem("subAdminToken")
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.get(
        `${apiurl}` + "/admin/fetch-user-details", config
      );
      setData(response.data.result);
      console.log(response.data.result);
      // setFilteredDataSource(response.data.result);
      // setLength(response.data.result.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleVerifyClick = (id) => {
    const token = localStorage.getItem("adminToken");
    let data = {
      id: id,
      status: true,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Set the 'Authorization' header with the token
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

  const columns = [
    { title: "User ID", dataIndex: "userid", key: "userid" },
    { title: "First Name", dataIndex: "fname", key: "fname" },
    { title: "Last Name", dataIndex: "lname", key: "lname" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "DOJ(mm/dd/yy)",
      dataIndex: "doj",
      render: (doj) => {
        const formattedDate = new Date(doj).toLocaleDateString();
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "Expiry(mm/dd/yy)",
      dataIndex: "doj",
      render: (doj) => {
        const formattedDate = new Date(doj);
        const addYear = formattedDate.setFullYear(
          formattedDate.getFullYear() + 1
        );
        const finalYear = new Date(addYear).toLocaleDateString();
        return <span>{finalYear}</span>;
      },
    },
    //  { title: 'Subscription', dataIndex: 'paymentStatus', key: 'paymentStatus' },
    {
      title: "Subscription",
      dataIndex: "paymentStatus",
      render: (paymentStatus, record) => {
        const { paymentCount } = record;
        let cellStyle = 'red';
        if(paymentStatus && paymentCount > 0 ){
         cellStyle = { color: "green" };
        }else if(!paymentStatus && paymentCount ){
           cellStyle = { color: "red" };
        }else{
           cellStyle = { color: "#F6BE00" };
        }
        // const cellStyle = paymentStatus ? { color: "green" } : { color: "red" };
        return (
          <span style={cellStyle}>
            {paymentStatus && paymentCount > 0 ? "Running" : ""}
            {!paymentStatus && paymentCount > 0 ? "Expired":""}
            {!paymentStatus && paymentCount === 0 ? "Trial":""}
          </span>
          
        );
      },
    },
    // { title: 'Reffered ID', dataIndex: 'reffered_id', key: 'reffered_id' },
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
      title: "Block/Not Block",
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
        <>
          <Dropdown overlay={menu} placement="bottomLeft" trigger={["click"]}>
            <BsThreeDotsVertical
              size={24}
              onClick={() =>
                trigerAction(record._id, record.status, record.isBlocked)
              }
              style={{ cursor: "pointer" }}
            />
          </Dropdown>
        </>
      ),
    },
  ];

  // handle action
  const trigerAction = (id, status, block) => {
    setMyID(id, block);
    setUserStatus(status);
    setIsBlock(block);
  };
  const handleMenuClick = (e) => {
    console.log(e.key);
    if (e.key === "verify") {
      handleVerifyClick(myID);
    }
    // if (e.key === 'view') {

    //     handleViewClick(myID)
    // }
    // if (e.key === 'edit') {
    //     editModal()
    //     fetchUserDetailsForEdit(myID)
    //     console.log(myID)
    // }
    // if (e.key === 'delete') {
    //     confirmDelete(myID);
    // }
    if (e.key === "block") {
      blockUnblock(myID);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="verify" disabled={userStatus}>
        Verify
      </Menu.Item>
      {/* <Menu.Item key="view">View</Menu.Item> */}
      {/* <Menu.Item key="edit">Edit</Menu.Item> */}
      <Menu.Item key="block">{isBlocked ? "Unblock" : "Block"}</Menu.Item>
    </Menu>
  );

  //block  or unblock

  const blockUnblock = (id) => {
    const actionText = isBlocked ? "Unblock" : "Block";
    Modal.confirm({
      title: `${actionText} User`,
      content: `Are you sure you want to  ${actionText.toLowerCase()} this User?`,
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
        console.log("Deletion cancelled");
      },
    });
  };

  const handleDropDown = (value) => {
    setDropDownValue(value)
      callApiToFilterDataByRunningStage(value);
    if(value === 'All' ){
      fetchData();
    }  
    if (value === '') {
      setSearchButtonVisible(true)
    }
  }

  const callApiToFilterDataByRunningStage = (data)=>{
    const token = localStorage.getItem("adminToken") || localStorage.getItem('subAdminToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
    axios.get(`${apiurl}` + "/admin/find_Users_On_The_Basis_Of_Payment_Status",config)
    .then((res)=>{
      console.log(res.data);
      if(data === 'Runnig Stage'){
        setData(res.data.runningUsers)
      }else if(data === 'Trial Stage'){
        setData(res.data.inactiveUsers)
      }else if(data === 'Expired Stage'){
        setData(res.data.expiredUsers)
      }
      
    })
    .catch((err=>{
      console.log(err.response.data.message)
    }))
  }


  const handleUserIDInputFunction = (e)=>{
    setUserIDForFilter(e.target.value);
    setDropDownValue(e.target.value)
  }
  const callApiTOSigleSubscriptionUser = () =>{
    let data = {
      userid:dropDownValue
    }
    console.log(data);
    const token = localStorage.getItem("adminToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios.post(`${apiurl}` + "/admin/fetch_particular_user_payment_Status",data,config)
    .then((res)=>{
      console.log(res.data.user)
      setData([res.data.user])
    })
    .catch((err=>{
        message.warning(err.response.data.message)
    }))
  }

  return (
    <>
      {/* <div className="manage-subscription-page"> */}
      {/* <div className="manage-subscription-card"> */}
      <div className="manage-subscription-heading">
        <div className="manage-subscription-navbar">
          <p> Manage Subscription</p>
          <div className="searcing-Box">
            <Input
              placeholder="Search by userid"
              style={{ width: '150px', background:'white' }}
              value={dropDownValue}
              disabled={!searchButtonVisible}
              onChange={handleUserIDInputFunction}
            />

            {searchButtonVisible ? <Button onClick={callApiTOSigleSubscriptionUser}>Search</Button> :
              <Select defaultValue="Select Stage" style={{ width: 150 }} onChange={handleDropDown}>
                <Option value="All">All</Option>
                <Option value="Runnig Stage">Running Stage</Option>
                <Option value="Trial Stage">Trial Stage</Option>
                <Option value="Expired Stage">Expired Stage</Option>
                <Option value="">Search by user ID</Option>
              </Select>
            }
          </div>


        </div>

        <div className="user-subscription-table">
          <Table
            // dataSource={filteredDataSource}
            style={{textOverflow:'ellipsis', whiteSpace:'nowrap'}}
            dataSource={data}
            columns={columns}
            scroll={{
              x: true,
              y: 360,
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            pagination={{ pageSize: 7 }}
          />
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
      <ToastContainer />
    </>
  );
};

export default ManageSubscription;

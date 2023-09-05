import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/DisplayCard.css";
import axios from "axios";
import baseUrl from "../../../baseUrl";
import RunningProgressiveBar from "./RunningProgressiveBar";
import TrialProgressiveBar from "./TrialProgressiveBar";
import ExpireProgressiveBar from "./ExpireProgressiveBar";
import { BsWallet2 } from 'react-icons/bs'
import { Modal, Input, message, Button, Tabs, Radio, Dropdown, Menu } from 'antd'
import { FaRupeeSign } from 'react-icons/fa';



const apiurl = baseUrl.apiUrl;
const { TabPane } = Tabs;

const DisplayCard = () => {

  const navigate = useNavigate();
  const [adminDetails, setAdminDetails] = useState({
    adminid: "",
  });

  const isAdmin = localStorage.getItem("adminToken");
  const isStateHandler = localStorage.getItem("stateHandlerToken");
  const isBusinessHandler = localStorage.getItem("bussinessAdminToken");
  const isFrenchise = localStorage.getItem('franchiseToken')

  const [totalAmount, setTotalAmount] = useState(0);
  const [stateHandlerTotalWallet, setStateHandlerTotalWallet] = useState(0);
  const [stateUpiId, setStateUpiId] = useState([]);
  const [frenchiseUpiId, setFrenchiseUpiId] = useState([]);
  const [selectStateUpiId, setSelectedUpiId] = useState('');
  const [stateBankDetails, setStateBankDetails] = useState([]);
  const [progressiveBar, setProgressigeBar] = useState({
    totalCount: 0,
    runningCount: 0,
    trialCount: 0,
    expireCount: 0,
    runningPercentage: 0,
    trialPercentage: 0,
    expirePercentage: 0,
  });
  const [withdrawalStateAmount, setWithdrawalAmount] = useState(0);
  const [openStateHandlerModal, setOpenStateHandlerModal] = useState(false);


  const handleMenuClick = (e) => {
    console.log(e.key);
    if (e.key === "chat-with-admin") {
      //openUserLoginFuction();
      navigate("/admindashboard/chat/frenchisee-handler-chat");
    }
    if (e.key === "chat-with-sho") {
      //console.log("hii");
      // <NavLink to="/user-registration">Sign Up</NavLink>
      navigate("/admindashboard/chat/frenchise-chat-with-SHO");
    }
    if (e.key === "chat-with-bd") {
      navigate("/admindashboard/chat/frenchise-chat-with-BD");
    }
  };

  const handleStateMenuClick = (e) => {
    console.log(e.key);
    if (e.key === "chat-with-admin") {
      //openUserLoginFuction();
      navigate("/admindashboard/chat/state-handler-chat");
    }
    if (e.key === "chat-with-frenchise") {
      //console.log("hii");
      // <NavLink to="/user-registration">Sign Up</NavLink>
      navigate("/admindashboard/chat/state-chat-with-french");
    }
    
  };

  // State handler  chat menu
  const stateMenu = (
    <Menu onClick={handleStateMenuClick}>
      <Menu.Item key="chat-with-admin">Chat with Admin</Menu.Item>
      <Menu.Item key="chat-with-frenchise">Chat with Frenchise</Menu.Item>
    </Menu>
  );

  // Frenchise chat menu
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="chat-with-admin">Chat with Admin</Menu.Item>
      <Menu.Item key="chat-with-sho">Chat with SHO</Menu.Item>
      <Menu.Item key="chat-with-bd">Chat with BD</Menu.Item>
    </Menu>
  );


  useEffect(() => {
    setAdminDetails({ adminid: localStorage.getItem("adminId") });
    callApiToSubscriptionCharge();
    callApiToTotalUserRunningTrialExpire();
    callApiToStateUpiDetails();
    callApiToFrenchiseUpiDetails();
    callApiToBusinessDUpiDetails();
    callApitoStateBankDetails();
    callApiToFrenchiseBankDetails();
    callApiToBusinessDBankDetails();
  }, []);

  // joinChat
  const joinChatTrader = () => {
    navigate("/admindashboard/trader-chat");
  };
  const joinChatRefferal = () => {
    navigate("/admindashboard/refferal-chat");
  };

  // tradingChartView
  const tradingChartView = () => {
    navigate("/admindashboard/chart");
  };

  // viewUserDetails
  const viewUserDetails = () => {
    navigate("/admindashboard/user");
  };

  // viewRefferalrDetails
  const viewRefferalrDetails = () => {
    navigate("/admindashboard/refferal");
  };

  // viewWithdrawal
  const viewWithdrawal = () => {
    navigate("/admindashboard/withdrawal");
  };

  // pushNotification
  const pushNotification = () => {
    navigate("/admindashboard/manage/push-notification");
  };

  // viewSubscription
  const viewSubscription = () => {
    navigate("/admindashboard/manage/subscription");
  };

  // refferalPayoutTrader
  const refferalPayoutTrader = () => {
    navigate("/admindashboard/manage/investor-refferal-payout");
  };

  // refferalPayoutRefferal
  const refferalPayoutRefferal = () => {
    navigate("/admindashboard/manage/member-refferal-payout");
  };

  const goToRegister = () => {
    navigate("/admindashboard/createuser");
  };


  const closeStatePaymentModal = () => {
    setOpenStateHandlerModal(false);
    setSelectedUpiId(null)
  }


  const callApiToSubscriptionCharge = () => {
    const token = localStorage.getItem("adminToken");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    if(isAdmin){
      axios
      .get(
        `${apiurl}` + "/admin/admin-sum-of-all-new-renewal-user-amount",
        config
      )
      .then((res) => {
        console.log(res.data.totalSubscriptionAmount);
        const formattedRupees = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(res.data.totalSubscriptionAmount);
        setTotalAmount(formattedRupees);
      })
      .catch((err) => {
        console.log(err);
      });
    }
   
  };
  const callApiToTotalUserRunningTrialExpire = () => {
    const token = localStorage.getItem("adminToken");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    if(isAdmin){
      axios
      .get(`${apiurl}` + "/admin/total_Count_Of_Payment_Status_Of_User", config)
      .then((res) => {
        setProgressigeBar({
          totalCount: res.data.totalCount,
          runningCount: res.data.runningCount,
          runnigPercentage: res.data.runningPercentage,
          trialCount: res.data.inactiveCount,
          trialPercentage: res.data.inactivePercentage,
          expireCount: res.data.expiredCount,
          expirePercentage: res.data.expiredPercentage,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    }
   
  };

  const openWithrawalModalFunction = () => {
    if (isStateHandler) {
      setOpenStateHandlerModal(true);
      const config = {
        headers: { Authorization: `Bearer ${isStateHandler}` },
      };
      axios
        .get(`${apiurl}` +"/state/get-own-state-details", config)
        .then((res) => {
          setStateHandlerTotalWallet(res.data.data.stateHandlerWallet);
        })
        .catch((err) => {
          console.log(err.response.data.massage);
        });
    } else if (isBusinessHandler) {
      setOpenStateHandlerModal(true);
      const config = {
        headers: { Authorization: `Bearer ${isBusinessHandler}` },
      };
      axios
        .get(`${apiurl}` +"/businessDeveloper/get-own-business-developer-details", config)
        .then((res) => {
          setStateHandlerTotalWallet(res.data.data.businessDeveloperWallet);
        })
        .catch((err) => {
          console.log(err.response.data.massage);
        });
    }
    else if (isFrenchise) {
      setOpenStateHandlerModal(true);
      const config = {
        headers: { Authorization: `Bearer ${isFrenchise}` },
      };
      axios
        .get(`${apiurl}` +"/franchise/get-own-franchise-details", config)
        .then((res) => {
          setStateHandlerTotalWallet(res.data.data.frenchiseWallet);
        })
        .catch((err) => {
          console.log(err.response.data.massage);
        });
    }
  };
  const withdrawalAmountSubmit = () => {
    let amount = Number(withdrawalStateAmount);
    if (isStateHandler) {
      const config = {
        headers: { Authorization: `Bearer ${isStateHandler}` },
      };
      let data = {
        stateHandlerId: localStorage.getItem("stateHandlerId"),
        amount: amount,
        paymentBy: selectStateUpiId
      };

      axios
        .post(`${apiurl}` +"/state/create-state-payment-request", data, config)
        .then((res) => {
          console.log(res.data);
          message.success(
            "Payment request successful, It will be credited within 48 hours."
          );
          setOpenStateHandlerModal(false);
          setWithdrawalAmount(0);
        })
        .catch((err) => {
          message.warning(err.response.data.message);
        });
    } else if (isBusinessHandler) {
      let amount = Number(withdrawalStateAmount);
      const config = {
        headers: { Authorization: `Bearer ${isBusinessHandler}` },
      };
      let data = {
        businessDeveloperId: localStorage.getItem("businessId"),
        amount: amount,
        paymentBy: selectStateUpiId
      };

      axios
        .post(
          `${apiurl}` +"/businessDeveloper/create-business-developer-payment-request",
          data,
          config
        )
        .then((res) => {
          console.log(res.data);
          message.success(
            "Payment request successful, It will be credited within 48 hours."
          );
          setOpenStateHandlerModal(false);
          setWithdrawalAmount(0);
        })
        .catch((err) => {
          message.warning(err.response.data.message);
        });
    }
    else if (isFrenchise) {
      let amount = Number(withdrawalStateAmount);
      const config = {
        headers: { Authorization: `Bearer ${isFrenchise}` },
      };
      let data = {
        franchiseId: localStorage.getItem("frenchiseId"),
        amount: amount,
        paymentBy: selectStateUpiId  // using the same state
      };

      axios
        .post(
          `${apiurl}` +"/franchise/create-franchise-payment-request",
          data,
          config
        )
        .then((res) => {
          console.log(res.data);
          message.success(
            "Payment request successful, It will be credited within 48 hours."
          );
          setOpenStateHandlerModal(false);
          setWithdrawalAmount(0);
        })
        .catch((err) => {
          message.warning(err.response.data.message);
        });
    }
  };

  // fetching upi  details

  const callApiToStateUpiDetails = () => {
    const config = {
      headers: { Authorization: `Bearer ${isStateHandler}` },
    };
    let data = {
      userId: localStorage.getItem("stateHandlerId")
    }
    if(isStateHandler){
      axios.post(`${apiurl}` +'/state/get-state-own-upi', data, config)
      .then((res) => {
        setStateUpiId(res.data.stateUpiId)
      })
      .catch((err) => {
        message.error(err.response.data.message)
      })
    }
    
  }

  // callApiToFrenchiseUpiDetails
  const callApiToFrenchiseUpiDetails = () => {
    const config = {
      headers: { Authorization: `Bearer ${isFrenchise}` },
    };
    let data = {
      userId: localStorage.getItem("frenchiseId")
    }
    if(isFrenchise){
      axios.post(`${apiurl}` +'/franchise/get-franchise-own-upi', data, config)
      .then((res) => {
        setStateUpiId(res.data.franchiseUpiId)
      })
      .catch((err) => {
        message.error(err.response.data.message)
      })
    }
   
  }

  // callApiToBuinsessDUpiDetails
  const callApiToBusinessDUpiDetails = () => {
    const config = {
      headers: { Authorization: `Bearer ${isBusinessHandler}` },
    };
    let data = {
      userId: localStorage.getItem("businessId")
    }
    if(isBusinessHandler){
      axios.post(`${apiurl}` +'/businessDeveloper/get-business-developer-own-upi', data, config)
      .then((res) => {
        setStateUpiId(res.data.businessDeveloperUpiId)
      })
      .catch((err) => {
        message.error(err.response.data.message)
      })

    }
  }

  const handleRadioChangeStateValue = (e) => {
    setSelectedUpiId(e.target.value);
    console.log(e.target.value)
  }

  // fetching state bank details
  const callApitoStateBankDetails = () => {
    const config = {
      headers: { Authorization: `Bearer ${isStateHandler}` },
    };
    let data = {
      userId: localStorage.getItem("stateHandlerId")
    }
    if(isStateHandler){
      axios.post(`${apiurl}` +'/state/get-state-own-bank-details', data, config)
      .then((res) => {
        console.log(res.data)
        setStateBankDetails(res.data.stateBankDetails)
      })
      .catch((err) => {
        console.log(err.response.data.message)
      })
    }
  }

  // callApiToFrenchiseBankDetails
  const callApiToFrenchiseBankDetails = () => {
    const config = {
      headers: { Authorization: `Bearer ${isFrenchise}` },
    };
    let data = {
      userId: localStorage.getItem("frenchiseId")
    }
    if(isFrenchise){
      axios.post(`${apiurl}` +'/franchise/get-franchise-own-bank-details', data, config)
      .then((res) => {
        console.log(res.data)
        setStateBankDetails(res.data.franchiseBankDetails)
      })
      .catch((err) => {
        console.log(err.response.data.message)
      })
    }
  }

  // callApiToBusinessDBankDetails
  const callApiToBusinessDBankDetails = () => {
    const config = {
      headers: { Authorization: `Bearer ${isBusinessHandler}` },
    };
    let data = {
      userId: localStorage.getItem("businessId")
    }
    if(isBusinessHandler){
      axios.post(`${apiurl}` +'/businessDeveloper/get-business-developer-own-bank-details', data, config)
      .then((res) => {
        console.log(res.data)
        setStateBankDetails(res.data.businessDeveloperBankDetails)
      })
      .catch((err) => {
        console.log(err.response.data.message)
      })
    }
  }

  return (
    <>
      <div className="card1-container">
        {isAdmin && (
          <div className="card1">
            <RunningProgressiveBar percent={progressiveBar} />
          </div>
        )}
        {isAdmin && (
          <div className="card1">
            <TrialProgressiveBar percent={progressiveBar} />
          </div>
        )}
        {isAdmin && (
          <div className="card1">
            <ExpireProgressiveBar percent={progressiveBar} />
          </div>
        )}
        {isAdmin && (
          <div className="card1">
            <div className="d-flex">
              <h6>UserID :</h6> &nbsp;&nbsp;{" "}
              <span style={{ color: "yellow" }}>{adminDetails.adminid}</span>
            </div>
            <div className="d-flex">
              <h6>Referral ID :</h6>&nbsp;&nbsp;{" "}
              <span
                style={{ color: "yellow", cursor: "pointer" }}
                onClick={goToRegister}
              >
                admin@123
              </span>
            </div>
          </div>
        )}
        <div className="card1">
          <div className="live-chat">
            <h6>Live Chat</h6>
          </div>
          {isAdmin && (
            <>
              <div className="d-flex">
                <h6>Trader:</h6>&nbsp;&nbsp;{" "}
                <span
                  style={{ color: "yellow", cursor: "pointer" }}
                  onClick={joinChatTrader}
                >
                  join
                </span>
              </div>
              <div className="d-flex">
                <h6>Referral:</h6>&nbsp;&nbsp;{" "}
                <span
                  style={{ color: "yellow", cursor: "pointer" }}
                  onClick={joinChatRefferal}
                >
                  join
                </span>
              </div>
            </>
          )}

          {isStateHandler && (
            <>
            <div className="live-chat">
              <Dropdown
                overlay={stateMenu}
                trigger={["click"]}
                placement="bottomCenter"
              >
                <span style={{ color: "yellow", cursor: "pointer" }}>Chat with</span>
              </Dropdown>
            </div>
            </>
          )}
          {isFrenchise && (
            <div className="live-chat">
              <Dropdown
                overlay={menu}
                trigger={["click"]}
                placement="bottomCenter"
              >
                <span style={{ color: "yellow", cursor: "pointer" }}>Chat with</span>
              </Dropdown>
            </div>
          )}
        </div>
        {isStateHandler || isBusinessHandler || isFrenchise ? (
          <div className="card1">
            <div className="live-chat">
              <h6>Withdrawal</h6>
            </div>

            <div className="trading-chart-view">
              <span
                style={{ color: "yellow", cursor: "pointer" }}
                onClick={openWithrawalModalFunction}
              >
                withdraw : <BsWallet2 />
              </span>
            </div>
          </div>
        ) : null}

        {
          isAdmin && (
            <div className="card1">
              <div className="trading-chart">
                <h6>Total Subscription Amount</h6>
              </div>
              <div className="trading-chart-view">
                <span style={{ color: "yellow", cursor: "pointer" }}>
                  {totalAmount}
                </span>
              </div>
            </div>
          )
        }

        <div className="card1">
          <div className="trading-chart">
            <h6>Trading Chart</h6>
          </div>
          <div className="trading-chart-view">
            <span
              style={{ color: "yellow", cursor: "pointer" }}
              onClick={tradingChartView}
            >
              View
            </span>
          </div>
        </div>
        <div className="card1">
          <div className="user-details">
            <h6>User Details</h6>
          </div>
          <div className="user-details-view">
            <span
              style={{ color: "yellow", cursor: "pointer" }}
              onClick={viewUserDetails}
            >
              View
            </span>
          </div>
        </div>
        <div className="card1">
          <div className="refferal-details">
            <h6>Referral Details</h6>
          </div>
          <div className="refferal-details-view">
            <span
              style={{ color: "yellow", cursor: "pointer" }}
              onClick={viewRefferalrDetails}
            >
              View
            </span>
          </div>
        </div>
        <div className="card1">
          <div className="push-notification-card">
            <h6>Push Notification</h6>
          </div>
          <div className="push-notification-card-view">
            <span
              style={{ color: "yellow", cursor: "pointer" }}
              onClick={pushNotification}
            >
              Push
            </span>
          </div>
        </div>
        <div className="card1">
          <div className="subscription-card">
            <h6>Subscription</h6>
          </div>
          <div className="subscription-card-view">
            <span
              style={{ color: "yellow", cursor: "pointer" }}
              onClick={viewSubscription}
            >
              View
            </span>
          </div>
        </div>

        <div className="card1">
          <div className="refferal-payout">
            <h6>Referral Payout</h6>
          </div>
          <div className="d-flex">
            <h6>Trader:</h6>&nbsp;&nbsp;{" "}
            <span
              style={{ color: "yellow", cursor: "pointer" }}
              onClick={refferalPayoutTrader}
            >
              View
            </span>
          </div>
          <div className="d-flex">
            <h6>Referral:</h6>&nbsp;&nbsp;{" "}
            <span
              style={{ color: "yellow", cursor: "pointer" }}
              onClick={refferalPayoutRefferal}
            >
              View
            </span>
          </div>
        </div>
      </div>

      {/* open state handler modal for payment */}
      <Modal
        title="Request here"
        open={openStateHandlerModal}
        onCancel={closeStatePaymentModal}
        onOk={withdrawalAmountSubmit}
        okText="Proceed"
        okButtonProps={{ disabled: !selectStateUpiId }}
      >
        <div className="state-available-balance">
          <p style={{ fontWeight: '600' }}>Available Balance :<FaRupeeSign />{stateHandlerTotalWallet}</p>
        </div>
        <div className="bank-method">
          <strong style={{ marginBottom: 0 }}>Select payment method</strong>
          <Tabs defaultActiveKey="1">
            <TabPane tab="BANK" key="1" style={{ marginBottom: 16 }}>
              <Radio.Group onChange={handleRadioChangeStateValue} value={selectStateUpiId}>
                {stateBankDetails.map((option) => (
                  <Radio key={option.bankName} value={option.bankName}>
                    {option.bankName}
                  </Radio>
                ))}
              </Radio.Group>
            </TabPane>
            <TabPane tab="UPI" key="2" style={{ marginBottom: 16 }} >
              <Radio.Group onChange={handleRadioChangeStateValue} value={selectStateUpiId}>
                {stateUpiId.map((option) => (
                  <Radio key={option.upiId} value={option.upiId}>
                    {option.upiId}
                  </Radio>
                ))}
              </Radio.Group>
            </TabPane>
          </Tabs>

        </div>
        <div className="payment-container">
          <div className="payment-div" onClick={() => setWithdrawalAmount(500)}>
            <FaRupeeSign />
            500
          </div>
          <div
            className="payment-div"
            onClick={() => setWithdrawalAmount(1000)}
          >
            <FaRupeeSign />
            1000
          </div>
          <div
            className="payment-div"
            onClick={() => setWithdrawalAmount(5000)}
          >
            <FaRupeeSign />
            5000
          </div>
        </div>
        <div className="state-enter-amount">
          <Input
            type="number"
            prefix={<FaRupeeSign />}
            placeholder="Enter Amount"
            value={withdrawalStateAmount}
            onChange={(e) => setWithdrawalAmount(e.target.value)}
          />
        </div>
        <small style={{ color: "red" }}>
          Request payment will be credited within 48 hours.
        </small>
      </Modal>
    </>
  );
};

export default DisplayCard;
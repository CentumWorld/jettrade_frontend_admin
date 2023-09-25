import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/DisplayCard.css";
import axios from "axios";
import baseUrl from "../../../baseUrl";
import RunningProgressiveBar from "./RunningProgressiveBar";
import TrialProgressiveBar from "./TrialProgressiveBar";
import ExpireProgressiveBar from "./ExpireProgressiveBar";
import { BsWallet2 } from "react-icons/bs";
import {FaCopy} from "react-icons/fa"
import {
  Modal,
  Input,
  message,
  Button,
  Tabs,
  Radio,
  Dropdown,
  Menu,
} from "antd";
import { FaRupeeSign } from "react-icons/fa";

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
  const isFrenchise = localStorage.getItem("franchiseToken");
  const isSubAdmin = localStorage.getItem("subAdminToken");

  const Id =
    localStorage.getItem("stateHandlerId") ||
    localStorage.getItem("adminId") ||
    localStorage.getItem("businessId") ||
    localStorage.getItem("frenchiseId");
  const ReferralId =
    localStorage.getItem("stateHandlerRefferalID") ||
    localStorage.getItem("adminRefferalId") ||
    localStorage.getItem("bussinessRefferalId") ||
    localStorage.getItem("franchiseRefferal");

  const [dayDifference, setDayDifference] = useState(0);

  const [totalAmount, setTotalAmount] = useState(0);
  const [stateHandlerTotalWallet, setStateHandlerTotalWallet] = useState(0);
  const [stateUpiId, setStateUpiId] = useState([]);
  const [frenchiseUpiId, setFrenchiseUpiId] = useState([]);
  const [selectStateUpiId, setSelectedUpiId] = useState("");
  const [stateBankDetails, setStateBankDetails] = useState([]);
  const [paymentModal, setPaymentModal] = useState(false);
  const [verifyDate, setVerifyDate] = useState("");
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
      navigate("/admindashboard/chat/state-chat-with-french");
    }
  };

  const handleAdminChatMenuClick = (e) => {
    console.log(e.key);
    if (e.key === "chat-with-traders") {
      //openUserLoginFuction();
      navigate("/admindashboard/trader-chat");
    }
    if (e.key === "chat-with-referrals") {
      //console.log("hii");
      // <NavLink to="/user-registration">Sign Up</NavLink>
      navigate("/admindashboard/refferal-chat");
    }
    if (e.key === "chat-with-state-handlers") {
      navigate("/admindashboard/state-chat");
    }
    if (e.key === "chat-with-frenchise") {
      navigate("/admindashboard/franchisee-chat");
    }
    if (e.key === "chat-with-business-developers") {
      navigate("/admindashboard/business-developer-chat");
    }
  };

  //  tracker detais
  const handleTrackerDetailsMenuClick = (e) => {
    console.log(e.key);
    if (e.key === "state-details") {
      //openUserLoginFuction();
      navigate("/admindashboard/tracker/state-tracer");
    }
    if (e.key === "frenchise-details") {
      navigate("/admindashboard/tracker/frenchie");
    }
    if (e.key === "business-developer-details") {
      navigate("/admindashboard/tracker/businness-developer");
    }
  };

  const handleBusinessChatMenuClick = (e) => {
    console.log(e.key);
    if (e.key === "chat-with-admin") {
      //openUserLoginFuction();
      navigate("/admindashboard/chat/businessD-chat");
    }
    if (e.key === "chat-with-frenchise") {
      navigate("/admindashboard/chat/BD-chat-with-frenchise");
    }
  };

  // Admin Chat menu
  const AdminChatMenu = (
    <Menu onClick={handleAdminChatMenuClick}>
      <Menu.Item key="chat-with-traders"> Traders</Menu.Item>
      <Menu.Item key="chat-with-referrals">Referrals</Menu.Item>
      <Menu.Item key="chat-with-state-handlers">State Handlers</Menu.Item>
      <Menu.Item key="chat-with-frenchise">Frenchise</Menu.Item>
      <Menu.Item key="chat-with-business-developers">
        Business Developers
      </Menu.Item>
    </Menu>
  );

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

  // Tracker menu
  const trackerMenu = (
    <Menu onClick={handleTrackerDetailsMenuClick}>
      <Menu.Item key="state-details">State Handler</Menu.Item>
      <Menu.Item key="frenchise-details">Franchise</Menu.Item>
      <Menu.Item key="business-developer-details">Business Developer</Menu.Item>
    </Menu>
  );

  // Business Chat menu
  const businessChatMenu = (
    <Menu onClick={handleBusinessChatMenuClick}>
      <Menu.Item key="chat-with-admin">Chat with Admin</Menu.Item>
      <Menu.Item key="chat-with-frenchise">Chat with Frenchise</Menu.Item>
    </Menu>
  );

  useEffect(() => {
    // setAdminDetails({ adminid: localStorage.getItem("adminId") });
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
    setSelectedUpiId(null);
  };

  const callApiToSubscriptionCharge = () => {
    const token = localStorage.getItem("adminToken");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    if (isAdmin) {
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
    if (isAdmin) {
      axios
        .get(
          `${apiurl}` + "/admin/total_Count_Of_Payment_Status_Of_User",
          config
        )
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

  const callApiToEligibaleWithdrawalForState = () => {
    console.log("opne");
    const config = {
      headers: { Authorization: `Bearer ${isStateHandler}` },
    };
    let data = {
      stateHandlerId: localStorage.getItem("stateHandlerId"),
    };
    axios
      .post(`${apiurl}` + "/state/eligible-for-withdrawal", data, config)
      .then((res) => {
        setPaymentModal(res.data.updatedState.firstPayment);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const callApiToEligibaleWithdrawalForFranchise = () => {
    console.log("opne");
    const config = {
      headers: { Authorization: `Bearer ${isFrenchise}` },
    };
    let data = {
      franchiseId: localStorage.getItem("frenchiseId"),
    };
    axios
      .post(
        `${apiurl}` + "/franchise/eligible-franchise-for-withdrawal",
        data,
        config
      )
      .then((res) => {
        console.log(res.data);
        setPaymentModal(res.data.updatedFranchise.firstPayment);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const callApiToEligibaleWithdrawalForBD = () => {
    console.log("opne");
    const config = {
      headers: { Authorization: `Bearer ${isBusinessHandler}` },
    };
    let data = {
      businessDeveloperId: localStorage.getItem("businessId"),
    };
    axios
      .post(
        `${apiurl}` +
          "/businessDeveloper/eligible-business-developer-for-withdrawal",
        data,
        config
      )
      .then((res) => {
        console.log(res.data);
        setPaymentModal(res.data.updatedBusinessDeveloper.firstPayment);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const openWithrawalModalFunction = () => {
    if (isStateHandler) {
      setOpenStateHandlerModal(true);
      const config = {
        headers: { Authorization: `Bearer ${isStateHandler}` },
      };
      axios
        .get(`${apiurl}` + "/state/get-own-state-details", config)
        .then((res) => {
          setPaymentModal(res.data.data.firstPayment);
          setStateHandlerTotalWallet(res.data.data.stateHandlerWallet);
          setVerifyDate(res.data.data.verifyDate);

          const isoDateString = res.data.data.verifyDate;
          const convertedDateString = isoDateString.substring(0, 10);
          console.log(convertedDateString);
          const currentDate = new Date();
          const date = new Date(convertedDateString);

          const differenceInMilliseconds = currentDate - date;
          const differenceInDays = Math.floor(
            differenceInMilliseconds / (1000 * 60 * 60 * 24)
          );
          setDayDifference(30 - differenceInDays);
          console.log(`Difference in days: ${differenceInDays}`);
          if (differenceInDays > 30) {
            callApiToEligibaleWithdrawalForState();
          }
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
        .get(
          `${apiurl}` + "/businessDeveloper/get-own-business-developer-details",
          config
        )
        .then((res) => {
          setStateHandlerTotalWallet(res.data.data.businessDeveloperWallet);
          console.log(res.data.data);
          setPaymentModal(res.data.data.firstPayment);
          setVerifyDate(res.data.data.verifyDate);

          const isoDateString = res.data.data.verifyDate;
          const convertedDateString = isoDateString.substring(0, 10);
          console.log(convertedDateString);
          const currentDate = new Date();
          const date = new Date(convertedDateString);

          const differenceInMilliseconds = currentDate - date;
          const differenceInDays = Math.floor(
            differenceInMilliseconds / (1000 * 60 * 60 * 24)
          );
          setDayDifference(7 - differenceInDays);
          console.log(`Difference in days: ${differenceInDays}`);

          if (differenceInDays > 7) {
            callApiToEligibaleWithdrawalForBD();
          }
        })
        .catch((err) => {
          console.log(err.response.data.massage);
        });
    } else if (isFrenchise) {
      setOpenStateHandlerModal(true);
      const config = {
        headers: { Authorization: `Bearer ${isFrenchise}` },
      };
      axios
        .get(`${apiurl}` + "/franchise/get-own-franchise-details", config)
        .then((res) => {
          setStateHandlerTotalWallet(res.data.data.frenchiseWallet);
          setPaymentModal(res.data.data.firstPayment);
          setVerifyDate(res.data.data.verifyDate);

          const isoDateString = res.data.data.verifyDate;
          const convertedDateString = isoDateString.substring(0, 10);
          console.log(convertedDateString);
          const currentDate = new Date();
          const date = new Date(convertedDateString);

          const differenceInMilliseconds = currentDate - date;
          const differenceInDays = Math.floor(
            differenceInMilliseconds / (1000 * 60 * 60 * 24)
          );
          setDayDifference(30 - differenceInDays);
          console.log(`Difference in days: ${differenceInDays}`);

          if (differenceInDays > 30) {
            callApiToEligibaleWithdrawalForFranchise();
          }
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
        paymentBy: selectStateUpiId,
      };

      axios
        .post(`${apiurl}` + "/state/create-state-payment-request", data, config)
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
        paymentBy: selectStateUpiId,
      };

      axios
        .post(
          `${apiurl}` +
            "/businessDeveloper/create-business-developer-payment-request",
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
    } else if (isFrenchise) {
      let amount = Number(withdrawalStateAmount);
      const config = {
        headers: { Authorization: `Bearer ${isFrenchise}` },
      };
      let data = {
        franchiseId: localStorage.getItem("frenchiseId"),
        amount: amount,
        paymentBy: selectStateUpiId, // using the same state
      };

      axios
        .post(
          `${apiurl}` + "/franchise/create-franchise-payment-request",
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
      userId: localStorage.getItem("stateHandlerId"),
    };
    if (isStateHandler) {
      axios
        .post(`${apiurl}` + "/state/get-state-own-upi", data, config)
        .then((res) => {
          setStateUpiId(res.data.stateUpiId);
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    }
  };

  // callApiToFrenchiseUpiDetails
  const callApiToFrenchiseUpiDetails = () => {
    const config = {
      headers: { Authorization: `Bearer ${isFrenchise}` },
    };
    let data = {
      userId: localStorage.getItem("frenchiseId"),
    };
    if (isFrenchise) {
      axios
        .post(`${apiurl}` + "/franchise/get-franchise-own-upi", data, config)
        .then((res) => {
          setStateUpiId(res.data.franchiseUpiId);
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    }
  };

  // callApiToBuinsessDUpiDetails
  const callApiToBusinessDUpiDetails = () => {
    const config = {
      headers: { Authorization: `Bearer ${isBusinessHandler}` },
    };
    let data = {
      userId: localStorage.getItem("businessId"),
    };
    if (isBusinessHandler) {
      axios
        .post(
          `${apiurl}` + "/businessDeveloper/get-business-developer-own-upi",
          data,
          config
        )
        .then((res) => {
          setStateUpiId(res.data.businessDeveloperUpiId);
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    }
  };

  const handleRadioChangeStateValue = (e) => {
    setSelectedUpiId(e.target.value);
    console.log(e.target.value);
  };

  // fetching state bank details
  const callApitoStateBankDetails = () => {
    const config = {
      headers: { Authorization: `Bearer ${isStateHandler}` },
    };
    let data = {
      userId: localStorage.getItem("stateHandlerId"),
    };
    if (isStateHandler) {
      axios
        .post(`${apiurl}` + "/state/get-state-own-bank-details", data, config)
        .then((res) => {
          console.log(res.data);
          setStateBankDetails(res.data.stateBankDetails);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    }
  };

  // callApiToFrenchiseBankDetails
  const callApiToFrenchiseBankDetails = () => {
    const config = {
      headers: { Authorization: `Bearer ${isFrenchise}` },
    };
    let data = {
      userId: localStorage.getItem("frenchiseId"),
    };
    if (isFrenchise) {
      axios
        .post(
          `${apiurl}` + "/franchise/get-franchise-own-bank-details",
          data,
          config
        )
        .then((res) => {
          console.log(res.data);
          setStateBankDetails(res.data.franchiseBankDetails);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    }
  };

  // callApiToBusinessDBankDetails
  const callApiToBusinessDBankDetails = () => {
    const config = {
      headers: { Authorization: `Bearer ${isBusinessHandler}` },
    };
    let data = {
      userId: localStorage.getItem("businessId"),
    };
    if (isBusinessHandler) {
      axios
        .post(
          `${apiurl}` +
            "/businessDeveloper/get-business-developer-own-bank-details",
          data,
          config
        )
        .then((res) => {
          console.log(res.data);
          setStateBankDetails(res.data.businessDeveloperBankDetails);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    }
  };
  const copyToClipboard = ()=>{
    navigator.clipboard.writeText(ReferralId);
    message.success('Text copied to clipboard: ' + ReferralId);
  };

  return (
    <>
      <div className="card1-container">
        {(isAdmin || isStateHandler || isFrenchise || isBusinessHandler) && (
          <div className="card1">
            <div className="d-flex">
              <h6>UserID :</h6> &nbsp;&nbsp;{" "}
              <span style={{ color: "yellow" }}>
                {isAdmin || isStateHandler || isFrenchise || isBusinessHandler
                  ? Id
                  : null}
              </span>
            </div>
            <div className="d-flex">
              <h6>Referral ID :</h6>&nbsp;&nbsp;{" "}
              <span
                style={{ color: "yellow", cursor: "pointer" }}
                onClick={isAdmin ? goToRegister : copyToClipboard}
              >
                {isAdmin || isStateHandler || isFrenchise || isBusinessHandler
                  ? ReferralId
                  : null} <FaCopy/>
              </span>
            </div>
          </div>
        )}

        {(isAdmin ||
          isSubAdmin ||
          isStateHandler ||
          isFrenchise ||
          isBusinessHandler) && (
          <div className="card1">
            <div className="centumo">
              <h6>CENTUMO Swap</h6>
            </div>
            <div className="centumo-link">
              <a
                href="https://centumo.centumworld.com/#/exchange/quick"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "yellow", cursor: "pointer" }}
              >
                Click me
              </a>
            </div>
          </div>
        )}

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

        {/* <div className="card1">
          <div className="live-chat">
            <h6>Live Chat</h6>
          </div>
          {isAdmin || isSubAdmin ? (
            <>

              <div className="live-chat">
                <Dropdown
                  overlay={AdminChatMenu}
                  trigger={["click"]}
                  placement="topCenter"
                >
                  <span style={{ color: "yellow", cursor: "pointer" }}>Chat with</span>
                </Dropdown>
              </div>
            </>
          ) : null}

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
          {isBusinessHandler && (
            <div className="live-chat">
              <Dropdown
                overlay={businessChatMenu}
                trigger={["click"]}
                placement="bottomCenter"
              >
                <span style={{ color: "yellow", cursor: "pointer" }}>Chat with</span>
              </Dropdown>
            </div>
          )}
        </div> */}
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

        {isAdmin && (
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
        )}

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
            <h6>Trader Details</h6>
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
            <h6>Member Details</h6>
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

        {isAdmin || isSubAdmin ? (
          <div className="card1">
            <div className="refferal-details">
              <h6>Tracker</h6>
            </div>
            <div className="live-chat">
              <Dropdown
                overlay={trackerMenu}
                trigger={["click"]}
                placement="topCenter"
              >
                <span style={{ color: "yellow", cursor: "pointer" }}>View</span>
              </Dropdown>
            </div>
          </div>
        ) : null}

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

          <div className="subscription-card">
            <span
              style={{ color: "yellow", cursor: "pointer" }}
              onClick={refferalPayoutTrader}
            >
              view
            </span>
          </div>
          {/* <div className="d-flex">
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
          </div> */}
        </div>
      </div>

      {/* open state handler modal for payment */}
      {paymentModal ? (
        <Modal
          title="Request here"
          open={openStateHandlerModal}
          onCancel={closeStatePaymentModal}
          onOk={withdrawalAmountSubmit}
          okText="Proceed"
          okButtonProps={{ disabled: !selectStateUpiId }}
        >
          <div className="state-available-balance">
            <p style={{ fontWeight: "600" }}>
              Available Balance :<FaRupeeSign />
              {stateHandlerTotalWallet}
            </p>
          </div>
          <div className="bank-method">
            <strong style={{ marginBottom: 0 }}>Select payment method</strong>
            <Tabs defaultActiveKey="1">
              <TabPane tab="BANK" key="1" style={{ marginBottom: 16 }}>
                <Radio.Group
                  onChange={handleRadioChangeStateValue}
                  value={selectStateUpiId}
                >
                  {stateBankDetails.map((option) => (
                    <Radio key={option.bankName} value={option.bankName}>
                      {option.bankName}
                    </Radio>
                  ))}
                </Radio.Group>
              </TabPane>
              <TabPane tab="UPI" key="2" style={{ marginBottom: 16 }}>
                <Radio.Group
                  onChange={handleRadioChangeStateValue}
                  value={selectStateUpiId}
                >
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
            <div
              className="payment-div"
              onClick={() => setWithdrawalAmount(500)}
            >
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
      ) : (
        <Modal
          title="Withdrawal request here"
          open={openStateHandlerModal}
          onCancel={closeStatePaymentModal}
          footer={null}
        >
          {isBusinessHandler ? (
            <h5 style={{ fontWeight: 600, fontStyle: "Calibri" }}>
              You can request for withdrawal after {dayDifference} days.
            </h5>
          ) : (
            <h5 style={{ fontWeight: 600, fontStyle: "Calibri" }}>
              You can request for withdrawal after {dayDifference} days.
            </h5>
          )}
        </Modal>
      )}
    </>
  );
};

export default DisplayCard;

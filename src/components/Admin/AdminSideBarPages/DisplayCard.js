import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/DisplayCard.css";
import axios from "axios";
import baseUrl from "../../../baseUrl";
import RunningProgressiveBar from "./RunningProgressiveBar";
import TrialProgressiveBar from "./TrialProgressiveBar";
import ExpireProgressiveBar from "./ExpireProgressiveBar";

const apiurl = baseUrl.apiUrl;

const DisplayCard = () => {
  const navigate = useNavigate();
  const [adminDetails, setAdminDetails] = useState({
    adminid: "",
  });

  const isAdmin = localStorage.getItem("adminToken");
  const isStateHandler = localStorage.getItem("stateHandlerToken");


  const [totalAmount, setTotalAmount] = useState(0);
  const [progressiveBar, setProgressigeBar] = useState({
    totalCount: 0,
    runningCount: 0,
    trialCount: 0,
    expireCount: 0,
    runningPercentage: 0,
    trialPercentage: 0,
    expirePercentage: 0,
  });

  useEffect(() => {
    setAdminDetails({ adminid: localStorage.getItem("adminId") });
    callApiToSubscriptionCharge();
    callApiToTotalUserRunningTrialExpire();
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

  const callApiToSubscriptionCharge = () => {
    const token = localStorage.getItem("adminToken"); 
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(`${apiurl}`+"/admin/admin-sum-of-all-new-renewal-user-amount", config)
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
  };
  const callApiToTotalUserRunningTrialExpire = () => {
    const token = localStorage.getItem("adminToken");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(`${apiurl}`+"/admin/total_Count_Of_Payment_Status_Of_User", config)
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
  };

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
          {
            isStateHandler && (
          <div className="d-flex">
                <h6>Trader:</h6>&nbsp;&nbsp;{" "}
                <span
                  style={{ color: "yellow", cursor: "pointer" }}
                  onClick={joinChatTrader}
                >
                  Admin Chat
                </span>
              </div>
            )
          }
        </div>
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
    </>
  );
};

export default DisplayCard;

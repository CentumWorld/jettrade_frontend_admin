import React, { useState, useEffect } from "react";
import "../css/RefferalPayout.css";
import axios from "axios";
import { Select, Table, Button, Modal, message, Tabs, Input } from "antd";
import moment from "moment";
import baseUrl from "../../../baseUrl";

const apiurl = baseUrl.apiUrl;
const { TabPane } = Tabs;

const RefferalPayout = () => {
  const [selectedRole, setSelectedRole] = useState("member");
  const [refferralsDetails, setReferralsDetails] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [userDetails, setUserDetails] = useState([]);
  const [bussinessDeveloperDetails, setBussinessDeveloperDetails] = useState(
    []
  );
  const [adminDetails, setAdminDetails] = useState([]);
  const [stateHandlerDetails, setStateHandlerDetails] = useState([]);
  const [franchiseDetails, setFranchiseDetails] = useState([]);
  const [searchByUserID, setSearchByUserID] = useState("");
  const [role, setRole] = useState("User");
  const stateHandlerToken = localStorage.getItem("stateHandlerToken");
  const adminToken = localStorage.getItem("adminToken");
  const franchiseToken = localStorage.getItem("franchiseToken");
  const businessDeveloperToken = localStorage.getItem("bussinessAdminToken");
  console.log(businessDeveloperToken, "ijiji");
  const stateHandlerId = localStorage.getItem("stateHandlerId");
  const franchiseId = localStorage.getItem("frenchiseId");
  const isSubAdmin = localStorage.getItem("subAdminToken");

  const fetchStateCreditWalletTransaction = () => {
    let config = {
      headers: { Authorization: `Bearer ${stateHandlerToken}` },
    };
    if (stateHandlerToken) {
      axios
        .post(
          `${apiurl}` +
            "/state/get-own-state-credit-wallet-transaction-details",
          {
            stateHandlerId: stateHandlerId,
          },
          config
        )
        .then((res) => {
          setStateHandlerDetails(res.data.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const fetchFranchiesCreditWaletTransaction = () => {
    let config = {
      headers: { Authorization: `Bearer ${stateHandlerToken}` },
    };

    if (stateHandlerToken) {
      axios
        .post(
          `${apiurl}` +
            "/state/get-own-franchsie-inside-state-credit-wallet-transaction-details",
          {
            stateHandlerId: stateHandlerId,
          },
          config
        )
        .then((res) => {
          setFranchiseDetails(res.data.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const fetchTraderDetailsinFranchise = () => {
    let config = {
      headers: { Authorization: `Bearer ${franchiseToken}` },
    };

    axios
      .post(
        `${apiurl}` +
          "/franchise/get-own-traders-inside-franchise-credit-wallet-transaction-details",
        {
          franchiseId: franchiseId,
        },
        config
      )
      .then((res) => {
        setReferralsDetails(res.data.traderCreditWalletTransactions);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const fetchMemberDetailsInFranchise = () => {
    let config = {
      headers: { Authorization: `Bearer ${franchiseToken}` },
    };

    if (franchiseToken) {
      axios
        .post(
          `${apiurl}` +
            "/franchise/get-own-members-inside-franchise-credit-wallet-transaction-details",
          {
            franchiseId: franchiseId,
          },
          config
        )
        .then((res) => {
          console.log("data=========>", res.data);
          setReferralsDetails(res.data.memberCreditWalletTransactions);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const fetchFranchiseDetailsInFranchise = () => {
    let config = {
      headers: { Authorization: `Bearer ${franchiseToken}` },
    };

    if (franchiseToken) {
      axios
        .post(
          `${apiurl}` +
            "/franchise/get-own-franchise-credit-wallet-transaction-details",
          {
            franchiseId: franchiseId,
          },
          config
        )
        .then((res) => {
          setFranchiseDetails(res.data.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const fetchBussinessDeveloperDataInFranchise = () => {
    let config = {
      headers: { Authorization: `Bearer ${franchiseToken}` },
    };

    if (franchiseToken) {
      axios
        .post(
          `${apiurl}` +
            "/franchise/get-own-business-developer-inside-franchise-credit-wallet-transaction-details",
          {
            franchiseId: franchiseId,
          },
          config
        )
        .then((res) => {
          setBussinessDeveloperDetails(
            res.data.businessDeveloperCreditWalletTransactions
          );
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const fetchBussinessDeveloperTransactionInState = () => {
    let config = {
      headers: { Authorization: `Bearer ${stateHandlerToken}` },
    };

    if (stateHandlerToken) {
      axios
        .post(
          `${apiurl}` +
            "/state/get-own-business-developer-inside-state-credit-wallet-transaction-details",
          {
            stateHandlerId: stateHandlerId,
          },
          config
        )
        .then((res) => {
          // console.log("180====>", res);
          setBussinessDeveloperDetails(
            res.data.businessDeveloperCreditWalletTransactions
          );
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const fetchTraderPayoutInState = () => {
    let config = {
      headers: { Authorization: `Bearer ${stateHandlerToken}` },
    };

    axios
      .post(
        `${apiurl}` +
          "/state/get-own-traders-inside-state-credit-wallet-transaction-details",
        {
          stateHandlerId: stateHandlerId,
        },
        config
      )
      .then((res) => {
        // console.log("====>", res.data.memberCreditWalletTransactions);
        setReferralsDetails(res.data.traderCreditWalletTransactions);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const fetchMemberTransactionInState = () => {
    let config = {
      headers: { Authorization: `Bearer ${stateHandlerToken}` },
    };

    if (stateHandlerToken) {
      axios
        .post(
          `${apiurl}` +
            "/state/get-own-members-inside-state-credit-wallet-transaction-details",
          {
            stateHandlerId: stateHandlerId,
          },
          config
        )
        .then((res) => {
          setReferralsDetails(res.data.memberCreditWalletTransactions);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const memberDataInState = [
    {
      title: "Member Id",
      dataIndex: "memberId",
      key: "userid",
      onFilter: (value, record) =>
        record.refferUserID.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Credit Amount",
      dataIndex: "creditAmount",
      key: "referralAmount",
      render: (text) =>
        new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(text),
    },
    {
      title: "Joining Date",
      dataIndex: "joininigDate",
      key: "joininigDate",
      render: (text) => moment(text).format("DD/MM/YY HH:mm:ss"),
    },
    {
      title: "New/Renewal",
      dataIndex: "Type",
      key: "userType",
    },
    {
      title: "RefferUser Id",
      dataIndex: "refferUserId",
      key: "refferal_id",
    },
  ];

  const fetchBussinessDeveloperDetails = () => {
    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("subAdminToken");
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(
        `${apiurl}` +
          "/admin/fetch-business-developer-credit-wallet-transaction-details-membe",
        config
      )
      .then((res) => {
        console.log("bussiness developer details -> ", res);
        setBussinessDeveloperDetails(res.data.fetchedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchStateDeveloperDetails = () => {
    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("subAdminToken");
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(
        `${apiurl}` + "/admin/fetch-state-handler-wallet-transaction-details",
        config
      )
      .then((res) => {
        console.log("state handler developer details -> ", res);
        setStateHandlerDetails(res.data.fetchedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchFranchiseDeveloperHandler = () => {
    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("subAdminToken");
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(
        `${apiurl}` +
          "/admin/fetch-franchise-credit-wallet-transaction-details",
        config
      )
      .then((res) => {
        console.log("franchise developer details -> ", res);
        setFranchiseDetails(res.data.fetchedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAdminDetails = () => {
    const token = localStorage.getItem("adminToken");
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get(
        `${apiurl}` + "/admin/fetch-admin-credit-wallet-transaction-details",
        config
      )
      .then((res) => {
        setAdminDetails(res.data.fetchedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    console.log(key);
    if (key === "1") {
      setRole("User");
      setSearchByUserID("");
      fetchTraderRefferalPayout();
    }
    if (key === "1" && stateHandlerToken) {
      setRole("User");
      setSearchByUserID("");
      fetchTraderPayoutInState();
    }
    if (key === "1" && franchiseToken) {
      setRole("User");
      setSearchByUserID("");
      // fetchTraderRefferalPayout();

      // fetchTraderPayoutInState();
      // fetchTraderPayoutInBusiness();
      fetchTraderDetailsinFranchise();
    }
    if (key === "1" && bussinessToken) {
      setRole("User");
      setSearchByUserID("");
      // fetchTraderRefferalPayout();

      // fetchTraderPayoutInState();
      fetchTraderPayoutInBusiness();
      // fetchTraderDetailsinFranchise();
    }
    if (key === "5") {
      fetchBussinessDeveloperDataInFranchise();
      fetchBussinessDeveloperDetails();
      fetchBussinessDeveloperTransactionInState();
      fetchBusinessPayoutInBusiness();
    }
    if (key === "3" || stateHandlerId) {
      fetchStateDeveloperDetails();
      fetchStateCreditWalletTransaction();
    }
    if (key === "4") {
      fetchFranchiseDeveloperHandler();
      fetchFranchiesCreditWaletTransaction();
      fetchFranchiseDetailsInFranchise();
    }
    if (key === "6") {
      fetchAdminDetails();
    }
    if (key === "2") {
      fetchMemberRefferalPayout("Member");
    } else {
      setRole("Member");
      setSearchByUserID("");
      fetchMemberTransactionInState();
      fetchMemberPayoutInBusiness();
      fetchMemberDetailsInFranchise();
    }
  };

  useEffect(() => {
    if (adminToken) {
      setActiveTab("1");
      fetchTraderRefferalPayout();
    }

    if (stateHandlerToken) {
      setActiveTab("2");
      fetchMemberTransactionInState();
    }
    if (franchiseToken) {
      setActiveTab("2");
      fetchMemberDetailsInFranchise();
    }
    if (businessDeveloperToken) {
      setActiveTab("2");

      fetchMemberPayoutInBusiness();
    }
  }, [adminToken, stateHandlerToken, franchiseToken, businessDeveloperToken]);

  const fetchTraderRefferalPayout = () => {
    const token = localStorage.getItem("adminToken");
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get(
        `${apiurl}` + "/admin/fetch-user-credit-wallet-transaction-details",

        config
      )
      .then((res) => {
        console.log(res.data, "refral details");
        setUserDetails(res.data.fetchedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const traderColumnInState = [
    {
      title: "User ID",
      dataIndex: "userid",
      key: "userid",
      onFilter: (value, record) =>
        record.refferUserID.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Wallet Amount",
      dataIndex: "referralAmount",
      key: "referralAmount",
      render: (text) =>
        new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(text),
    },
    {
      title: "Joining Date",
      dataIndex: "joininigDate",
      key: "joininigDate",
      render: (text) => moment(text).format("DD/MM/YY HH:mm:ss"),
    },
    {
      title: "New/Renewal",
      dataIndex: "userType",
      key: "userType",
    },
    {
      title: "Reffer User Id",
      dataIndex: "refferUserID",
      key: "refferUserID",
    },
    {
      title: "Refferal User Id",
      dataIndex: "refferal_id",
      key: "refferal_id",
    },
  ];

  // user details here
  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
      key: "refferUserID",
      onFilter: (value, record) =>
        record.refferUserID.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Wallet Amount",
      dataIndex: "creditAmount",
      key: "referralAmount",
      render: (text) =>
        new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(text),
    },
    {
      title: "Joining Date",
      dataIndex: "Date",
      key: "joininigDate",
      render: (text) => moment(text).format("DD/MM/YY HH:mm:ss"),
    },
    {
      title: "New/Renewal",
      dataIndex: "Type",
      key: "userType",
    },
    {
      title: "Referr User Id",
      dataIndex: "refferUserId",
      key: "userid",
    },
  ];

  //approved functin
  const handleApproved = (id) => {
    Modal.confirm({
      title: "Are you sure you want to confirm this request?",
      onOk: () => handleConfirm(id),
      onCancel: () => console.log("Cancel"),
      okText: "Yes",
      cancelText: "No",
    });
  };

  const handleConfirm = (id) => {
    let token = localStorage.getItem("adminToken");
    let data = {
      id: id,
    };
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(`${apiurl}` + "/admin/approve-user-refferal-payout", data, config)
      .then((res) => {
        message.success("Approved");
        //fetchTraderRefferalPayout();
        fetchMemberRefferalPayout("Member");
      })
      .catch((err) => {
        message.warning(err.response.data.message);
      });
  };

  //approved list
  const fetchMemberRefferalPayout = (id) => {
    console.log("id ", id);
    const data = {
      role: id,
    };
    let token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("subAdminToken");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    if (adminToken || isSubAdmin) {
      axios
        .get(
          `${apiurl}` + "/admin/fetch-member-credit-wallet-transaction-details",

          config
        )
        .then((res) => {
          setReferralsDetails(res.data.fetchedData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const columnsMember = [
    {
      title: "User ID",
      dataIndex: "memberId",
      key: "refferUserID",
      onFilter: (value, record) =>
        record.refferUserID.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Wallet Amount",
      dataIndex: "creditAmount",
      key: "referralAmount",
      render: (text) =>
        new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(text),
    },
    {
      title: "Joining Date",
      dataIndex: "Date",
      key: "joininigDate",
      render: (text) => moment(text).format("DD/MM/YY HH:mm:ss"),
    },
    {
      title: "New/Renewal",
      dataIndex: "Type",
      key: "userType",
    },
    {
      title: "Referral User",
      dataIndex: "refferUserId",
      key: "userid",
    },
  ];

  const columnsMemberBusiness = [
    {
      title: "User ID",
      dataIndex: "memberId",
      key: "refferUserID",
      onFilter: (value, record) =>
        record.refferUserID.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Wallet Amount",
      dataIndex: "creditAmount",
      key: "referralAmount",
      render: (text) =>
        new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(text),
    },
    {
      title: "Joining Date",
      dataIndex: "Date",
      key: "joininigDate",
      render: (text) => moment(text).format("DD/MM/YY HH:mm:ss"),
    },
    {
      title: "New/Renewal",
      dataIndex: "Type",
      key: "userType",
    },
    {
      title: "Referral User",
      dataIndex: "refferUserId",
      key: "userid",
    },
  ];

  const columnsState = [
    {
      title: "State Developer ID",
      dataIndex: "stateHandlerId",
      key: "stateHandlerId",
      onFilter: (value, record) =>
        record.refferUserID.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Credit Amount",
      dataIndex: "creditAmount",
      key: "creditAmount",
      render: (text) =>
        new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(text),
    },
    {
      title: "Joining Date",
      dataIndex: "Date",
      key: "Date",
      render: (text) => moment(text).format("DD/MM/YY HH:mm:ss"),
    },
    {
      title: "New/Renewal",
      dataIndex: "Type",
      key: "Type",
    },
    {
      title: "Reffer UserID",
      dataIndex: "refferUserId",
      key: "refferUserId",
    },
  ];

  const columnsFranch = [
    {
      title: "Franchise Developer ID",
      dataIndex: "frenchiseId",
      key: "frenchiseId",
      onFilter: (value, record) =>
        record.refferUserID.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Credit Amount",
      dataIndex: "creditAmount",
      key: "creditAmount",
      render: (text) =>
        new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(text),
    },
    {
      title: "Joining Date",
      dataIndex: "Date",
      key: "Date",
      render: (text) => moment(text).format("DD/MM/YY HH:mm:ss"),
    },
    {
      title: "New/Renewal",
      dataIndex: "Type",
      key: "Type",
    },
    {
      title: "Referral Business Id",
      dataIndex: "refferUserId",
      key: "refferUserId",
    },
  ];

  const bussinessColumnInStateRefferal = [
    {
      title: "Bussiness Developer ID",
      dataIndex: "businessDeveloperId",
      key: "userid",
      onFilter: (value, record) =>
        record.refferUserID.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Refferal Amount",
      dataIndex: "creditAmount",
      key: "referralAmount",
      render: (text) =>
        new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(text),
    },
    {
      title: "Joining Date",
      dataIndex: "Date",
      key: "Date",
      render: (text) => moment(text).format("DD/MM/YY HH:mm:ss"),
    },
    {
      title: "New/Renewal",
      dataIndex: "Type",
      key: "userType",
    },
    {
      title: "Referral User Id",
      dataIndex: "refferUserId",
      key: "refferal_id",
    },
  ];

  const columnsBussinessDeveloper = [
    {
      title: "Bussiness Developer ID",
      dataIndex: "businessDeveloperId",
      key: "businessDeveloperId",
      onFilter: (value, record) =>
        record.refferUserID.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Credit Amount",
      dataIndex: "creditAmount",
      key: "creditAmount",
      render: (text) =>
        new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(text),
    },
    {
      title: "Joining Date",
      dataIndex: "Date",
      key: "Date",
      render: (text) => moment(text).format("DD/MM/YY HH:mm:ss"),
    },
    {
      title: "New/Renewal",
      dataIndex: "Type",
      key: "Type",
    },
    {
      title: "Referral User Id",
      dataIndex: "refferUserId",
      key: "refferUserId",
    },
  ];

  // const searchByUserId = (e) => {
  //   e.preventDefault();
  //   setSearchByUserID(e.target.value);
  //   if (e.target.value === "") {
  //     fetchTraderRefferalPayout("User");
  //     fetchMemberRefferalPayout("Member");
  //   }
  // };
  // const search = () => {
  //   const data = {
  //     role: role,
  //     refferUserID: searchByUserID,
  //   };
  //   let token = localStorage.getItem("adminToken");
  //   const config = {
  //     headers: { Authorization: `Bearer ${token}` },
  //   };
  //   axios
  //     .post(
  //       `${apiurl}` + "/admin/search-refferal-payout-by-reffer-userid",
  //       data,
  //       config
  //     )
  //     .then((res) => {
  //       setReferralsDetails(res.data.filterData);
  //       setUserRefferalApprovdDetails(res.data.filterData);
  //     })
  //     .catch((err) => {
  //       message.warning(err.response.data.message);
  //     });
  // };

  const bussinessToken = localStorage.getItem("bussinessAdminToken");
  const businessId = localStorage.getItem("businessId");

  const fetchTraderPayoutInBusiness = () => {
    let config = {
      headers: { Authorization: `Bearer ${bussinessToken}` },
    };

    axios
      .post(
        `${apiurl}` +
          "/businessDeveloper/get-own-traders-inside-business-developer-wallet-transaction-details",
        {
          businessDeveloperId: businessId,
        },
        config
      )
      .then((res) => {
        setReferralsDetails(res.data.traderTransactions);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const fetchMemberPayoutInBusiness = () => {
    let config = {
      headers: { Authorization: `Bearer ${bussinessToken}` },
    };

    if (bussinessToken) {
      axios
        .post(
          `${apiurl}` +
            "/businessDeveloper/get-own-members-inside-business-developer-wallet-transaction-details",
          {
            businessDeveloperId: businessId,
          },
          config
        )
        .then((res) => {
          // console.log("heyyyyyyyyyyyyyyyyyy", res.data);
          setReferralsDetails(res.data.memberTransactions);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const fetchBusinessPayoutInBusiness = () => {
    let config = {
      headers: { Authorization: `Bearer ${bussinessToken}` },
    };

    if (bussinessToken) {
      axios
        .post(
          `${apiurl}` +
            "/businessDeveloper/get-own-business-developer-wallet-transaction-details",
          {
            businessDeveloperId: businessId,
          },
          config
        )
        .then((res) => {
          setBussinessDeveloperDetails(res.data.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  //=============================================

  const fetchFilterData = (type, id) => {
    const token =
      adminToken ||
      stateHandlerToken ||
      franchiseToken ||
      businessDeveloperToken;

    const requestData = {
      type: type,
      id: id,
    };

    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(
        `${apiurl}` + "/admin/filter-credit-wallet-transaction-by-userid",
        requestData,
        config
      )
      .then((res) => {
        if (type === "franchise") {
          setFranchiseDetails(res.data);
        } else if (type === "statehandler") {
          setStateHandlerDetails(res.data);
        } else if (type === "businessdeveloper") {
          setBussinessDeveloperDetails(res.data);
        } else if (type === "member") {
          setReferralsDetails(res.data);
          console.log(res.data, "rrrrrrrrrrrrrrrrrrr");
        } else if (type === "trader") {
          setReferralsDetails(res.data);
        }
      });
  };

  ///====================================

  const memberColumnInFranchise = [
    {
      title: "User ID",
      dataIndex: "memberId",
      key: "userid",
      onFilter: (value, record) =>
        record.refferUserID.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Wallet Amount",
      dataIndex: "creditAmount",
      key: "referralAmount",
      render: (text) =>
        new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(text),
    },
    {
      title: "Joining Date",
      dataIndex: "Date",
      key: "joininigDate",
      render: (text) => moment(text).format("DD/MM/YY HH:mm:ss"),
    },
    {
      title: "New/Renewal",
      dataIndex: "Type",
      key: "userType",
    },
    {
      title: "Referral User Id",
      dataIndex: "refferUserId",
      key: "refferal_id",
    },
  ];

  const traderColumnInFranchise = [
    {
      title: "User ID",
      dataIndex: "userid",
      key: "userid",
      onFilter: (value, record) =>
        record.refferUserID.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Wallet Amount",
      dataIndex: "referralAmount",
      key: "referralAmount",
      render: (text) =>
        new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(text),
    },
    {
      title: "Joining Date",
      dataIndex: "joininigDate",
      key: "joininigDate",
      render: (text) => moment(text).format("DD/MM/YY HH:mm:ss"),
    },
    {
      title: "New/Renewal",
      dataIndex: "userType",
      key: "userType",
    },
    {
      title: "Reffer User Id",
      dataIndex: "refferUserID",
      key: "refferUserID",
    },
    {
      title: "Refferal User Id",
      dataIndex: "refferal_id",
      key: "refferal_id",
    },
  ];

  const adminColumnDetails = [
    { title: "Admin Id", dataIndex: "admin_id", key: "admin_id" },
    { title: "Credit Amount", dataIndex: "creditAmount", key: "creditAmount" },
    { title: "Type", dataIndex: "Type", key: "Type" },
    { title: "Reffer User Id", dataIndex: "refferUserId", key: "refferUserId" },
    {
      title: "Joining Date",
      dataIndex: "Date",
      key: "Date",
      render: (text) => moment(text).format("DD/MM/YY HH:mm:ss"),
    },
  ];

  const handleRoleChange = (value) => {
    console.log("Role selected:", value);
    setSelectedRole(value);

    console.log("Before API call");

    if (value === "trader") {
      setActiveTab("1");
      fetchTraderRefferalPayout();
    } else if (value === "member") {
      setActiveTab("2");
      fetchMemberRefferalPayout();
      // fetchMemberTransactionInState();
    } else if (value === "businessdeveloper") {
      setActiveTab("5");
      fetchBussinessDeveloperDetails();
      fetchBussinessDeveloperTransactionInState();
      fetchBussinessDeveloperDataInFranchise();
      fetchBusinessPayoutInBusiness();
    } else if (value === "franchise") {
      setActiveTab("4");
      fetchFranchiseDeveloperHandler();
      fetchFranchiesCreditWaletTransaction();
      fetchFranchiseDetailsInFranchise();
    } else if (value === "statehandler") {
      setActiveTab("3");
      fetchStateDeveloperDetails();
      fetchStateCreditWalletTransaction();
    }
    console.log(" API call");
  };

  return (
    <div className="reffer-container">
      <div className="refferal-container-header">
        <div className="refferal-header-content">
          <div className="payout-text">
            <p>Referral Payout</p>
          </div>
          <div className="search-box">
            {adminToken && (
              // <div className="admin-search-box">
              <Select
                defaultValue="trader"
                style={{ width: 120, marginRight: 10 }}
                onChange={handleRoleChange}
              >
                <Select.Option value="trader">User</Select.Option>
                <Select.Option value="member">Member</Select.Option>
                <Select.Option value="businessdeveloper">
                  Business Developer
                </Select.Option>
                <Select.Option value="franchise">Franchise</Select.Option>
                <Select.Option value="statehandler">
                  State Handler
                </Select.Option>
              </Select>
              // </div>
            )}

            {stateHandlerToken && (
              <Select
                // defaultValue="member"
                value={selectedRole}
                style={{ width: 120, marginRight: 10 }}
                onChange={handleRoleChange}
              >
                <Select.Option value="member">Member</Select.Option>
                <Select.Option value="businessdeveloper">
                  Business Developer
                </Select.Option>
                <Select.Option value="franchise">Franchise</Select.Option>
                <Select.Option value="statehandler">
                  State Handler
                </Select.Option>
              </Select>
            )}

            {franchiseToken && (
              <Select
                defaultValue="member"
                style={{ width: 120, marginRight: 10 }}
                onChange={handleRoleChange}
              >
                <Select.Option value="member">Member</Select.Option>
                <Select.Option value="businessdeveloper">
                  Business Developer
                </Select.Option>
                <Select.Option value="franchise">Franchise</Select.Option>
              </Select>
            )}

            {businessDeveloperToken && (
              <Select
                defaultValue="member"
                style={{ width: 120, marginRight: 10 }}
                onChange={handleRoleChange}
              >
                <Select.Option value="member">Member</Select.Option>
                <Select.Option value="businessdeveloper">
                  Business Developer
                </Select.Option>
              </Select>
            )}

            <Input
              placeholder="Enter User ID"
              value={searchByUserID}
              onChange={(e) => setSearchByUserID(e.target.value)}
              style={{ width: 120, marginRight: 10 }}
            />

            {/* Add a button to trigger the filtering */}
            <Button
            className="filter-search-button"
              onClick={() => fetchFilterData(selectedRole, searchByUserID)}
              disabled={!searchByUserID}
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        {adminToken && (
          <TabPane tab="Trader Payout" key="1">
            <div>
              <Table
                columns={columns}
                dataSource={userDetails}
                scroll={{
                  y: 400,
                  x: true,
                  y: 320,
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              />
            </div>
          </TabPane>
        )}

        {adminToken && (
          <TabPane tab="Members Payout" key="2">
            <div>
              <Table
                columns={columnsMember}
                dataSource={refferralsDetails}
                scroll={{ y: 400, x: true }}
              />
            </div>
          </TabPane>
        )}

        {businessId && (
          <TabPane tab="Members Payout" key="2">
            <div>
              <Table
                columns={columnsMemberBusiness}
                dataSource={refferralsDetails}
                scroll={{
                  y: 400,
                  x: true,
                  y: 320,
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              />
            </div>
          </TabPane>
        )}

        {franchiseToken && (
          <TabPane tab="Members Payout" key="2">
            <div>
              <Table
                columns={memberColumnInFranchise}
                dataSource={refferralsDetails}
                scroll={{
                  y: 400,
                  x: true,
                  y: 320,
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              />
            </div>
          </TabPane>
        )}

        {stateHandlerId && (
          <TabPane tab="Member Payout" key="2">
            <div>
              <Table
                columns={memberDataInState}
                dataSource={refferralsDetails}
                scroll={{
                  y: 400,
                  x: true,
                  y: 320,
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              />
            </div>
          </TabPane>
        )}

        {!businessId && !franchiseToken && (
          <TabPane tab="State Payout" key="3">
            <div>
              <Table
                columns={columnsState}
                dataSource={stateHandlerDetails}
                scroll={{
                  y: 400,
                  x: true,
                  y: 320,
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              />
            </div>
          </TabPane>
        )}

        {!businessId && (
          <TabPane tab="Franchise Payout" key="4">
            <div>
              <Table
                columns={columnsFranch}
                dataSource={franchiseDetails}
                scroll={{
                  y: 400,
                  x: true,
                  y: 320,
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              />
            </div>
          </TabPane>
        )}
        {/* <TabPane tab="Franchise Payout" key="4">
          <div>
            <Table
              columns={columnsFranch}
              dataSource={franchiseDetails}
              scroll={{ y: 400, x: true }}
            />
          </div>
        </TabPane> */}

        {!stateHandlerToken && (
          <TabPane tab="Bussiness Developer Payout" key="5">
            <div>
              <Table
                columns={columnsBussinessDeveloper}
                dataSource={bussinessDeveloperDetails}
                scroll={{
                  y: 400,
                  x: true,
                  y: 320,
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              />
            </div>
          </TabPane>
        )}

        {stateHandlerToken && (
          <TabPane tab="Bussiness Developer Payout" key="5">
            <div>
              <Table
                columns={bussinessColumnInStateRefferal}
                dataSource={bussinessDeveloperDetails}
                scroll={{
                  y: 400,
                  x: true,
                  y: 320,
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              />
            </div>
          </TabPane>
        )}

        {adminToken && (
          <TabPane tab="Admin Payout" key="6">
            <div>
              <Table
                columns={adminColumnDetails}
                dataSource={adminDetails}
                scroll={{
                  y: 400,
                  x: true,
                  y: 320,
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              />
            </div>
          </TabPane>
        )}
      </Tabs>
    </div>
  );
};

export default RefferalPayout;

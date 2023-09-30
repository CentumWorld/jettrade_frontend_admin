import React, { useState } from "react";
import {
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Button,
  Tabs,
  message,
} from "antd";
import { MdOutlineAccountCircle } from "react-icons/md";
import { BiGitBranch } from "react-icons/bi";
import banks from "../utils/banknames/banks";
import "../css/accountmodal.css";
import axios from "axios";
import baseUrl from "../baseUrl";

const apiurl = baseUrl.apiUrl

const { Option } = Select;
const { TabPane } = Tabs;

const AccountModal = ({ isVisible, onClose }) => {
  const [form] = Form.useForm();
  const [accountHolderName, setAccountHolderName] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIFSCCode] = useState("");
  const [branchName, settBranchName] = useState("");
  const [savedData, setSavedData] = useState(null);
  const [upiNO, setUpiNo] = useState("");

  const selectAccountHolderName = (e) => {
    setAccountHolderName(e.target.value);
  };
  const handleBankSelect = (value) => {
    setSelectedBank(value);
  };

  const handleIFSCCodeChange = (e) => {
    setIFSCCode(e.target.value);
  };

  const handleAccountNumberChange = (e) => {
    setAccountNumber(e.target.value);
  };

  const selectBranchName = (e) => {
    settBranchName(e.target.value);
  };

  const stateHandlerId = localStorage.getItem("stateHandlerId");
  const businessId = localStorage.getItem("businessId");
  const frenchiseId = localStorage.getItem("frenchiseId");


  const handleSave = () => {
    let data = {
      accountHolderName: accountHolderName,
      branchName: branchName,
      accountNumber: accountNumber,
      bankName: selectedBank,
      ifscCode: ifscCode,
      userId:
        localStorage.getItem("stateHandlerId") ||
        localStorage.getItem("businessId") ||
        localStorage.getItem("frenchiseId"),
    };
    let token =
      localStorage.getItem("stateHandlerToken") ||
      localStorage.getItem("bussinessAdminToken") ||
      localStorage.getItem("franchiseToken");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (stateHandlerId) {
      axios
        .post(`${apiurl}` +"/state/create-state-bank-account-holder", data, config)
        .then((res) => {
          console.log(res.data);
          message.success(res.data.message);
        })
        .catch((err) => {
          message.warning(err.response.data.message)
        });
    } else if (businessId) {
      axios
        .post(
          `${apiurl}` +"/businessDeveloper/create-business-developer-bank-account-holder",
          data,
          config
        )
        .then((res) => {
          message.success(res.data.message);
        })
        .catch((err) => {
          message.warning(err.response.data.message)

        });
    } else if (frenchiseId) {
      axios
        .post(`${apiurl}` +"/franchise/create-franchise-bank-account-holder", data, config)
        .then((res) => {
          message.success(res.data.message);
        })
        .catch((err) => {
          message.warning(err.response.data.message)

        });
    }
  };

  const stateUpi = (e) => {
    setUpiNo(e.target.value);
  };
  const upiSave = () => {
    let token =
      localStorage.getItem("stateHandlerToken") ||
      localStorage.getItem("bussinessAdminToken") ||
      localStorage.getItem("franchiseToken");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let data = {
      upiId: upiNO,
      userId:
        localStorage.getItem("stateHandlerId") ||
        localStorage.getItem("businessId") ||
        localStorage.getItem("frenchiseId"),
    };

    if (stateHandlerId) {
      axios
        .post(`${apiurl}` +"/state/create-state-upi-holder", data, config)
        .then((res) => {
          message.success(res.data.message);
          setUpiNo("");
        })
        .catch((err) => {
          message.warning(err.response.data.message);
        });
    } else if (businessId) {
      axios
        .post(
          `${apiurl}` +"/businessDeveloper/create-business-developer-upi-holder",
          data,
          config
        )
        .then((res) => {
          message.success(res.data.message);
          setUpiNo("");
        })
        .catch((err) => {
          message.warning(err.response.data.message);
        });
    } else if (frenchiseId) {
      axios
        .post(
          `${apiurl}` +"/franchise/create-franchise-upi-holder",
          data,
          config
        )
        .then((res) => {
          message.success(res.data.message);
          setUpiNo("");
        })
        .catch((err) => {
          message.warning(err.response.data.message);
        });
    }
  };

  return (
    <Modal
      title="Account Details"
      open={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bank Details" key="1">
          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Account Holder Name">
                  <Input
                    placeholder="Account holder name"
                    prefix={<MdOutlineAccountCircle />}
                    style={{ width: "100%" }}
                    onChange={selectAccountHolderName}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Branch name">
                  <Input
                    placeholder="Branch name"
                    prefix={<BiGitBranch />}
                    style={{ width: "100%" }}
                    onChange={selectBranchName}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Select Bank">
              <Select
                placeholder="Select a bank"
                value={selectedBank}
                onChange={handleBankSelect}
                style={{ width: "100%" }}
                showSearch
                filterOption = {(input, option)=>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0

                 }
              >
                <Option value="" disabled>
                  -- Select a bank --
                </Option>
                {Object.keys(banks).map((bankName) => (
                  <Option key={bankName} value={bankName}>
                    {bankName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Account Number">
                  <Input
                    placeholder="Account number"
                    value={accountNumber}
                    onChange={handleAccountNumberChange}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="IFSC Code">
                  <Input
                    placeholder="IFSC code"
                    value={ifscCode}
                    onChange={handleIFSCCodeChange}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" onClick={handleSave}>
                Save
              </Button>
            </Form.Item>
          </Form>
          {savedData && (
            <div className="account-details">
              <p>Account Holder Name: {savedData["accountHolderName"]}</p>
              <p>Bank: {savedData["bank"]}</p>
              <p>Account Number: {savedData["accountNumber"]}</p>
              <p>IFSC Code: {savedData["ifscCode"]}</p>
            </div>
          )}
        </TabPane>
        <TabPane tab="UPI ID" key="2">
          <Form>
            <Form.Item label="Enter UPI ID">
              <Input
                placeholder="92XXXXXXXX@ybl"
                style={{ width: "100%" }}
                onChange={stateUpi}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={upiSave}>
                Save
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default AccountModal;

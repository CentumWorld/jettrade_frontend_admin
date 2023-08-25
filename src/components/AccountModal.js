import React, { useState } from "react";
import { Col, Form, Input, Modal, Row, Select, Button } from "antd";
import { MdOutlineAccountCircle } from "react-icons/md";
import banks from "../utils/banknames/banks";
import "../css/accountmodal.css";

const { Option } = Select;

const AccountModal = ({ isVisible, onClose }) => {
  const [form] = Form.useForm();
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIFSCCode] = useState("");
  const [savedData, setSavedData] = useState(null);

  const handleBankSelect = (value) => {
    setSelectedBank(value);
  };

  const handleIFSCCodeChange = (e) => {
    setIFSCCode(e.target.value);
  };

  const handleAccountNumberChange = (e) => {
    setAccountNumber(e.target.value);
  };

  const handleSave = () => {
    const formData = form.getFieldsValue();
    setSavedData(formData);
  };

  return (
    <Modal
      title="Account Details"
      visible={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <p className="account-modal-amount">Total Amount: </p>
      <Form form={form} layout="vertical">
        <Form.Item label="Account Holder Name">
          <Input
            placeholder="Account holder name"
            prefix={<MdOutlineAccountCircle />}
            style={{ width: "50%" }}
          />
        </Form.Item>
        <Form.Item label="Select Bank">
          <Select
            placeholder="Select a bank"
            value={selectedBank}
            onChange={handleBankSelect}
            style={{ width: "100%" }}
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
    </Modal>
  );
};

export default AccountModal;

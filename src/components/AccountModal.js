import banks from "../utils/banknames/banks";
import React, { useState } from "react";
import { Col, Form, Input, Modal, Row, Select } from "antd";
import "../css/accountmodal.css";
import { MdOutlineAccountCircle } from "react-icons/md";
const { Option } = Select;

const AccountModal = ({ isVisible, onClose }) => {
  const [form] = Form.useForm();
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIFSCCode] = useState("");

  const handleBankSelect = (value) => {
    setSelectedBank(value);
  };

  const handleIFSCCodeChange = (e) => {
    setIFSCCode(e.target.value);
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
      </Form>
    </Modal>
  );
};

export default AccountModal;

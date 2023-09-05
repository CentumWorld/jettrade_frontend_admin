import React, { useContext, useState } from "react";
import { Form, Input, message } from "antd";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { UserOutlined, UnlockOutlined } from "@ant-design/icons";
import { UserContext } from "../App";
import { ToastContainer, toast } from "react-toastify";
import baseUrl from "../baseUrl";

const apiurl = baseUrl.apiUrl

const FranchiseAdminLogin = (props) => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [franchiseAdmin, setFranchiseAdmin] = useState({
    franchiseAdmin_id: "",
    franchiseAdmin_password: "",
  });

  const [show, setShow] = useState(true);
  const handleClose = () => setShow((prev) => !prev);
  props.franchiseLoginFunc(show);

  const handleInputs = (e) => {
    setFranchiseAdmin({ ...franchiseAdmin, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const adminLogin = (e) => {
    e.preventDefault();
    axios.post( `${apiurl}`+"/admin/frenchise-login", {
      frenchiseId: franchiseAdmin.franchiseAdmin_id,
      password: franchiseAdmin.franchiseAdmin_password,
    })
      .then((response) => {
        dispatch({ type: "USER", payload: true });
        localStorage.setItem("login", true);
        localStorage.setItem("franchiseToken", response.data.frenchiseToken);
        console.log(response.data);
        localStorage.setItem("frenchiseId", response.data.frenchiseDetails.frenchiseId);
        localStorage.setItem("frenchFname", response.data.frenchiseDetails.fname);
        localStorage.setItem("franchiseRefferal", response.data.frenchiseDetails.referralId);
        setFranchiseAdmin({ stateAdmin_id: "", stateAdmin_password: "" });
        navigate("/admindashboard/dashboard");
      })
      .catch((error) => {
        message.warning(error.response.data.message)
      });
    setShow(false);
  };

  return (
    <>
      <ToastContainer />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Franchise Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-content">
            <form onSubmit={adminLogin} autoComplete="off">
              <div className="row">
                <div className="col">
                  <div className="form-group mb-3">
                    <label htmlFor="loginid"> LOGIN ID</label>
                    <Input
                      placeholder="Enter login ID "
                      prefix={<UserOutlined />}
                      value={franchiseAdmin.franchiseAdmin_id}
                      name="franchiseAdmin_id"
                      allowClear
                      onChange={handleInputs}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-group mb-3">
                    <label htmlFor="password">PASSWORD</label>
                    <Input.Password
                      placeholder="Enter your password"
                      type="password"
                      prefix={<UnlockOutlined />}
                      value={franchiseAdmin.franchiseAdmin_password}
                      name="franchiseAdmin_password"
                      onChange={handleInputs}
                    />
                  </div>
                </div>
              </div>
              <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="success" type="submit">
                  Login
                </Button>
              </Modal.Footer>
            </form>
          </div>
        </Modal.Body>
      </Modal></>
  )
}

export default FranchiseAdminLogin
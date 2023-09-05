import React, { useContext, useState } from "react";
import { Form, Input,  message } from "antd";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { UserOutlined, UnlockOutlined } from "@ant-design/icons";
import { UserContext } from "../App";
import { ToastContainer, toast } from "react-toastify";
import baseUrl from "../baseUrl";

const apiurl = baseUrl.apiUrl

const BussinessAdminLogin = (props) => {
  const [show, setShow] = useState(true);
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [bussinessAdmin, setBussinessAdmin] = useState({
    bussinessAdmin_id: "",
    bussinessAdmin_password: "",
  });

  const handleClose = () => setShow((prev) => !prev);
  props.bussinessLoginFunc(show);

  const handleInputs = (e) => {
    setBussinessAdmin({ ...bussinessAdmin, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const adminLogin = (e) => {
    e.preventDefault();
    axios.post(`${apiurl}`+"/admin/business-developer-login", {
      businessDeveloperId: bussinessAdmin.bussinessAdmin_id,
        password: bussinessAdmin.bussinessAdmin_password,
    })
      .then((response) => {
        console.log(response.data);
        dispatch({ type: "USER", payload: true });
        localStorage.setItem("login", true);
        localStorage.setItem("bussinessAdminToken", response.data.businessDeveloperToken);
        localStorage.setItem("businessId",response.data.businessDeveloperDetails.businessDeveloperId);
        localStorage.setItem("businessFname",response.data.businessDeveloperDetails.fname);
        localStorage.setItem("bussinessRefferalId", response.data.businessDeveloperDetails.referralId)
        setBussinessAdmin({ bussinessAdmin_id: "", bussinessAdmin_password: "" }); // Use setAdmin to reset the state
        navigate("/admindashboard/dashboard");
      })
      .catch((error) => {
        console.log("Not login");
        if (error.response.status === 422) {
          toast.warning(
            "Please Fill all Details!",
            {
              autoClose: 2000,
              theme: "dark",
            },
            1000
          );
          setBussinessAdmin({ bussinessAdmin_id: "", bussinessAdmin_password: "" }); // Use setAdmin to reset the state
        }
        if (error.response.status === 404) {
          toast.warning("Invalid Credential!", {
            autoClose: 2000,
            theme: "dark",
          });
        }
      });
    setShow(false);
  };

  return <>
  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bussiness Login</Modal.Title>
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
                      value={bussinessAdmin.bussinessAdmin_id}
                      name="bussinessAdmin_id"
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
                      value={bussinessAdmin.bussinessAdmin_password}
                      name="bussinessAdmin_password"
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
      </Modal>

  </>;
};

export default BussinessAdminLogin;

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

const StateAdminLogin = (props) => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [stateAdmin, setStateAdmin] = useState({
    stateAdmin_id: "",
    stateAdmin_password: "",
  });
  const [stateRefferalId, setStateRefferalId] = useState("");
  // console.log("state id----->", stateRefferalId);

  const [show, setShow] = useState(true);
  const handleClose = () => setShow((prev) => !prev);
  props.stateLoginFunc(show);

  const handleInputs = (e) => {
    setStateAdmin({ ...stateAdmin, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const adminLogin = (e) => {
    e.preventDefault();
    axios.post(`${apiurl}`+"/admin/state-handler-login", {
        stateHandlerId: stateAdmin.stateAdmin_id,
        password: stateAdmin.stateAdmin_password,
    })
      .then((response) => {
        console.log(response.data);
        dispatch({ type: "USER", payload: true });
        localStorage.setItem("login", true);
        localStorage.setItem("stateHandlerToken", response.data.statehandlerToken);
        localStorage.setItem("stateHandlerRefferalID", response.data.stateHandlerDetails.referralId);
        localStorage.setItem("stateHandlerName",response.data.stateHandlerDetails.fname)
        localStorage.setItem("stateHandlerId",response.data.stateHandlerDetails.stateHandlerId)
        setStateAdmin({ stateAdmin_id: "", stateAdmin_password: "" }); // Use setAdmin to reset the state
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
          setStateAdmin({ stateAdmin_id: "", stateAdmin_password: "" }); // Use setAdmin to reset the state
        }
        if (error.response.status === 404) {
          toast.warning(
            `Invalid Credential! ${error.response.data.message}`, // Include the backend message in the toast
            {
              autoClose: 2000,
              theme: "dark",
            }
          );
        }
        if (error.response && error.response.status === 400) {
          // Invalid input data
          toast.warning(
            error.response.data.message || "Please check your input data.",
            {
              autoClose: 2000,
              theme: "dark",
            }
          );
        }
      });
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>State Admin Login</Modal.Title>
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
                      value={stateAdmin.stateAdmin_id}
                      name="stateAdmin_id"
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
                      value={stateAdmin.stateAdmin_password}
                      name="stateAdmin_password"
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
    </>
  );
};

export default StateAdminLogin;

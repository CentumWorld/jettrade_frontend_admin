
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../App";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Input, message } from "antd";
import { UserOutlined, UnlockOutlined } from "@ant-design/icons";
import baseUrl from "../baseUrl";


const apiurl = baseUrl.apiUrl;

function AdminLogin(props) {
  const { state, dispatch } = useContext(UserContext);
  let navigate = useNavigate();
  const [admin, setAdmin] = useState({
    admin_id: "",
    admin_password: "",
  });

  const [show, setShow] = useState(true);
  const handleClose = () => setShow((prev) => !prev);
  props.adminFunc(show);

  const handleInputs = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const adminLogin = (e) => {
    e.preventDefault();
    Axios.post(`${apiurl}`+"/admin/login", {
      admin_id: admin.admin_id,
      password: admin.admin_password,
    })
      .then((response) => {
        dispatch({ type: "USER", payload: true });
        localStorage.setItem("login", true);
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("adminId", response.data.admin_id);
        localStorage.setItem("adminRefferalId",response.data.referralId)
        message.success("Login successful!");

        setAdmin({ admin_id: "", admin_password: "" }); // Use setAdmin to reset the state
        navigate("/admindashboard");
      })
      .catch((error) => {

        message.warning(error.response.data.message)
      });
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Admin Login</Modal.Title>
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
                      value={admin.admin_id}
                      name="admin_id"
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
                      value={admin.admin_password}
                      name="admin_password"
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
}

export default AdminLogin;

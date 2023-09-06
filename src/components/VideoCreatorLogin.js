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

const VideoCreatorLogin = (props) => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [videoCreator, setVideoCreator] = useState({
    videoCreatorId: "",
    videoCreatorPassword: "",
  });

  const [show, setShow] = useState(true);
  const handleClose = () => setShow((prev) => !prev);
  props.VideoCreatorLoginFunc(show);

  const handleInputs = (e) => {
    setVideoCreator({ ...videoCreator, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const adminLogin = (e) => {
    e.preventDefault();
    axios.post( `${apiurl}`+"/videoCreator/login", {
      userId: videoCreator.videoCreatorId,
      password: videoCreator.videoCreatorPassword,
    })
      .then((response) => {
        dispatch({ type: "USER", payload: true });
        console.log(response.data.videoCreaterToken)
        localStorage.setItem("login", true);
        localStorage.setItem("videoCreatorToken", response.data.videoCreaterToken);
        setVideoCreator({ stateAdmin_id: "", stateAdmin_password: "" });
        navigate("/admindashboard/video");
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
          <Modal.Title>Creator Login</Modal.Title>
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
                      value={videoCreator.videoCreatorId}
                      name="videoCreatorId"
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
                      value={videoCreator.videoCreatorPassword}
                      name="videoCreatorPassword"
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

export default VideoCreatorLogin
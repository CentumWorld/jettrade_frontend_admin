import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select, message, Spin } from "antd";
import { UserOutlined, MobileOutlined, MailOutlined } from "@ant-design/icons";
import axios from "axios";
import uploadImg from "../img/upload.png";
import "../css/profileModal.css";
import baseUrl from "../baseUrl";
import { FaPenAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const apiurl = baseUrl.apiUrl;

const { Option } = Select;

const ProfileModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const stateAdmintoken = localStorage.getItem("stateHandlerToken");
  const franchiseToken = localStorage.getItem("franchiseToken");
  const bussinessToken = localStorage.getItem("bussinessAdminToken");
  const isSubAdminToken = localStorage.getItem("subAdminToken");
  const [fieldValue, setFieldValue] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    gender: "",
  });
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  const getUserIdForToken = (token) => {
    if (token === stateAdmintoken) {
      return localStorage.getItem("stateHandlerId");
    } else if (token === franchiseToken) {
      return localStorage.getItem("franchiseId");
    } else if (token === bussinessToken) {
      return localStorage.getItem("businessId");
    } else if (token === isSubAdminToken) {
      return localStorage.getItem("subAdminId");
    }
    return "";
  };

  const fetchProfilePicture = async (token) => {
    const userId = getUserIdForToken(token);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = {
      userid: userId,
    };

    try {
      let endpoint = "";
      if (token === stateAdmintoken) {
        endpoint = "/state/get-sho-profile-photo";
      } else if (token === franchiseToken) {
        endpoint = "/state/get-franchise-profile-photo";
      } else if (token === bussinessToken) {
        endpoint = "/businessDeveloper/get-bd-profile-photo";
      }
      const res = await axios.post(`${apiurl}` + endpoint, data, config);
      setProfilePictureUrl(res.data.data.imageUrl);
    } catch (err) {
      message.warning(err.response.data.message);
    }
  };

  useEffect(() => {
    if (visible) {
      if (stateAdmintoken) {
        fetchProfilePicture(stateAdmintoken);
      } else if (franchiseToken) {
        fetchProfilePicture(franchiseToken);
      } else if (bussinessToken) {
        fetchProfilePicture(bussinessToken);
      }
    }
  }, [visible, stateAdmintoken, franchiseToken, bussinessToken]);

  useEffect(() => {
    async function fetchStateDetails() {
      try {
        const response = await fetch(
          `${apiurl}` + "/state/get-own-state-details",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${stateAdmintoken}`,
            },
          }
        );
        const data = await response.json();
        console.log(data, "oooo");
        setFieldValue(data.data);
      } catch (error) {
        console.error("Error fetching state details", error);
      }
    }

    // franchise details api
    async function fetchFranchiseDetails() {
      try {
        const response = await fetch(
          `${apiurl}` + "/franchise/get-own-franchise-details",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${franchiseToken}`,
            },
          }
        );
        const data = await response.json();

        setFieldValue(data.data);
      } catch (error) {
        console.error("Error fetching state details", error);
      }
    }

    // bussiness details API
    async function fetchBussinessDetails() {
      try {
        const response = await fetch(
          `${apiurl}` + "/businessDeveloper/get-own-business-developer-details",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${bussinessToken}`,
            },
          }
        );
        const data = await response.json();
        setFieldValue(data.data);
      } catch (error) {
        console.error("Error fetching state details", error);
      }
    }

    async function fetchSubAdminDetails() {
      try {
        const response = await fetch(
          `${apiurl}` + "/subAdmin/get-own-sub-admin-details",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${isSubAdminToken}`,
            },
          }
        );
        const data = await response.json();
        setFieldValue(data.data);
      } catch (error) {
        console.error("Error fetching state details", error);
      }
    }

    if (stateAdmintoken) {
      fetchStateDetails();
    } else if (franchiseToken) {
      fetchFranchiseDetails();
    } else if (bussinessToken) {
      fetchBussinessDetails();
    } else if (isSubAdminToken) {
      fetchSubAdminDetails();
    }
  }, []);

  const handleEditClick = (field) => {
    setEditingField(field);
  };

  const handleFieldEdit = (fieldName, newValue) => {
    setFieldValue((prevData) => ({
      ...prevData,
      [fieldName]: newValue,
    }));
  };

  const handleSaveClick = async () => {
    if (stateAdmintoken) {
      try {
        console.log("Sending Payload:", {
          [editingField]: fieldValue[editingField],
        });
        const response = await axios.put(
          `${apiurl}` + "/state/update-state-details",
          fieldValue,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${stateAdmintoken}`,
            },
          }
        );
        console.log("API Response:", response.data);

        setFieldValue((prevValues) => ({
          ...prevValues,
          [editingField]: response.data[editingField],
        }));

        setEditingField(null);
      } catch (error) {
        console.error("Error updating state details", error);
      }
    } else if (franchiseToken) {
      try {
        console.log("Sending Payload:", {
          [editingField]: fieldValue[editingField],
        });
        const response = await axios.put(
          `${apiurl}` + "/franchise/update-franchise-own-details",
          fieldValue,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${franchiseToken}`,
            },
          }
        );
        console.log("API Response:", response.data);

        setFieldValue((prevValues) => ({
          ...prevValues,
          [editingField]: response.data[editingField],
        }));

        setEditingField(null);
      } catch (err) {
        console.error("Error", err.message);
      }
    } else if (bussinessToken) {
      try {
        console.log("Sending Payload:", {
          [editingField]: fieldValue[editingField],
        });
        const response = await axios.put(
          `${apiurl}` +
            "/businessDeveloper/update-own-business-developer-details",
          fieldValue,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${bussinessToken}`,
            },
          }
        );
        console.log("API Response:", response.data);

        setFieldValue((prevValues) => ({
          ...prevValues,
          [editingField]: response.data[editingField],
        }));

        setEditingField(null);
      } catch (err) {
        console.error("Error", err.message);
      }
    } else if (isSubAdminToken) {
      try {
        console.log("Sending Payload:", {
          [editingField]: fieldValue[editingField],
        });
        const response = await axios.put(
          `${apiurl}` + "/subAdmin/update-own-sub-admin-details",
          fieldValue,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${isSubAdminToken}`,
            },
          }
        );
        console.log("API Response:", response.data);

        setFieldValue((prevValues) => ({
          ...prevValues,
          [editingField]: response.data[editingField],
        }));

        setEditingField(null);
      } catch (err) {
        console.error("Error", err.message);
      }
    }
  };

  const defaultImageURL = uploadImg;

  const [image, setImage] = useState({
    placeholder: defaultImageURL,
    file: null,
  });

  console.log("iMAGE------------>", image);

  const handleProfileImageChange = (e) => {
    document.getElementById("file-input").click();

    if (
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage({
          placeholder: reader.result,
          file: e.target.files[0],
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      toast.error("Invalid File !! ");
      image.file = null;
    }
  };

  const uploadProfile = (event) => {
    event.preventDefault();

    if (stateAdmintoken) {
      const token = localStorage.getItem("stateHandlerToken");
      setLoading(true);
      let formData = new FormData();
      formData.append("profilePhoto", image.file);
      formData.append("userid", localStorage.getItem("stateHandlerId"));
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .post(`${apiurl}` + "/state/upload-sho-profile-photo", formData, config)
        .then((res) => message.success(res.data.message))
        .catch((err) => message.warning(err.response.data.message));
      setLoading(false);
    } else if (franchiseToken) {
      const token = localStorage.getItem("franchiseToken");
      setLoading(true);
      let formData = new FormData();
      formData.append("profilePhoto", image.file);
      formData.append("userid", localStorage.getItem("frenchiseId"));
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .post(
          `${apiurl}` + "/franchise/upload-franchise-profile-photo",
          formData,
          config
        )
        .then((res) => message.success(res.data.message))
        .catch((err) => message.warning(err.response.data.message));
      setLoading(false);
    } else {
      const token = localStorage.getItem("bussinessAdminToken");
      setLoading(true);
      let formData = new FormData();
      formData.append("profilePhoto", image.file);
      formData.append("userid", localStorage.getItem("businessId"));
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .post(
          `${apiurl}` + "/businessDeveloper/upload-bd-profile-photo",
          formData,
          config
        )
        .then((res) => message.success(res.data.message))
        .catch((err) => message.warning(err.response.data.message));
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        editingField !== null && (
          <Button key="submit" type="primary" onClick={handleSaveClick}>
            Save
          </Button>
        ),
      ]}
    >
      <ToastContainer />
      <Form form={form} layout="vertical">
        <div
          className="file-input-container"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <form>
            <input
              id="file-input"
              type="file"
              name="file1"
              onChange={handleProfileImageChange}
              style={{ display: "none" }}
            />
            <label htmlFor="file-input">
              <img
                src={
                  image.file
                    ? image.placeholder
                    : profilePictureUrl || uploadImg
                }
                alt=""
                height={100}
                width={100}
                style={{
                  objectFit: "cover",
                  cursor: "pointer",
                  borderRadius: "50%",
                }}
              />
            </label>

            <div className="upload_file d-grid mx-auto">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={uploadProfile}
                disabled={loading}
              >
                {loading ? <Spin /> : "Upload"}
              </button>
            </div>
          </form>
        </div>
        <Form.Item label="First name" initialValue={fieldValue.fname}>
          <Input
            prefix={<UserOutlined />}
            value={fieldValue.fname}
            onChange={(e) =>
              setFieldValue({ ...fieldValue, fname: e.target.value })
            }
            style={{ width: "70%" }}
            disabled={editingField !== "username"} // Disable input if not in editing mode for this field
          />
          <FaPenAlt
            onClick={() => handleEditClick("username")} // Enable editing for this field
            style={{
              marginLeft: "1rem",
              cursor: "pointer",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "blue"; // Change the button color on hover
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "initial"; // Reset the button color when mouse leaves
            }}
          />
        </Form.Item>
        <Form.Item label="Last name" initialValue={fieldValue.lname}>
          <Input
            prefix={<UserOutlined />}
            value={fieldValue.lname}
            onChange={(e) =>
              setFieldValue({ ...fieldValue, lname: e.target.value })
            }
            disabled={editingField !== "lastname"} // Disable input if not in editing mode for this field
            style={{ width: "70%" }}
          />
          <FaPenAlt
            onClick={() => handleEditClick("lastname")} // Enable editing for this field
            style={{
              marginLeft: "1rem",
              cursor: "pointer",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "blue"; // Change the button color on hover
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "initial"; // Reset the button color when mouse leaves
            }}
          />
        </Form.Item>
        <Form.Item label="Mobile Phone" initialValue={fieldValue.phone}>
          <Input
            prefix={<MobileOutlined />}
            value={fieldValue.phone}
            onChange={(e) =>
              setFieldValue({ ...fieldValue, phone: e.target.value })
            }
            disabled={editingField !== "mobile"} // Disable input if not in editing mode for this field
            style={{ width: "70%" }}
          />
          <FaPenAlt
            onClick={() => handleEditClick("mobile")} // Enable editing for this field
            style={{
              marginLeft: "1rem",
              cursor: "pointer",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "blue"; // Change the button color on hover
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "initial"; // Reset the button color when mouse leaves
            }}
          />
        </Form.Item>
        <Form.Item label="Email" initialValue={fieldValue.email}>
          <Input
            prefix={<MailOutlined />}
            value={fieldValue.email}
            onChange={(e) =>
              setFieldValue({ ...fieldValue, email: e.target.value })
            }
            disabled={editingField !== "email"} // Disable input if not in editing mode for this field
            style={{ width: "70%" }}
          />
          <FaPenAlt
            onClick={() => handleEditClick("email")}
            style={{
              marginLeft: "1rem",
              cursor: "pointer", // Add a pointer cursor on hover
              transition: "color 0.3s",
            }} // Enable editing for this field
            onMouseEnter={(e) => {
              e.target.style.color = "blue"; // Change the button color on hover
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "initial"; // Reset the button color when mouse leaves
            }}
          />
        </Form.Item>
        <Form.Item label="Gender" initialValue={fieldValue.gender}>
          <Select
            value={fieldValue.gender}
            onChange={(value) => handleFieldEdit("gender", value)}
            disabled={editingField !== "gender"} // Disable select if not in editing mode for this field
            style={{ width: "70%" }}
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
          <FaPenAlt
            onClick={() => handleEditClick("gender")} // Enable editing for this field
            style={{
              marginLeft: "1rem",
              cursor: "pointer",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "blue"; // Change the button color on hover
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "initial"; // Reset the button color when mouse leaves
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProfileModal;

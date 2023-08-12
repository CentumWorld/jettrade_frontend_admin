import React, { useState } from 'react'
import { Modal, Form, Input, Button, message } from 'antd'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function SubAdmin(props) {
    const [modalVisible, setModalVisible] = useState(true);
    const modalVisibleShow = () => {
        setModalVisible(true)
    }
    
    const navigate = useNavigate();
    const handleClose = () => setModalVisible((prev) => !prev);
    props.subadminfunc(modalVisible);

    const onFinish = (values) => {
        setModalVisible(false);
        console.log('Form values:', values.name, values.password);

        let data = {
            "subAdminId": values.name,
            "password": values.password,
        }
        console.log(data);
        
        axios.post("/admin/sub-admin-login",data)
        .then((res)=>{
            console.log(res.data)
            localStorage.setItem("login", true);
            localStorage.setItem("adminToken", res.data.token);
            // localStorage.setItem("isSubAdmin",res.data.user.isSubAdmin);
            localStorage.setItem("subAdminId",res.data.subAdminId);
            
         navigate("/admindashboard/dashboard");
        })
        .catch((err)=>{
            message.error(err.response.data.message)
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Form validation failed:', errorInfo);
    };
    return (
        <>
            <Modal
                title="Sub Admin"
                open={modalVisibleShow}
                onCancel={handleClose}
                footer={null}

            >
                <Form
                    name="myForm"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="User ID"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your userid!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default SubAdmin
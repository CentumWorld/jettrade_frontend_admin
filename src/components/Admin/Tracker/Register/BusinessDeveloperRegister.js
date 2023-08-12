import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const BusinessDeveloperRegister = (props) => {

    return (
        <>
            <div>
                <Modal
                    title="Basic Modal"
                    open={props.isModalVisible}
                    onCancel={props.closeModal}
                    onOk={props.closeModal}
                >
                    <p>This is some modal content.</p>
                </Modal>
            </div>
        </>
    )
}

export default BusinessDeveloperRegister

//BusinessDeveloperRegister
import React, { useState } from 'react';
import '../css/NewRenewal.css';
import { AiFillPlusCircle } from 'react-icons/ai';
import { Button } from 'antd';
import BusinessDeveloperRegister from './Register/BusinessDeveloperRegister';

const BusinessDeveloper = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };
    return (
        <>
            <BusinessDeveloperRegister  isModalVisible={isModalVisible} closeModal={closeModal} />
            <div className="new-renewal-container">
                <div className="new-renewal-header">
                    <div className="new-renewal-content">
                        <p>Business Developer</p>
                        <Button type="primary" onClick={showModal}>
                            <AiFillPlusCircle /> &nbsp;&nbsp;Add Business Developer
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BusinessDeveloper;

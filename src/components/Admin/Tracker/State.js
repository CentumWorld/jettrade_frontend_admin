import React, { useState } from 'react';
import '../css/NewRenewal.css';
import { AiFillPlusCircle } from 'react-icons/ai';
import { Button } from 'antd';
import StateRegister from './Register/StateRegister';

const State = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };
    return (
        <>
            <StateRegister  isModalVisible={isModalVisible} closeModal={closeModal} />
            <div className="new-renewal-container">
                <div className="new-renewal-header">
                    <div className="new-renewal-content">
                        <p>State</p>
                        <Button type="primary" onClick={showModal}>
                            <AiFillPlusCircle /> &nbsp;&nbsp;Add State
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default State;

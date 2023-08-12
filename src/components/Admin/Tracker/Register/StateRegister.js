import React, { useState } from 'react';
import { Modal, Button, Input, Select, Checkbox, Dropdown, Menu } from 'antd';
import allState from '../AllStateAndDistrict';

const { Option } = Select;

const StateRegister = (props) => {
    const [selectedStates, setSelectedStates] = useState([]);

    const handleCheckboxChange = (state) => {
        if (selectedStates.includes(state)) {
            setSelectedStates(selectedStates.filter(selected => selected !== state));
        } else {
            setSelectedStates([...selectedStates, state]);
        }
    };

    const menu = (
        <Menu>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {allState.states.map(state => (
                    <Menu.Item key={state.state}>
                        <Checkbox
                            onChange={() => handleCheckboxChange(state.state)}
                            checked={selectedStates.includes(state.state)}
                        >
                            {state.state}
                        </Checkbox>
                    </Menu.Item>
                ))}
            </div>
        </Menu>
    );

    return (
        <>
            <div>
                <Modal
                    title="State Register"
                    open={props.isModalVisible}
                    onCancel={props.closeModal}
                    onOk={props.closeModal}
                >
                    <div className='form-container'>
                        <div className='state-field'>
                            <label>First Name</label>
                            <Input placeholder='First Name' />
                        </div>
                        <div className='state-field'>
                            <label>Last Name</label>
                            <Input placeholder='Last Name' />
                        </div>
                        <div className='state-field'>
                            <label>Email</label>
                            <Input placeholder='Email' />
                        </div>
                        <div className='state-field'>
                            <label>Phone</label>
                            <Input placeholder='Phone' />
                        </div>
                        <div className='d-flex justify-content-between'>
                            <div className='state-field'>
                                <label>Gender</label><br/>
                                <Select placeholder="Select Gender" style={{ width: 150 }}>
                                    <Option value='Male'>Male</Option>
                                    <Option value='Female'>Female</Option>
                                    <Option value='Other'>Other</Option>
                                </Select>
                            </div>
                            <div className='state-field'>
                                <label>State</label><br/>
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <Button>Select state</Button>
                                </Dropdown>
                                <div>
                                    <strong>Selected States:</strong>
                                    <ul>
                                        {selectedStates.map(state => (
                                            <li key={state}>{state}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='state-field'>
                            <label>Aadhar</label>
                            <Input type='file' placeholder='Aadhar' />
                        </div>
                        <div className='state-field'>
                            <label>Pan No.</label>
                            <Input type='file' placeholder='Pan' />
                        </div>
                        <div className='state-field'>
                            <label>ID</label>
                            <Input type='text' placeholder='State Handler Id' />
                        </div>
                        <div className='state-field'>
                            <label>Password</label>
                            <Input type='password' placeholder='Password' />
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default StateRegister;

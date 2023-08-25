import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import StateChatWithFrench from '../StateAdminRoutes/StateChatWithFrench';
import '../../../src/components/Admin/css/LiveChat.css'
import ScrollToBottom from 'react-scroll-to-bottom'
import axios from 'axios';
import chatIcon from '../../img/user_profile.png'
import { AiOutlineBell } from 'react-icons/ai';
import baseUrl from '../../baseUrl';

const apiurl = baseUrl.apiUrl
const socket = io.connect('http://localhost:4000');

const StateLiveChatWithFrench = () => {

    const [frenchiseename, setFrenchiseename] = useState("admin");
    const [room1, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [type, setType] = useState('FRENCHWITHSHO')
    const [chatFrenchisee, setChatFrenchisee] = useState([]);
    const [notification, setNotificaton] = useState('');
    const [SHOownDetails, setSHOownDetails] = useState("");



    const handleDataFromChild = (data) => {
        setShowChat(data);
    };
    const joinRoom = (id) => {

        setRoom(id);

        if (frenchiseename !== "" && room1 !== "") {
            socket.emit("join_room", room1, type);
            // ---------------------------------
            setShowChat(true);
            setNotificaton('');
        }
    }

    useEffect(() => {
        setNotificaton(localStorage.getItem('noti'))
        SHOfetchOwnDetails()
        fetchAllUserChat();

        //admin logout
        return () => {
            socket.emit('adminLogout', 'admin');
            //socket.disconnect();
        }
    }, [])

    const SHOfetchOwnDetails = () => {
        let token = localStorage.getItem('stateHandlerToken');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get('/state/get-own-state-details', config)
            .then((result) => {
                //  console.log(result.data.data.referralId)
                 setSHOownDetails(result.data.data.referralId);
                 fetchAllUserChat(result.data.data.referralId)
            })
            .catch(err => {
                console.log(err)
            })
    }


    const fetchAllUserChat = (referralId) => {
        let token = localStorage.getItem('stateHandlerToken');

        const data = {
            refferedId:referralId
        }
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.post('/state/state/fetch-frenchise-chat-count-with-state', data,config)
            .then((result) => {
                // console.log(result.data.frenchChatCount,'82')
                 setChatFrenchisee(result.data.frenchChatCount);
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <>
            <div className="text-center">
                {!showChat ? (
                    <div className='chat-window'>
                        <div className="chat-header">
                            <p>Chat History</p>
                        </div>
                        <div className='chat-body'>
                            <ScrollToBottom className='message-container'>
                                {chatFrenchisee.map((item, index) => (
                                    <div key={index}>
                                        <div className='chat-request-person'
                                            onClick={() => joinRoom(item.frenchiseId)}
                                        >

                                            <div><img src={chatIcon} /> &nbsp;{item.frenchiseId}</div>
                                            {notification === item.frenchiseId ? <div style={{ color: 'green' }}><AiOutlineBell /></div> : ''}
                                        </div>
                                    </div>
                                ))}

                            </ScrollToBottom>
                        </div>
                        <div className='chat-footer'>

                        </div>

                    </div>
                )
                    : (
                        <StateChatWithFrench socket={socket} statename={frenchiseename} room={room1} sendDataToParent={handleDataFromChild} />
                    )}
            </div>

        </>
    )
}

export default StateLiveChatWithFrench
import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import { AiOutlineSend } from 'react-icons/ai'
import { BiArrowBack } from 'react-icons/bi'
import axios from 'axios';
import baseUrl from '../../../baseUrl';

const apiurl = baseUrl.apiUrl
const BusinessChatAdmin = ({ socket, businessname, room, sendDataToParent }) => {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [businessOnline, setBusinessOnline] = useState(false);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: businessname,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            await socket.emit("adminMessgaeBusiness", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }

    };
    const handleClick = () => {
        const data = false;
        sendDataToParent(data);
        localStorage.removeItem('noti')
    };

    useEffect(() => {
        fetchChatMessage();

        //user online or not
        console.log(room)
        businessOnlineOrNOt(room)
        socket.on('businessOnline', (userId) => {
            businessOnlineOrNOt(userId)
        })


        //admin received message from user
        socket.on("admin_receive_message", (data) => {
            fetchChatMessage();
            //setMessageList((list) => [...list, data])
            console.log(data, '48')
            localStorage.setItem('noti', data.room)

        });

        //Listen for user offline event
        socket.on('businessOffline', (userId) => {
            businessOnlineOrNOt(userId)
        })

    }, [socket]);


    const fetchChatMessage = () => {
        let token = localStorage.getItem('adminToken')
        console.log(room, '71');
        let data = {
            room: room
        }
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.post(`${apiurl}`+'/admin/fetch-business-chat-message-admin', data, config)
            .then((result) => {
                // console.log(result.data.businessChatMessage)
                //setMessageList((list) => [...list, result.data.adminChatMessage])
                setMessageList(result.data.businessChatMessage)
            })
            .catch(err => {
                console.log(err.response)
            })
        //console.log(messageList)

    }

    // user online or not
    const businessOnlineOrNOt = (data) => {
        console.log(data);
        const data1 = {
            businessDeveloperId: data
        }
        let token = localStorage.getItem('adminToken');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.post(`${apiurl}`+'/admin/admin-business-online-or-not', data1, config)
            .then((res) => {
                setBusinessOnline(res.data.isOnline)
            })
            .catch((err) => {
                console.log(err.response)
            })


    }
    const statusClass = businessOnline ? 'online' : 'offline';

    return (
        <div className='chat-window'>
            <div className="chat-header1">
                <div className="left-item" onClick={handleClick}><BiArrowBack /></div>
                <div className="centered-item">Live Chat &nbsp; <span className={statusClass}>{businessOnline ? 'Online' : 'Offline'}</span></div>
            </div>
            <div className='chat-body'>
                <ScrollToBottom className='message-container'>
                    {messageList.map((messageContent, index) => {
                        return <div key={index} className='message' id={businessname === messageContent.author ? "you" : "other"}>
                            <div >
                                <div className='message-content'>
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className='message-meta'>
                                    <p id="time">{messageContent.time}</p>
                                    <p id="author">{messageContent.author}</p>
                                </div>
                            </div>
                        </div>
                    })}
                </ScrollToBottom>
            </div>
            <div className='chat-footer'>
                <input
                    type="text"
                    value={currentMessage}
                    placeholder='Hey...'
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}><AiOutlineSend /></button>
            </div>
            <div className='chat-footer'>

            </div>
        </div>
    )
}

export default BusinessChatAdmin
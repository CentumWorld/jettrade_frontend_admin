import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import io from 'socket.io-client';
import { AiOutlineSend } from 'react-icons/ai'
import { message } from 'antd'
import axios from 'axios'
import baseUrl from '../../baseUrl'

const apiurl = baseUrl.apiUrl
const socket = io.connect('http://103.149.68.19:8081');
const BusinessDChatWithFrenchise = ({ socket, businessname, room }) => {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [isBusinessOnline, setIsBusinessOnline] = useState(false);
    const [join, setJoin] = useState('')
    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: businessname,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            await socket.emit("businessWithFrenchMessage", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }

    };

    useEffect(() => {
        joinResponse();
        fetchChatMessage();
        businessOffline();



        //received message from admin
        socket.on("business_receive_message", (data) => {
            //console.log(data)
            //setMessageList((list) => [...list, data])
            fetchChatMessage();

        });

        // admin online
        // Listen for admin online
        socket.on('BusinessWithFrenchOnline', (data)=>{
            businessOffline();
        })

        // Listen for admin offline
        socket.on('businessOffline', (data)=>{
            setIsBusinessOnline();
        })
        //Clean up on component unmount
        return () => {
            socket.emit('businessLogout', room);
            //socket.disconnect();
        }


    }, [socket]);

    const joinResponse = () => {

        socket.on("businessResponse", (data) => {
            message.success(data);
        })
    }

    // message chat
    const fetchChatMessage = () => {
        console.log('77 ')
        let token = localStorage.getItem('bussinessAdminToken')
        let data = {
            room: room
        }
        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
        };
        axios.post(`${apiurl}`+'/businessDeveloper/businessDeveloper/businessD-fetch-chat-message-with-french', data, config)
            .then((result) => {
                console.log(result.data.businessChatMessageWithFrench)
                //setMessageList((list) => [...list, result.data.adminChatMessage])
                setMessageList(result.data.businessChatMessageWithFrench)
            })
            .catch(err => {
                console.log(err.response)
            })
        //console.log(messageList)

    }

    const businessOffline = () => {
        let token = localStorage.getItem('bussinessAdminToken')

        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
        };

        let data = {
            businessDeveloperId : localStorage.getItem('businessId')
            
        }

        axios.post(`${apiurl}` +'/businessDeveloper/businessDeveloper/Frenchise-online-or-not-for-businessD',data,config)
        
        .then((res)=>{
            console.log(res.data,'hii')
            setIsBusinessOnline(res.data.isFrenchiseOnline)
        })
        .catch((err)=>{
            console.log(err.response)
        })

    }

    const statusClass = isBusinessOnline ? 'online' : 'offline';
    return (
        <div className='chat-window'>
            <div className='chat-header'>

                <p>Live Chat &nbsp;<span className={statusClass}>{isBusinessOnline ? 'Online' : 'Offline'}</span></p> 
                
            </div>
            <div className='chat-body'>
                <ScrollToBottom className='message-container'>
                    {messageList.map((messageContent, index) => {
                        return <div key={index} className='message' id={businessname === messageContent.author ? "you" : "other"}>
                            <div>
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

export default BusinessDChatWithFrenchise
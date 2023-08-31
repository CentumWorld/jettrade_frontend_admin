import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import { AiOutlineSend } from 'react-icons/ai'
import { BiArrowBack } from 'react-icons/bi'
import axios from 'axios';
import baseUrl from '../../baseUrl';

const apiurl = baseUrl.apiUrl
const FrenchiseChatWithBD = ({ socket, frenchiseename, room, sendDataToParent }) => {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [businessOnline, setBusinessOnline] = useState(false);
    const [stateOwnDetails,setStateOwnDetails] = useState("");

    console.log(socket, frenchiseename, room)
    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: frenchiseename,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
                // referredId:stateOwnDetails
            };
            await socket.emit("frenchMessgaeBusiness", messageData);
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
        // fetchStateOwnDetails();

        //user online or not
        businessOnlineOrNOt(room)
        socket.on('frenchiseOnline', (userId) => {
            setBusinessOnline(userId)
        })


        //admin received message from user
        socket.on("business_receive_message", (data) => {
            fetchChatMessage();
            //setMessageList((list) => [...list, data])
            console.log(data, '48')
            localStorage.setItem('noti', data.room)

        });



        //Listen for user offline event
        socket.on('frenchOffline', (userId) => {
            businessOnlineOrNOt(userId)
        })

        //Clean up on component unmount
        return () => {
            socket.emit('frenchLogout', room);
            //socket.disconnect();
        }



    }, [socket]);

    // fetchStateOwnDetails
    // const fetchStateOwnDetails = () => {
    //     let token = localStorage.getItem('stateHandlerToken')

    //     const config = {
    //         headers: { Authorization: `Bearer ${token}` }
    //     };

    //     axios.get('/state/get-own-state-details',config)
    //     .then((result) => {
    //         // console.log(result.data.data.referralId)
    //         setStateOwnDetails(result.data.data.referralId)
    //     })
    //     .catch(err => {
    //         console.log(err.response)
    //     })
    // }


    const fetchChatMessage = () => {
        let token = localStorage.getItem('franchiseToken')
        console.log(room, '71');
        let data = {
            room: room
        }
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.post(`${apiurl}`+'/frenchise/frenchise/frenchise-fetch-business-chat-message', data, config)
            .then((result) => {
                console.log(result.data.frenchChatMessageWithBusiness)
                //setMessageList((list) => [...list, result.data.adminChatMessage])
                setMessageList(result.data.frenchChatMessageWithBusiness)
            })
            .catch(err => {
                console.log(err.response)
            })
        //console.log(messageList)

    }

    // frenchise online or not
    const businessOnlineOrNOt = (data) => {
        console.log(data);
        const data1 = {
            businessDeveloperId: data
        }
        let token = localStorage.getItem('franchiseToken');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.post(`${apiurl}`+'/frenchise/frenchise/frenchise-business-online-or-not', data1, config)
            .then((res) => {
                console.log(res.data.isOnline,'123')
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
                        return <div key={index} className='message' id={frenchiseename === messageContent.author ? "you" : "other"}>
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

export default FrenchiseChatWithBD
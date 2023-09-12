import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Chat from './Chat'
import '../../../src/components/Admin/css/LiveChat.css'
import { Input } from 'antd';
import axios from 'axios';
import baseUrl from '../../baseUrl';



const apiurl = baseUrl.apiUrl

//  const socket = io.connect('http://103.149.68.19:8081');
// const socket = io.connect('http://localhost:4000');

const StateLiveChat = () => {
    // const stateFname = localStorage.getItem('stateHandlerName');
    // const stateHandlerId = localStorage.getItem('stateHandlerId');

    // const [statename, setStatename] = useState(stateFname);
    // const [room, setRoom] = useState(stateHandlerId );
    // const [showChat, setShowChat] = useState(false);
    // const [type, setType] = useState('STATE');

    // const joinRoom = () => {
    //     if (statename !== "" && room !== "") {
    //         socket.emit("join_room", room, type);
    //         console.log(statename,room,type,'27')
    //         setShowChat(true);
    //     }
    // }

    // useEffect(() => {
    //     exitChatState();
    // }, [])

    // const exitChatState = () => {
    //     let token = localStorage.getItem('stateHandlerToken')
    //     let data = {
    //         stateHandlerId: localStorage.getItem('stateHandlerId')
    //     }

    //     let config = {
    //         headers: { 'Authorization': `Bearer ${token}` }
    //     }

    //     axios.post(`${apiurl}`+'/state/state/fetch-chat-details-state', data, config)
    //         .then((result) => {
    //             const length = result.data.stateChatDetails.length;
    //             console.log(length);
    //             if (length > 0) {
    //                 joinRoom()
    //                 setShowChat(true)
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })

    // }


    // return (
    //     <>
    //         <div className="text-center">
    //             {!showChat ? (
    //                 <div className='joinChatContainer'>
    //             <h3 >Join a Chat</h3>
    //             <Input
    //                 type="text"
    //                 value={statename}
    //                 placeholder='Join......'
    //                 onChange={(event) => { setStatename(event.target.value) }
    //                 }
    //                 disabled={true}
    //                  />
    //             <Input
    //                 type="text"
    //                 value={room}
    //                 placeholder='Room Id...'
    //                 onChange={(event) => { setRoom(event.target.value) }
    //                 }
    //                 disabled={true} />

    //                 <button className='btn btn-primary' onClick={joinRoom} style={{fontFamily:'Calibri'}} >Join Chat</button>
    //             </div>

    //         )
    //         : (
    //         <Chat socket={socket} statename={statename} room={room} />
    //             )}
    //     </div >

    //     </>
    // )
}

export default StateLiveChat
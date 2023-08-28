import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import '../../../src/components/Admin/css/LiveChat.css'
import { Input } from 'antd';
import axios from 'axios';
import baseUrl from '../../baseUrl';
import FrenchiseChatWithBD from './FrenchiseChatWithBD';


const apiurl = baseUrl.apiUrl

const socket = io.connect('http://103.149.68.19:8081');

const FrenchiseLiveChatWithSHO = () => {
    const frenchFname = localStorage.getItem('frenchFname');
    const frenchId = localStorage.getItem('frenchiseId');

    const [frenchname, setFrenchname] = useState(frenchFname);
    const [room, setRoom] = useState(frenchId );
    const [showChat, setShowChat] = useState(false);
    const [type, setType] = useState('FRENCHWITHSHO');

    const joinRoom = () => {
        if (frenchname !== "" && room !== "") {
            socket.emit("join_room", room, type);
            setShowChat(true);
        }
    }

    useEffect(() => {
        exitChatFrench();
    }, [])

    const exitChatFrench = () => {
        let token = localStorage.getItem('franchiseToken')
        let data = {
            frenchiseId: localStorage.getItem('frenchiseId')
        }

        let config = {
            headers: { 'Authorization': `Bearer ${token}` }
        }

        axios.post(`${apiurl}`+'/frenchise/frenchise/fetch-chat-details-frechise-with-sho', data, config)
            .then((result) => {
                const length = result.data.frenchChatDetailsWithSHO.length;
                console.log(length);
                if (length > 0) {
                    joinRoom()
                    setShowChat(true)
                }
            })
            .catch(err => {
                console.log(err)
            })

    }


    return (
        <>
            <div className="text-center">
                {!showChat ? (
                    <div className='joinChatContainer'>
                <h3 >Join a Chat</h3>
                <Input
                    type="text"
                    value={frenchname}
                    placeholder='Join......'
                    onChange={(event) => { setFrenchname(event.target.value) }
                    }
                    disabled={true}
                     />
                <Input
                    type="text"
                    value={room}
                    placeholder='Room Id...'
                    onChange={(event) => { setRoom(event.target.value) }
                    }
                    disabled={true} />

                    <button className='btn btn-primary' onClick={joinRoom} style={{fontFamily:'Calibri'}} >Join Chat</button>
                </div>

            )
            : (
            <FrenchiseChatWithBD socket={socket} frenchname={frenchname} room={room} />
                )}
        </div >

        </>
    )
}

export default FrenchiseLiveChatWithSHO
import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App';
import baseUrl from '../baseUrl';

const apiurl = baseUrl.apiUrl

function Logout() {
    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/admin/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },

        }).then((res) => {
            dispatch({ type: "USER", payload: false })
            localStorage.removeItem('login');
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminId');
            localStorage.removeItem('subAdminId');
            localStorage.removeItem('userid');
            localStorage.removeItem('stateHandlerToken');
            localStorage.removeItem('subAdminToken');
            localStorage.removeItem("franchiseToken");
            localStorage.removeItem("frenchiseId");

            navigate('/');
        }).catch((error) => {
            navigate('/');
        })
    }, [state])
    return (
        <></>
    )
}

export default Logout
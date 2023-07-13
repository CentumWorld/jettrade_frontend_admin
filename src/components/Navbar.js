import React, { useContext, useState } from 'react'
import '../css/Navbar.css'
import { NavLink } from 'react-router-dom';
import { UserContext } from '../App';
import UserRegistration from './UserRegistration';
import AdminLogin from './AdminLogin';
import UserLogin from './UserLogin';
import Button from 'react-bootstrap/Button';


function Navbar() {
    const { state, dispatch } = useContext(UserContext);
    const login = localStorage.getItem('login');
    

    const [userShow, setUserShow] = useState(false);
    const [adminShow, setAdminShow] = useState(false);

    const openUserLoginFuction = () => setUserShow(true);
    const pull_data =(data) => setUserShow(data);

    

    const openAdminLoginFuction = () => setAdminShow(true);
    const pull_addmin =(data) => setAdminShow(data);
    
    const RenderMenu = () => {
        if (login) {
            return (

                <>

                    <li className="nav-item">
                        <NavLink className="btn btn-outline-dark rounded-pill " to="/logout" aria-current="page" >Logout</NavLink>
                    </li>
                </>
            )
        } else {
            return (
                <>
                    <li className="nav-item">
                        {/* <button className=" btn rounded btn-outline-primary rounded-pill" data-bs-toggle="modal" data-bs-target="#adminLogin" aria-current="page">Admin</button> */}
                        <Button variant=" btn rounded btn-outline-primary rounded-pill" onClick={openAdminLoginFuction}>
                            Admin
                        </Button>
                    </li>&nbsp;&nbsp;
                    {/* <li className="nav-item">
                       
                        <Button variant=" btn rounded btn-outline-primary rounded-pill" onClick={openUserLoginFuction}>
                            User
                        </Button>
                       
                    </li> */}



                </>
            )
        }
    }

    return (
        <>
            <nav className="navbar navbar-box navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="navbar-brand"><h3>JETTRADE FX</h3></div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <RenderMenu />


                        </ul>

                    </div>
                </div>
                {/* {userShow?
                    <UserLogin func={pull_data}/>:''

                } */}

                
                {/* Admin Login */}
                {adminShow?
                    <AdminLogin adminFunc={pull_addmin} />:''
                }
                
            </nav>




        </>
    )
}

export default Navbar
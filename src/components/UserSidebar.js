import React, { useState } from 'react';
import '../css/UserSidebar.css';
import { motion } from "framer-motion";
import { MdDashboard, MdSend } from 'react-icons/md';
import { FaMoneyBillWaveAlt, FaBars, FaCarrot, FaUserPlus, FaBullseye } from 'react-icons/fa'
import { RxCountdownTimer } from 'react-icons/rx'
import { TfiMenuAlt, TfiGift } from 'react-icons/tfi'
import { IoTrophy } from 'react-icons/io5'
import { BiStar } from 'react-icons/bi'
import { AiOutlineSetting, AiFillBank } from 'react-icons/ai'
import { FaSlideshare } from 'react-icons/fa'
import { NavLink } from 'react-router-dom';
import UserSidebarMenu from './usersidebar/UserSidebarMenu';
import { UserModal } from '../UserModel/UserModal';


const routes = [
    {
        path: '/userdashboard/dashboard',
        name: "User",
        icon: <MdDashboard />,
    },
    {
        path: '/userdashboard/refferal',
        name:"Refferal",
        icon: <FaSlideshare/>
    },
    {
        path: '/userdashboard/withdraw',
        name: "Withdrawal",
        icon: <FaMoneyBillWaveAlt />,
    },
    {
        path: '/userdashboard/transfer',
        name: "Internal transfer",
        icon: <MdSend />,
    },
    // {
    //     path: '/userdashboard/promotion',
    //     name: "Promotions",
    //     icon: <FaCarrot />,
    // },
    {
        path: '/userdashboard',
        name: "Operation history",
        icon: <RxCountdownTimer />,
        subRoutes: [
            {
                path: "/userdashboard/deposite",
                name: 'Deposite history',
            },
            {
                path: "/userdashboard/withdrawlhistory",
                name: 'Withdrawal history',
            },
            {
                path: "/userdashboard/transferhistory",
                name: 'Transfer history',
            },


        ],
    },
    {
        path: '/userdashboard',
        name: "Trading accounts",
        icon: <TfiMenuAlt />,
        subRoutes: [
            {
                path: "/userdashboard/accountlist",
                name: 'Account list',
            },
            {
                path: "/userdashboard/managebonuses",
                name: 'Manage Bonuses',
            },
            {
                path: "/userdashboard/monitoring",
                name: 'Monitoring',
            },
            {
                path: "/userdashboard/real-account",
                name: 'Open real account',
            },
            {
                path: "/userdashboard/demo-account",
                name: 'Open demo account',
            },


        ],
    },
    {
        path: '/userdashboard/contest',
        name: "Contests",
        icon: <IoTrophy />,
        subRoutes: [
            {
                path: "/contests/champion-demo",
                name: 'Champion Demo Contest',
            },
            {
                path: "/contests/opne-champion-demo/account",
                name: ' Opne Champion Demo Contest account',
            },
        ],
    },
    // {
    //     path: '/userdashboard/statuses',
    //     name: "User Statuses",
    //     icon: <BiStar />,
    // },
    // {
    //     path: ('/invite'),
    //     name: "Invite a friend",
    //     icon: <FaUserPlus />,
    // },
    // {
    //     path: '/copytrading',
    //     name: "Copytrading",
    //     icon: <FaBullseye />,
    // },
    // {
    //     path: '/promocode',
    //     name: "Promocode",
    //     icon: <TfiGift />,
    // },

]

function UserSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(true);
    };
    console.log(showModal);

    const toggle = () => setIsOpen(!isOpen);


    return (
        <div className='main-container'>
            <motion.div animate={{ width: isOpen ? '300px' : '50px' }} className='userSidebar'>
                <div className='top_section'>
                    {isOpen && <h1 className='logo'>Badal</h1>}

                    {isOpen &&
                        <div className='setting'>
                            <AiOutlineSetting onClick={openModal} />
                            {showModal ? <UserModal setShowModal={setShowModal} /> : null}

                        </div>
                    }
                    <div className='bars'>
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {isOpen ?
                    <div>
                        <NavLink to='/userdashboard/new-deposit' className='deposit_button btn btn-primary'>START WITH A DEPOSIT</NavLink>
                    </div> :
                    <NavLink to='/userdashboard/new-deposit' className='deposit_logo'><AiFillBank /></NavLink>
                }



                <section className='routes'>
                    {routes.map((route) => {
                        if (route.subRoutes) {
                            return (
                                <UserSidebarMenu isOpen={isOpen} route={route} />
                            );
                        }
                        return (
                            <NavLink to={route.path} key={route.name} className={isOpen ? 'user_sidebar_link' : 'user_sidebar_link_small'}>
                                <div className='icon'>{route.icon}</div>
                                {isOpen && <motion.div className='link_text'>{route.name}</motion.div>}
                            </NavLink>
                        )
                    })}

                </section>

            </motion.div>


        </div>
    )
}

export default UserSidebar
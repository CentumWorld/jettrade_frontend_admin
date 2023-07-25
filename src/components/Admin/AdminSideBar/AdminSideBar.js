import React,{useState} from "react"
import { motion } from "framer-motion"
import '../AdminSideBar/AdminSideBar.css'
import { MdDashboard, MdSend, MdCloudUpload } from 'react-icons/md';
import { BsFillChatTextFill } from 'react-icons/bs'
import { FaMoneyBillWaveAlt, FaBars, FaCarrot, FaUserPlus, FaBullseye,FaSlideshare,FaUserTie,FaThemeco } from 'react-icons/fa'
import {SiManageiq} from 'react-icons/si'
import{FcNeutralTrading} from 'react-icons/fc'
import {MdBarChart} from "react-icons/md"
import { RxCountdownTimer } from 'react-icons/rx'
import { TfiMenuAlt, TfiGift } from 'react-icons/tfi'
import { IoTrophy } from 'react-icons/io5'
import { BiStar } from 'react-icons/bi'
import { NavLink } from "react-router-dom"
import AdminSideBarMenu from "./AdminSideBarMenu";



const routes = [
    {
        path:'/admindashboard/dashboard',
        name:"Dashboard",
        icon:<MdDashboard />
    },
    {
        path:'/admindashboard/chart',
        name:"Chart",
        icon:<MdBarChart />
    },
    {
        path: '/admindashboard/user',
        name: "User",
        icon: <FaUserTie />,
    },
    {
        path: '/admindashboard/refferal',
        name: "Refferal",
        icon: <FaSlideshare />,
    },
    // {
    //     path: '/admindashboard/withdrawal',
    //     name: "Withdrawal",
    //     icon: <FaMoneyBillWaveAlt />,
    // },
    // {
    //     path: '/admindashboard/transfer',
    //     name: "Internal transfer",
    //     icon: <MdSend />,
    // },
    // {
    //     path: '/admindashboard/promotion',
    //     name: "Promotions",
    //     icon: <FaCarrot />,
    // },
    // {
    //     path: '/admindashboard',
    //     name: "Operation history",
    //     icon: <RxCountdownTimer />,
    //     subRoutes: [
    //         {
    //             path: "/admindashboard/deposite",
    //             name: 'Deposite history',
    //         },
    //         {
    //             path: "/admindashboard/withdrawlhistory",
    //             name: 'Withdrawal history',
    //         },
    //         {
    //             path: "/admindashboard/transferhistory",
    //             name: 'Transfer history',
    //         },


    //     ],
    // },
    // {
    //     path: '/admindashboard',
    //     name: "Trading accounts",
    //     icon: <TfiMenuAlt />,
    //     subRoutes: [
    //         {
    //             path: "/admindashboard/accountlist",
    //             name: 'Account list',
    //         },
    //         {
    //             path: "/admindashboard/managebonuses",
    //             name: 'Manage Bonuses',
    //         },
    //         {
    //             path: "/admindashboard/monitoring",
    //             name: 'Monitoring',
    //         },
    //         {
    //             path: "/admindashboard/real-account",
    //             name: 'Open real account',
    //         },
    //         {
    //             path: "/admindashboard/demo-account",
    //             name: 'Open demo account',
    //         },


    //     ],
    // },
    // {
    //     path: '/admindashboard/contest',
    //     name: "Contests",
    //     icon: <IoTrophy />,
    //     subRoutes: [
    //         {
    //             path: "/contests/champion-demo",
    //             name: 'Champion Demo Contest',
    //         },
    //         {
    //             path: "/contests/opne-champion-demo/account",
    //             name: ' Opne Champion Demo Contest account',
    //         },
    //     ],
    // },
    {
        path: '/admindashboard/manage',
        name: "Manage",
        icon: <SiManageiq />,
        subRoutes:[
            {
                path:"manage/push-notification",
                name:' Manage Push Notification'
            },
            {
                path:"manage/subscription",
                name:"Manage Subscription"
            },
            // {
            //     path:"manage/investment",
            //     name:"Manage Investment"
            // },
            {
                path:"manage/investor-refferal-payout",
                name:" Investor Refferal Payout"
            },
            {
                path:"manage/member-refferal-payout",
                name:"Member Refferal Payout"
            }
        ]
    },
    {
        path: '/admindashboard',
        name: "Chat",
        icon: <BsFillChatTextFill />,
        subRoutes:[
            {
                path:"trader-chat",
                name:'Traders'
            },
            {
                path:"refferal-chat",
                name:'Refferal'
            }
        ]
    },
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
    {
        path:'/admindashboard/video',
        name:"upload videos",
        icon:<MdCloudUpload />
    }

]

function AdminSideBar() {
    const [isOpen, setIsOpen] = useState(false);
    // const [showModal, setShowModal] = useState(false);
    // const openModal = () => {
    //     setShowModal(true);
    // };
    // console.log(showModal);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <div className='admin-sidebar-main-container'>
            <motion.div animate={{ width: isOpen ? '350px' : '50px' }} className='admin-sidebar'>
                <div className="admin-top-section">
                    {isOpen && <h1 className='admin_logo'>Admin</h1>}

                    {/* <h1 className="">Badal</h1> */}
                    <div className="admin-bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                <section className='admin_routes'>
                    {routes.map((route) => {
                        if (route.subRoutes) {
                            return (
                                <AdminSideBarMenu isOpen={isOpen} route={route} />
                            );
                        }
                        return (
                            <NavLink to={route.path} key={route.name} className={isOpen ? 'admin_sidebar_link' : 'admin_sidebar_link_small'} >
                                <div className='admin-icon'>{route.icon}</div>
                                <motion.div className='admin_link_text'>{route.name}</motion.div>
                            </NavLink>
                        )
                    })}

                </section>
            </motion.div>
        </div>
    )
}

export default AdminSideBar
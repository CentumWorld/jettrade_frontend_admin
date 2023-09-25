import { FaSlideshare, FaUserTie,FaAmazonPay } from "react-icons/fa";
import { MdDashboard, MdCloudUpload, MdAutorenew } from "react-icons/md";
import { AiFillVideoCamera } from "react-icons/ai";
import { IoMdCreate } from "react-icons/io";
import { BsFillChatTextFill } from "react-icons/bs";
import { SiPivotaltracker } from "react-icons/si";
import { SiManageiq } from "react-icons/si";

import { MdBarChart } from "react-icons/md";
import { FcNeutralTrading } from 'react-icons/fc';
import { FcUpRight } from 'react-icons/fc';


const BussinessDeveloperRoutes = [
  {
    path: "/admindashboard/dashboard",
    name: "Dashboard",
    icon: <MdDashboard />,
  },
  {
    path: "https://centumo.centumworld.com/#/exchange/quick",
    name: "CENTUMO Swap",
    icon: <FcNeutralTrading />,
    externalLink: true,
    target: "_blank",
  },
  {
    path: "https://centumworldrig.com/",
    name: "CENTUMO RIG",
    icon: <FcUpRight />,
    externalLink: true,
    target: "_blank",
  },
  {
    path: "/admindashboard/chart",
    name: "Chart",
    icon: <MdBarChart />,
  },
  {
    path: "/admindashboard/refferal",
    name: "Members",
    icon: <FaSlideshare />,
  },
  {
    path: "/admindashboard/tracker",
    name: "Manage",
    icon: <SiPivotaltracker />,
    subRoutes:[
      {
        path:'tracker/members',
        name:'Members'
      },
      {
        path:'tracker/traders',
        name:'Traders'
      }
    ]
  },
  // {
  //   path: "businessD-chat",
  //   name: "Chat",
  //   icon: <BsFillChatTextFill />,
  //   subRoutes:[
  //     {
  //       path:'chat/businessD-chat',
  //       name:'Chat with Admin'
  //     },
  //     {
  //       path:'chat/BD-chat-with-frenchise',
  //       name :'Chat with Frenchise'
  //     },
  //   ]
  // },
  {
    path: "/admindashboard/allvideo",
    name: "Video",
    icon: <AiFillVideoCamera />,
  },
  {
    path: "manage/investor-refferal-payout",
    name: "Referral Payout",
    icon: <FaAmazonPay />
  },
];

export default BussinessDeveloperRoutes;

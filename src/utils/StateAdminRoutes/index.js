import {
  MdDashboard,
  MdOutlineCreate
} from "react-icons/md";
import { AiFillVideoCamera } from "react-icons/ai";
import { SiPivotaltracker } from "react-icons/si"
import { MdBarChart } from "react-icons/md";
import { BsFillChatTextFill } from "react-icons/bs";
import { FaAmazonPay } from "react-icons/fa";
import { FcNeutralTrading } from 'react-icons/fc';
import { FcUpRight } from 'react-icons/fc';


const stateAdminRoutes = [
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
      path: "tracker/frenchie",
      name: "Create Franchise",
      icon: <MdOutlineCreate />,
    },
    {
      path: "/admindashboard/chart",
      name: "Chart",
      icon: <MdBarChart />,
    },
    {
      path: "/admindashboard/tracker",
      name: "Manage",
      icon: <SiPivotaltracker />,
      subRoutes:[
        {
          path:'tracker/frenchie',
          name :'Frenchies'
        },
        {
          path:'tracker/businness-developer',
          name:'Business Developer'
        },
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
    {
      path: "/admindashboard/allvideo",
      name: "Video",
      icon: <AiFillVideoCamera />,
    },
    // {
    //   path: "/admindashboard/chat",
    //   name: "Chat",
    //   icon: <BsFillChatTextFill />,
    //   subRoutes:[
    //     {
    //       path:'chat/state-handler-chat',
    //       name:'Chat with Admin'
    //     },
    //     {
    //       path:'chat/state-chat-with-french',
    //       name :'Chat with Frenchise'
    //     },
    //   ]
    // },
    {
      path: "manage/investor-refferal-payout",
      name: "Referral Payout",
      icon: <FaAmazonPay />
    },
  ]

  export default stateAdminRoutes;
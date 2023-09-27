import {
  FaMoneyBillWaveAlt,
  FaBars,
  FaCarrot,
  FaUserPlus,
  FaBullseye,
  FaSlideshare,
  FaUserTie,
  FaThemeco,
  FaAmazonPay,
} from "react-icons/fa";
import {
  MdDashboard,
  MdSend,
  MdCloudUpload,
  MdAutorenew,
  MdUnsubscribe,
} from "react-icons/md";
import { GiTrade } from "react-icons/gi";
import { RiUserShared2Fill } from "react-icons/ri";
import { AiFillVideoCamera } from "react-icons/ai";
import { IoMdCreate } from "react-icons/io";
import { BsFillChatTextFill } from "react-icons/bs";
import { SiPivotaltracker } from "react-icons/si"
import { SiManageiq } from "react-icons/si";
import { MdBarChart } from "react-icons/md";
import { RxCountdownTimer } from "react-icons/rx";
import { TfiMenuAlt, TfiGift } from "react-icons/tfi";
import { IoNotificationsSharp, IoTrophy } from "react-icons/io5";
import { BiLogOutCircle, BiStar } from "react-icons/bi";
import { FcNeutralTrading } from 'react-icons/fc';


const subAdminRoutes = [
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
      path: "/admindashboard/chart",
      name: "Chart",
      icon: <MdBarChart />,
    },
    {
      path: "/admindashboard/user",
      name: "Trader",
      icon: <FaUserTie />,
    },
    {
      path: "/admindashboard/refferal",
      name: "Member",
      icon: <FaSlideshare />,
    },
    {
      path: "/admindashboard/new-renewal",
      name: "New/Renewal Traders",
      icon: <MdAutorenew />,
    },
    // {
    //   path: "/admindashboard/subadmin",
    //   name: "Sub-Admin",
    //   icon: <IoMdCreate />
    // },
    {
      path: "/admindashboard/tracker",
      name: "Tracker",
      icon: <SiPivotaltracker />,
      subRoutes:[
        {
          path:'tracker/state-tracer',
          name : 'State Handler(SHO)'
        },
        {
          path:'tracker/frenchie',
          name :'Franchise'
        },
        {
          path:'tracker/businness-developer',
          name:'Business Developer'
        }
      ]
    },
    {
      path: "/admindashboard/manage",
      name: "Manage",
      icon: <SiManageiq />,
      subRoutes: [
        {
          path: "manage/push-notification",
          name: " Manage Push Notification",
          // icon: <IoNotificationsSharp />,
        },
        {
          path: "manage/subscription",
          name: "Manage Subscription",
          // icon: <MdUnsubscribe />
        },
        // {
        //     path:"manage/investment",
        //     name:"Manage Investment"
        // },
        // {
        //   path: "manage/investor-refferal-payout",
        //   name: "Referral Payout",
        //   // icon: <FaAmazonPay />
        // },
      ],
    },
    // {
    //   path: "/admindashboard",
    //   name: "Chat",
    //   icon: <BsFillChatTextFill />,
    //   subRoutes: [
    //     {
    //       path: "trader-chat",
    //       name: "Traders",
    //     },
    //     {
    //       path: "refferal-chat",
    //       name: "Referral",
    //     },
    //   ],
    // },
    // {
    //   path: "/admindashboard/video",
    //   name: "upload videos",
    //   icon: <MdCloudUpload />,
    // },
    {
      path: "/admindashboard/allvideo",
      name: "Video",
      icon: <AiFillVideoCamera />,
    },
    {
      path: "/logout",
      name: "Logout",
      icon: <BiLogOutCircle />,
    },
  ]

  export default subAdminRoutes
import { FaSlideshare, FaUserTie } from "react-icons/fa";
import { MdDashboard, MdCloudUpload, MdAutorenew } from "react-icons/md";
import { AiFillVideoCamera } from "react-icons/ai";
import { IoMdCreate } from "react-icons/io";
import { BsFillChatTextFill } from "react-icons/bs";
import { SiPivotaltracker } from "react-icons/si";
import { SiManageiq } from "react-icons/si";

import { MdBarChart } from "react-icons/md";

const BussinessDeveloperRoutes = [
  {
    path: "/admindashboard/dashboard",
    name: "Dashboard",
    icon: <MdDashboard />,
  },
  {
    path: "/admindashboard/chart",
    name: "Chart",
    icon: <MdBarChart />,
  },
  {
    path: "/admindashboard/refferal",
    name: "Referral",
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
  {
    path: "businessD-chat",
    name: "Chat",
    icon: <BsFillChatTextFill />
  },
  {
    path: "/admindashboard/allvideo",
    name: "Video",
    icon: <AiFillVideoCamera />,
  },
];

export default BussinessDeveloperRoutes;

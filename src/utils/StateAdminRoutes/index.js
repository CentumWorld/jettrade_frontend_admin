import {
  MdDashboard,
  MdOutlineCreate
} from "react-icons/md";
import { AiFillVideoCamera } from "react-icons/ai";
import { SiPivotaltracker } from "react-icons/si"
import { MdBarChart } from "react-icons/md";
import { BsFillChatTextFill } from "react-icons/bs";

const stateAdminRoutes = [
    {
      path: "/admindashboard/dashboard",
      name: "Dashboard",
      icon: <MdDashboard />,
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
        }
      ]
    },
    {
      path: "/admindashboard/allvideo",
      name: "Video",
      icon: <AiFillVideoCamera />,
    },
    {
      path: "trader-chat",
      name: "Admin Chat",
      icon: <BsFillChatTextFill />
    }
  ]

  export default stateAdminRoutes;
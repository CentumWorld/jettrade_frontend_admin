import {
    MdDashboard,
    MdOutlineCreate
  } from "react-icons/md";
  import { AiFillVideoCamera } from "react-icons/ai";
  import { SiPivotaltracker } from "react-icons/si"
  import { MdBarChart } from "react-icons/md";
  import { BsFillChatTextFill } from "react-icons/bs";
  
  const franchiseAdminRoutes = [
      {
        path: "/admindashboard/dashboard",
        name: "Dashboard",
        icon: <MdDashboard />,
      },
      {
        path: "tracker/businness-developer",
        name: "Create BD",
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
            path:'tracker/businness-developer',
            name:'Business Developer'
          },
          {
            path:'tracker/members',
            name :'Referral'
          },
          {
            path:'tracker/traders',
            name :'Traders'
          },
        ]
      },
      {
        path: "/admindashboard/allvideo",
        name: "Video",
        icon: <AiFillVideoCamera />,
      },
      {
        path: "frenchisee-handler-chat",
        name: "Chat",
        icon: <BsFillChatTextFill />
      }
    ]
  
    export default franchiseAdminRoutes;

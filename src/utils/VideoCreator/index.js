
  import {
    MdCloudUpload,
  } from "react-icons/md";
  import { AiFillVideoCamera } from "react-icons/ai";
  import { BiLogOutCircle, BiStar } from "react-icons/bi";
  
  
  const  VideoCreatorRoutes =  [
      {
        path: "/admindashboard/video",
        name: "upload videos",
        icon: <MdCloudUpload />,
      },
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
    ];
  
    export default VideoCreatorRoutes;
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
  import { FcNeutralTrading } from "react-icons/fc";
  import { MdBarChart } from "react-icons/md";
  import { RxCountdownTimer } from "react-icons/rx";
  import { TfiMenuAlt, TfiGift } from "react-icons/tfi";
  import { IoNotificationsSharp, IoTrophy } from "react-icons/io5";
  import { BiStar } from "react-icons/bi";
  
  
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
      
    ];
  
    export default VideoCreatorRoutes;
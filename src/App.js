import React, {Component, createContext, useReducer,useState,useEffect } from 'react';
import './App.css';
import jwtDecode from 'jwt-decode';
import Navbar from './components/Navbar';
import { Route, Routes,Redirect,useNavigate,useLocation  } from 'react-router-dom';
import { Protected } from './components/Protected';
import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Logout from './components/Logout';
import { initialState, reducer } from './components/reducer/UseReducer';
import PaymentPage from './components/PaymentPage';
import UserHomePage from './userpages/UserHomePage';
import InternalTransfer from '../src/UserSidebarPages/InternalTransfer';
import UserDetails from './UserModel/pages/UserDetails';
import ProfileVerification from './UserModel/pages/ProfileVerification';
import ChangePassword from './UserModel/pages/ChangePassword';
import ResetPassword from './UserModel/pages/ResetPassword';
import NewsLetter from './UserModel/pages/NewsLetter';
import BonusSetting from './UserModel/pages/BonusSetting';
import DepositeHistory from './UserSidebarPages/Operation history/DepositeHistory';
import WithdrawalHistory from './UserSidebarPages/Operation history/WithdrawalHistory';
import TransferHistory from './UserSidebarPages/Operation history/TransferHistory';
import AccountList from './UserSidebarPages/Trading accounts/AccountList';
import ManageBonuses from './UserSidebarPages/Trading accounts/ManageBonuses';
import Monitoring from './UserSidebarPages/Trading accounts/Monitoring';
import RealAccount from './UserSidebarPages/Trading accounts/RealAccount';
import DemoAccount from './UserSidebarPages/Trading accounts/DemoAccount';
import PageNotFound from './components/PageNotFound';
import NewDeposite from './UserSidebarPages/NewDeposite';
// import Withdrawal from './UserSidebarPages/Withdrawal';
import UserRegistration from './components/UserRegistration';
import FullForexTicker from './components/FullForexTicker';
import Dashboard from './components/Admin/AdminSideBarPages/Dashboard';
import Refferal from './components/Admin/AdminSideBarPages/Refferal';
import CreateUserInAdmin from './components/Admin/AdminSideBarPages/CreateUserInAdmin';
import ManageNotification from './components/Admin/AdminSideBarPages/ManageNotification';
import ManageSubscription from './components/Admin/AdminSideBarPages/ManageSubscription';
import ManageInvestment from './components/Admin/AdminSideBarPages/ManageInvestment';
import RefferalPayout from './components/Admin/AdminSideBarPages/RefferalPayout';
import MemberRefferalPayout from './components/Admin/AdminSideBarPages/MemberRefferalPayout';
import LiveChat from './components/Admin/AdminSideBarPages/LiveChat';
import RefferalLiveChat from './components/Admin/AdminSideBarPages/RefferalLiveChat';
import FirstChartPage from './components/Admin/AdminSideBarPages/FirstChartPage';
import DisplayCard from './components/Admin/AdminSideBarPages/DisplayCard';
import Withdrawal from '../src/components/Admin/AdminSideBarPages/withdrawal';





export const UserContext = createContext();


function App() {
  const islogin = localStorage.getItem('login');
  const [token, setToken] = useState(null);
  const [isTokenExpired, setIsTokenExpired] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [state, dispatch ] = useReducer(reducer, initialState);

  // -------------------------------------

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken'); // Retrieve the token from localStorage
    if (storedToken) {
      setToken(storedToken);
      setIsTokenExpired(isTokenExpired1(storedToken));

    }
  }, [location.pathname]);

  // =====================================
  const isTokenExpired1 = (token) => {
    if (!token) {
      // Token not available, consider it as expired
      return true;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
      if (decodedToken.exp < currentTime) {
        logoutUser();
      }
    } catch (error) {
      // Error occurred, consider token as expired
      logoutUser();
    }
  }

  const logoutUser = () => {
    // Clear token and user data
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminId');
    localStorage.removeItem('login');
   
    // Redirect to logout page
    navigate('/logout');
  };


  // ------------------------------------
  return (
    <>
      <UserContext.Provider value={{state, dispatch}}>
        <Navbar />
        
          <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/chart" element={<FullForexTicker/>}/>
            {/* <Route  path='/admindashboard' element={islogin === 'true'?<AdminDashboard/>:<Route path='/' element={<Home/>}/>}/> */}
            
            <Route path='/paymentpage' element={<PaymentPage/>}/>
            <Route path='/admindashboard'  element={<Protected Component = {AdminDashboard}/>}>

              {/* <Route path='dashboard' element={<FirstChartPage/>} /> */}
              <Route path='dashboard' element={<DisplayCard/>}/>
              <Route path='chart' element={<FirstChartPage/>} />
              <Route path='user' element={<Dashboard/>} />
              <Route path='refferal' element={<Refferal/>} /> 
              <Route path='createuser' element={<CreateUserInAdmin/>} />
              <Route path='withdrawal' element={<Withdrawal/>} />
              <Route path='manage/push-notification' element={<ManageNotification/>} />
              <Route path='manage/subscription' element={<ManageSubscription/>} />
              <Route path='manage/investment' element={<ManageInvestment/>} />
              <Route path='manage/investor-refferal-payout' element={<RefferalPayout/>} />
              <Route path='manage/member-refferal-payout' element={<MemberRefferalPayout/>} />
              <Route path='trader-chat' element={<LiveChat/>} />
              <Route path='refferal-chat' element={<RefferalLiveChat/>}/>
            </Route>
            {/* <Route path='/user-registration' element={<UserRegistration/>}></Route> */}
            {/* <Route path='/invite' element={<UserRegistration/>}/> */}


            {/* <Route  path='/userdashboard' element={isloginUser === 'true'?<UserDashboard/>:<Home />}/> */}
            <Route path='/userdashboard' element={<Protected Component = {UserDashboard}/>}>

              <Route path='dashboard' element={<UserHomePage/>} />
              <Route path='new-deposit' element={<NewDeposite/>}/>
              {/* <Route path='withdraw' element={<Withdrawal/>} /> */}
              <Route path='transfer' element={<InternalTransfer/>}/>
              

              {/* Opertaion Hostory */}

              <Route path ='deposite' element={<DepositeHistory/>}/>
              <Route path='withdrawlhistory' element={<WithdrawalHistory/>}/>
              <Route path='transferhistory' element={<TransferHistory/>}/>

              {/* Trading accounts */}

              <Route path='accountlist' element={<AccountList/>}/>
              <Route path='managebonuses' element={<ManageBonuses/>}/>
              <Route path='monitoring' element={<Monitoring/>}/>
              <Route path='real-account' element={<RealAccount/>}/>
              <Route path='demo-account' element={<DemoAccount/>}/>
              {/* user setting */}
              <Route path='setting/userdetails' element={<UserDetails/>}/>
              <Route path='setting/verify' element={<ProfileVerification/>}/>
              <Route path='setting/changepassword' element={<ChangePassword/>}/>
              <Route path='setting/resetpassword' element={<ResetPassword/>}/>
              <Route path='setting/newsletter' element={<NewsLetter/>}/>
              <Route path='setting/bonus' element={<BonusSetting/>}/>
            </Route>
            <Route path='/logout' element={<Logout/>}/>
            
            <Route path='*' element={<PageNotFound/>}/>
          </Routes>
         
      </UserContext.Provider>

         
    </>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import SignUp from './pages/signup';
import HomePage from './pages/homepage';
import Messages from './pages/messages';
import Notifications from './pages/notification';
import Profile from './pages/profile';
import { useSelector } from 'react-redux';
import UserDetail from './component/userdetail';

function App() {
  //getting authdetail to verify weather anyone is logged in or not to move across private or public router
  const userDetail=useSelector(state=>state.auth.authDetail)
  //router accessable to anyone
  const publicRouter=[
    {
      path:"/",
      component:<Login/>
    },
    {
      path:"/signup",
      component:<SignUp/>
    }
  ]
  // router accessable to only looged user
  const privateRouter=[
    {
      path:"/",
      component:<HomePage/>
    },
    {
      path:"/messages",
      component:<Messages/>,
    },
    {
      path:"/Notification",
      component:<Notifications/>,
    },{
      path:"/userDetail",
      component:<UserDetail/>,
    },{
      path:"/profile",
      component:<Profile/>,
    }
  ]
  return (
    <>
    {/* setting up router*/}
    <BrowserRouter>
    <Routes>
      {(userDetail==null)&&publicRouter.map((route)=>{return <Route path={route.path} element={route.component}/>})}
      {(userDetail!=null)&&privateRouter.map((route)=>{return <Route path={route.path} element={route.component}/>})}
    </Routes>
    </BrowserRouter>
      </>
  );
}

export default App;

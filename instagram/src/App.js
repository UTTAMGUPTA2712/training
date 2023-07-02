import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import SignUp from './pages/signup';
import HomePage from './pages/homepage';
import Messages from './pages/messages';
import Notifications from './pages/notification';
// import CreatePost from './pages/createpost';
import Profile from './pages/profile';
import { useSelector } from 'react-redux';

function App() {
  const userDetail=useSelector(state=>state.auth.authDetail)
  const privateRouter=[
    {
      path:"/",
      component:<Login/>
    },
    {
      path:"/signup",
      component:<SignUp/>
    }
  ]
  const publicRouter=[
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
    // },{
    //   path:"/create",
    //   component:<CreatePost/>,
    },{
      path:"/profile",
      component:<Profile/>,
    }
  ]
  return (
    <>
    <BrowserRouter>
    <Routes>
      {(userDetail==null)&&privateRouter.map((route)=>{return <Route path={route.path} element={route.component}/>})}
      {(userDetail!=null)&&publicRouter.map((route)=>{return <Route path={route.path} element={route.component}/>})}
    </Routes>
    </BrowserRouter>
      </>
  );
}

export default App;

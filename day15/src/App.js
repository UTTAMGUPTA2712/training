import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import SignUp from './pages/signup';
import HomePage from './pages/homepage';

function App() {
  const userDetail=(state=>state.auth.authDetail)
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
    }
  ]
  return (
    <>
    <BrowserRouter>
    <Routes>
      {!userDetail&&privateRouter.map((route)=>{return <Route path={route.path} element={route.component}/>})}
      {userDetail&&publicRouter.map((route)=>{return <Route path={route.path} element={route.component}/>})}
    </Routes>
    </BrowserRouter>
      </>
  );
}

export default App;

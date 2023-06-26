import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import { useSelector } from 'react-redux';
import HomePage from './pages/homepage';

function App() {
  const publicRouter = [
    { path: "/", component: <Login /> }
  ]
  const privateRouter=[
    { path: "/", component:<HomePage/>}
  ]
  const user=useSelector((state)=>state.auth.userAuth)
  return (
    <>
      <BrowserRouter>
        <Routes>
          {(!user)&&publicRouter.map((routee) => { return <><Route path={routee.path} element={routee.component} /></> })}
          {(user)&&privateRouter.map((routee) => { return <><Route path={routee.path} element={routee.component} /></> })}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

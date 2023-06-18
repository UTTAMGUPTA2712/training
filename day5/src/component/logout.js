import { useNavigate } from "react-router-dom"

const Logout=()=>{
  const navigate=useNavigate()
  localStorage.setItem("currentUser","")
  return navigate("/")
}
export default Logout
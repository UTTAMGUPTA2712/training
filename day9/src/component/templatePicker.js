import { useState } from "react"
import ResumeTemplate1 from "./resumeTemplate1.js"
import ResumeTemplate2 from "./resumeTemplate2.js"
import ResumeTemplate3 from "./resumeTemplate3.js"
import ResumeTemplate4 from "./resumeTemplate4.js"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
const TemplatePicker = () => {
    const [option, setoption] = useState(1)
    const userdata = useSelector((state) => state.auth.phoneNumber)
    const data = useSelector((state) => state.resume.users[userdata][0])
    const navigate=useNavigate()
    const choosed = () => {
        navigate("/form",{state:option})
    }
    return (<>
        <div id="picker">
            <div onClick={() => setoption(1)} className={option == 1 ? "tick options" : "untick options"}><ResumeTemplate1 /></div>
            <div onClick={() => setoption(2)} className={option == 2 ? "tick options" : "untick options"}><ResumeTemplate2 /></div>
            <div onClick={() => setoption(3)} className={option == 3 ? "tick options" : "untick options"}><ResumeTemplate3 /></div>
            <div onClick={() => setoption(4)} className={option == 4 ? "tick options" : "untick options"}><ResumeTemplate4 /></div>
        </div>
        <button onClick={choosed}>CHOOSE</button>   
    </>)
}
export default TemplatePicker
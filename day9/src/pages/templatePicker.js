import { useState } from "react"
import { useNavigate } from "react-router-dom"
import TemplateOption from "../component/templateoption.js"
const TemplatePicker = () => {
    const [option, setoption] = useState(1)
    const navigate=useNavigate()
    const changeOption=(value)=>{
        setoption(value)
    }
    const choosed = () => {
        navigate("/form",{state:{template:option}})
    }
    return (<>
        <h1 style={{textAlign:"center",margin:0}}>CHOOSE A TEMPLATE</h1>

    <div id="templatepicker">
        <TemplateOption option={option} changeoption={changeOption}/>
        <button onClick={choosed}>CHOOSE</button>  
        </div> 
    </>)
}
export default TemplatePicker
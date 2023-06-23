import { useSelector } from "react-redux"
import {PhoneTwoTone,MailTwoTone,HomeTwoTone} from "@ant-design/icons"
import { Rate } from 'antd';
import "./temp1.css"
import imag from "C:/Users/uttam/Desktop/training/day9/src/asset/images/img1.png"
const ResumeTemplate1 = ({ data }) => {
    const phone=useSelector((state)=>state.auth.phoneNumber)
    console.log(data)
    return (<>
    <div id="temp1">
    <div id="left">
        <img src={imag}></img>
        <h2>Contact</h2>
        <p><PhoneTwoTone /> {phone}</p> 
        <p><MailTwoTone /> {data?.email||"DEMO DATA"}</p>
        <p><HomeTwoTone /> {data?.address||"DEMO DATA"}</p>
        <h2>Skills</h2>
        {(data?.skills||[{name:"skill",value:3},{name:"skill",value:6}]).map((skill)=>{
            return <>
        <h4>{skill.name}</h4>
        <Rate style={{fontSize:"80%"}} disabled defaultValue={(skill.value)/2} />
            </>
        })}
    </div>
    <div id="right">
    <h1>{(data?.name||"DEMO DATA").toUpperCase()}</h1>
    <h2>About Me</h2>
        <p>{data?.objective||"DEMO DATA"}</p>
        <h2>EDUCATION</h2>
        <div id="table">
            <div className="block"><h4>{data?.tenths||"DEMO DATA"}</h4><h4>{data?.tenthr||"DEMO DATA"}</h4></div> 
        <div className="block"><h4>{data?.twelves||"DEMO DATA"}</h4><h4>{data?.twelver||"DEMO DATA"}</h4></div> 
        <div className="block"><h4>{data?.graduationc||"DEMO DATA"}</h4><h4>{data?.graduationr||"DEMO DATA"}</h4></div>
        </div>
        <h2>EXPERIENCE</h2>
        {(data?.experience??[{name:"experience",value:"DEMO"},{name:"experience",value:"DEMO"}]).map((exp)=>{
            return <>
            <h3>{exp.name}</h3>
            <p>{exp.value}</p>
        </>
        })}
    </div>
    </div>
    </>)
}
export default ResumeTemplate1
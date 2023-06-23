import { useSelector } from "react-redux"
import { PhoneOutlined, MailOutlined, HomeOutlined } from "@ant-design/icons"
import { Rate } from 'antd';
import "./temp2.css"
import imag from "C:/Users/uttam/Desktop/training/day9/src/asset/images/img2.png"
const ResumeTemplate2 = ({ data }) => {
    const phone = useSelector((state) => state.auth.phoneNumber)
    console.log(data)
    return (<>
        <div id="temp2">
            <div id="left">
                <img src={imag}></img>
                <div id="space">
                    <h2>About Me</h2>
                    <p>{data?.objective || "DEMO DATA"}</p>
                    <h2>Skills</h2>
                    {(data?.skills||[{name:"skill",value:3},{name:"skill",value:6}]).map((skill) => {
                        return <>
                            <h4>{skill?.name}</h4>
                            <Rate style={{ fontSize: "80%" }} disabled defaultValue={(skill?.value) / 2} />
                        </>
                    })}
                </div>
            </div>
            <div id="right">
                <div id="mid">
                    <h1>{(data?.name || "DEMO DATA").toUpperCase()}</h1>
                    <p><PhoneOutlined /> {phone}</p>
                    <p><MailOutlined /> {data?.email || "DEMO DATA"}</p>
                    <p><HomeOutlined /> {data?.address || "DEMO DATA"}</p>
                </div>
                <h2>EXPERIENCE</h2>

                {(data?.experience || [{ name: "experience", value: "DEMO" }, { name: "experience", value: "DEMO" }]).map((exp) => {
                    return (
                        <>
                            <h3>{exp?.name}</h3>
                            <p>{exp?.value}</p>
                            </>)
                })}
                <h2>EDUCATION</h2>
                <div id="table">
                    <div className="block"><h4>{data?.tenths || "DEMO DATA"}</h4><h4>{data?.tenthr || "DEMO DATA"}</h4></div>
                    <div className="block"><h4>{data?.twelves || "DEMO DATA"}</h4><h4>{data?.twelver || "DEMO DATA"}</h4></div>
                    <div className="block"><h4>{data?.graduationc || "DEMO DATA"}</h4><h4>{data?.graduationr || "DEMO DATA"}</h4></div>
                </div>
            </div>
        </div>
    </>)
}
export default ResumeTemplate2
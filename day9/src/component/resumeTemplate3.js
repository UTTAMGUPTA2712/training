import { useSelector } from "react-redux";
import { PhoneTwoTone, MailTwoTone, HomeTwoTone } from "@ant-design/icons";
import { Rate } from 'antd';
import "./temp3.css";
import imag from "../asset/images/img3.png";

const ResumeTemplate3 = ({ data }) => {
    const phone = useSelector((state) => state.auth.phoneNumber);
    console.log(data);

    return (
        <>
            <div id="temp3">
                <div id="headerdiv">
                    <img src={imag} alt="Profile"></img>
                    <div id="contact">
                        <h2>{(data?.name || "DEMO DATA").toUpperCase()}</h2>
                        <div><p><PhoneTwoTone /> {phone}</p>
                        <p><MailTwoTone /> {data?.email || "DEMO DATA"}</p>
                        <p><HomeTwoTone /> {data?.address || "DEMO DATA"}</p></div></div>
                </div>
                <div id="content">
                    <div id="left">
                        <h2>About Me</h2>
                        <p>{data?.objective || "DEMO DATA"}</p>
                        <h2>Skills</h2>
                        {(data?.skills || [{ name: "skill", value: 3 }, { name: "skill", value: 6 }]).map((skill) => (
                            <>
                                <h4>{skill.name}</h4>
                                <Rate style={{ fontSize: "1.1em" }} disabled defaultValue={(skill.value) / 2} />
                            </>
                        ))}
                    </div>
                    <div id="right">
                        <h2>Education</h2>
                        <div className="education">
                            <h4>{data?.tenths || "DEMO DATA"}</h4>
                            <h4>{data?.tenthr || "DEMO DATA"}</h4>
                        </div>
                        <div className="education">
                            <h4>{data?.twelves || "DEMO DATA"}</h4>
                            <h4>{data?.twelver || "DEMO DATA"}</h4>
                        </div>
                        <div className="education">
                            <h4>{data?.graduationc || "DEMO DATA"}</h4>
                            <h4>{data?.graduationr || "DEMO DATA"}</h4>
                        </div>
                        <h2>Experience</h2>
                        {(data?.experience ?? [{ name: "experience", value: "DEMO" }, { name: "experience", value: "DEMO" }]).map((exp) => (
                            <>
                                <h3>{exp.name}</h3>
                                <p>{exp.value}</p>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResumeTemplate3;

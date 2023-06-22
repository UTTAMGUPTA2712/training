import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, InputNumber, Radio, Rate, Row, Select, Slider, Space, Switch, Upload, DatePicker } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addResume } from "../redux/slice/resumeSlice";
const { TextArea } = Input;

const ResumePage = () => {
    // const [formData, setFormdata] = useState({})
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [dob, setDob] = useState()
    const [address, setAddress] = useState()
    const [objective, setObjective] = useState()
    const [tenths, setTenths] = useState()
    const [twelves, settwelves] = useState()
    const [graduationc, setGraduationc] = useState()
    const [tenthr, setTenthr] = useState()
    const [twelver, settwelver] = useState()
    const [graduationr, setGraduationr] = useState()
    const [skillname, setSkillName] = useState()
    const [skillscale, setskillscale] = useState()
    const [skills, setSkills] = useState([])
    const saveSkill = (e) => { e.preventDefault(); if (skillname && skillscale) { setSkills([...skills, { name: skillname, value: skillscale }]); setskillscale(0); setSkillName("") } }
    const [experiencename, setExperienceName] = useState()
    const [experiencevalue, setExperienceValue] = useState()
    const [experience, setExperience] = useState([])
    const saveExperience = (e) => { e.preventDefault(); if (experiencename && experiencevalue) { setExperience([...experience, { name: experiencename, value: experiencevalue }]); setExperienceValue(""); setExperienceName("") } }
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [validate, setvalidate] = useState(false)
    // const onChangeHandler = (key, value) => {
    //     setFormdata(p => ({
    //         ...p,
    //         [key]: value
    //     }))
    // }
    const handlesubmit = (e) => {
        e.preventDefault();
        if (name && email && address && dob && objective && tenthr && tenths && twelver && twelves && graduationc && graduationr && skills && experience) {
            const data = {
                name: name,
                email: email,
                dob: dob,
                address: address,
                objective: objective,
                tenthr: tenthr,
                twelver: twelver,
                graduationr: graduationr,
                tenths: tenths,
                twelves: twelves,
                graduationc: graduationc,
                skills: skills,
                experience: experience,
            }
            dispatch(addResume(data))
            setName("")
            setEmail("")
            setDob("")
            setAddress("")
            setObjective("")
            setTenths("")
            settwelves("")
            setGraduationc("")
            setTenthr("")
            settwelver("")
            setGraduationr("")
            setSkills([])
            setskillscale(1)
            setSkillName("")
            setExperience([])
            setExperienceName("")
            setExperienceValue("")
            setvalidate(false)
        }
        else {
            validate(true)
        }
    }
    const handlepreview = (e) => {
        e.preventDefault()
    }
    return (
        <>
            <div>
                <form action="/form">
                    <div className="formchild"><label>Name</label>
                        <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="ENTER YOUR NAME"></input>
                    </div>
                    <div className="formchild"><label>Email</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="ENTER YOUR EMAIL"></input>
                    </div>
                    <div className="formchild"><label>Date of birth</label>
                        <DatePicker onChange={(_, e) => setDob(e)} />
                    </div>
                    <div className="formchild"><label>Address</label>
                        <input type="text" onChange={(e) => setAddress(e.target.value)} value={address} placeholder="ENTER YOUR ADDRESS"></input>
                    </div>
                    <div className="formchild"><label>Objective</label>
                        <input type="textarea" onChange={(e) => setObjective(e.target.value)} value={objective} placeholder="ENTER YOUR OBJECTIVE"></input>
                    </div>
                    <div className="formchild"><label>10th School</label>
                        <input type="text" onChange={(e) => setTenths(e.target.value)} value={tenths} placeholder="ENTER YOUR 10TH RESULT"></input>
                    </div>
                    <div className="formchild"><label>10th Result</label>
                        <input type="text" onChange={(e) => setTenthr(e.target.value)} value={tenthr} placeholder="ENTER YOUR 10TH RESULT"></input>
                    </div>
                    <div className="formchild"><label>12th School</label>
                        <input type="text" onChange={(e) => settwelves(e.target.value)} value={twelves} placeholder="ENTER YOUR 12TH RESULT"></input>
                    </div>
                    <div className="formchild"><label>12th Result</label>
                        <input type="text" onChange={(e) => settwelver(e.target.value)} value={twelver} placeholder="ENTER YOUR 12TH RESULT"></input>
                    </div>
                    <div className="formchild"><label>Graduation Collage</label>
                        <input type="text" onChange={(e) => setGraduationc(e.target.value)} value={graduationc} placeholder="ENTER YOUR GRADUATION"></input>
                    </div>
                    <div className="formchild"><label>Graduation Result</label>
                        <input type="text" onChange={(e) => setGraduationr(e.target.value)} value={graduationr} placeholder="ENTER YOUR GRADUATION"></input>
                    </div>
                    <div className="formchild"><label>Skills</label>
                        <input type="text" onChange={(e) => setSkillName(e.target.value)} value={skillname} placeholder="ENTER YOUR SKILLS"></input>
                        <Col span={12}>
                            <Slider min={1} max={10} onChange={(e) => { setskillscale(e) }} value={typeof skillscale === 'number' ? skillscale : 0} />
                        </Col>
                        <button onClick={saveSkill}>ADD SKILL</button>
                        {skills.map((skill) => {
                            return <p>{skill.name}:{skill.value}</p>
                        })}</div>
                    <div className="formchild"><label>Experience</label>
                        <input type="text" onChange={(e) => setExperienceName(e.target.value)} value={experiencename} placeholder="ENTER YOUR EXPERIENCE FIELD"></input>
                        <input type="textarea" onChange={(e => setExperienceValue(e.target.value))} value={experiencevalue} placeholder="ENTER YOUR EXPERIENCE"></input>
                        <button onClick={saveExperience}>ADD EXPERIENCE</button>
                        {experience.map((exp) => {
                            return <p>{exp.name}:....</p>
                        })}
                    </div>
                    <button
                    onClick={()=>navigate("/home")}
                    >CANCEL</button>
                    <button onClick={handlesubmit} type="submit">SUBMIT</button>
                    <button onClick={handlepreview}>PREVIEW</button>
                </form>
            </div>
        </>
    );
};
export default ResumePage;

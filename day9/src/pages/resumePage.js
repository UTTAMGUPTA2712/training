import { Col, Slider, DatePicker } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addResume } from "../redux/slice/resumeSlice";
const ResumePage = () => {
    const location=useLocation()
    const [template, setTemplate] = useState(location.state);
    const [formdata, setFormdata] = useState({})
    const userid=useSelector((state)=>state.auth.phoneNumber)
    const [skillname, setSkillName] = useState()
    const [skillscale, setskillscale] = useState()
    const saveSkill = (e) => { e.preventDefault(); if (skillname && skillscale) {onChangeHandler("skills",[...formdata.skills??[], { name: skillname, value: skillscale }]); setskillscale(0); setSkillName("") } }
    const [experiencename, setExperienceName] = useState()
    const [experiencevalue, setExperienceValue] = useState()
    const saveExperience = (e) => { e.preventDefault(); if (experiencename && experiencevalue) { onChangeHandler("experience",[...formdata.experience??[], { name: experiencename, value: experiencevalue }]); setExperienceValue(""); setExperienceName("") } }
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [validate, setvalidate] = useState(false)
    const onChangeHandler = (key, value) => {
        setFormdata(p => ({
            ...p,
            [key]: value,
                "templatedata": template
        }))
    }
    const handlesubmit = (e) => {
        e.preventDefault();
        console.log("",formdata)
        if (formdata.name && formdata.email && formdata.address && formdata.dob && formdata.objective && formdata.tenthr && formdata.tenths && formdata.twelver && formdata.twelves && formdata.graduationc && formdata.graduationr && formdata.skills && formdata.experience) {
            dispatch(addResume({user:userid,data:formdata}))
            console.log("done")
            setskillscale(1)
            setSkillName("")
            setExperienceName("")
            setExperienceValue("")
            setFormdata({})
            setvalidate(false)
        }
        else {
            setvalidate(true)
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
                        <input type="text" onChange={(e) => onChangeHandler("name",e.target.value)}  value={formdata.name??""} placeholder="ENTER YOUR NAME"></input>
                    </div>
                    <div className="formchild"><label>Email</label>
                        <input type="email" onChange={(e) => onChangeHandler("email",e.target.value)} value={formdata.email??""} placeholder="ENTER YOUR EMAIL"></input>
                    </div>
                    <div className="formchild"><label>Date of birth</label>
                        <DatePicker onChange={(_, e) => onChangeHandler("dob",e)} />
                    </div>
                    <div className="formchild"><label>Address</label>
                        <input type="text" onChange={(e) => onChangeHandler("address",e.target.value)} value={formdata.address??""} placeholder="ENTER YOUR ADDRESS"></input>
                    </div>
                    <div className="formchild"><label>Objective</label>
                        <input type="textarea" onChange={(e) => onChangeHandler("objective",e.target.value)} value={formdata.objective??""} placeholder="ENTER YOUR OBJECTIVE"></input>
                    </div>
                    <div className="formchild"><label>10th School</label>
                        <input type="text" onChange={(e) => onChangeHandler("tenths",e.target.value)} value={formdata.tenths??""} placeholder="ENTER YOUR 10TH RESULT"></input>
                    </div>
                    <div className="formchild"><label>10th Result</label>
                        <input type="text" onChange={(e) => onChangeHandler("tenthr",e.target.value)} value={formdata.tenthr??""} placeholder="ENTER YOUR 10TH RESULT"></input>
                    </div>
                    <div className="formchild"><label>12th School</label>
                        <input type="text" onChange={(e) => onChangeHandler("twelves",e.target.value)} value={formdata.twelves??""} placeholder="ENTER YOUR 12TH RESULT"></input>
                    </div>
                    <div className="formchild"><label>12th Result</label>
                        <input type="text" onChange={(e) => onChangeHandler("twelver",e.target.value)} value={formdata.twelver??""} placeholder="ENTER YOUR 12TH RESULT"></input>
                    </div>
                    <div className="formchild"><label>Graduation Collage</label>
                        <input type="text" onChange={(e) => onChangeHandler("graduationc",e.target.value)} value={formdata.graduationc??""} placeholder="ENTER YOUR GRADUATION"></input>
                    </div>
                    <div className="formchild"><label>Graduation Result</label>
                        <input type="text" onChange={(e) => onChangeHandler("graduationr",e.target.value)} value={formdata.graduationr??""} placeholder="ENTER YOUR GRADUATION"></input>
                    </div>
                    <div className="formchild"><label>Skills</label>
                        <input type="text" onChange={(e) => setSkillName(e.target.value)} value={skillname??""} placeholder="ENTER YOUR SKILLS"></input>
                        <Col span={12}>
                            <Slider min={1} max={10} onChange={(e) => { setskillscale(e) }} value={typeof skillscale === 'number' ? skillscale : 0} />
                        </Col>
                        <button onClick={saveSkill}>ADD SKILL</button>
                        {(formdata?.skills??[]).map((skill) => {
                            return <p>{skill.name}:{skill.value}</p>
                        })}</div>
                    <div className="formchild"><label>Experience</label>
                        <input type="text" onChange={(e) => setExperienceName(e.target.value)} value={experiencename??""} placeholder="ENTER YOUR EXPERIENCE FIELD"></input>
                        <input type="textarea" onChange={(e => setExperienceValue(e.target.value))} value={experiencevalue??""} placeholder="ENTER YOUR EXPERIENCE"></input>
                        <button onClick={saveExperience}>ADD EXPERIENCE</button>
                        {(formdata?.experience??[]).map((exp) => {
                            return <p>{exp.name}:....</p>
                        })}
                    </div>
                    <button onClick={(e)=>{e.preventDefault();setFormdata({});}}>RESET</button>
                    <button onClick={()=>navigate("/home")}>BACK</button>
                    <button onClick={handlesubmit} type="submit">SUBMIT</button>
                    <button onClick={handlepreview}>PREVIEW</button>
                </form>
            </div>
        </>
    );
};
export default ResumePage;

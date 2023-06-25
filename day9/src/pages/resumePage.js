import { Col, Slider, DatePicker } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addResume, formUpdater, templateUpdater } from "../redux/slice/resumeSlice";
import Preview from "../component/preview";
import { ReloadOutlined, RollbackOutlined, SaveOutlined, ExceptionOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import ResumeCard from "../component/resumeCard";
import {
    RadiusBottomleftOutlined,
    RadiusBottomrightOutlined,
    RadiusUpleftOutlined,
    RadiusUprightOutlined,
} from '@ant-design/icons';
import { Button, Divider, Space, notification } from 'antd';
import React, { useMemo } from 'react';
const Context = React.createContext({
    name: 'Default',
});
const ResumePage = () => {
    const location = useLocation()
    const [template, setTemplate] = useState(location.state.template ?? 1);
    const [formdata, setFormdata] = useState(location.state.data ?? { "templatedata": template, "formtype": "draft" })
    const [emailvalidate, setEmailvalidate] = useState(false)
    const formid = location.state.index ?? "new";
    console.log("gkj", location.state)
    const userid = useSelector((state) => state.auth.phoneNumber)
    const [skillname, setSkillName] = useState()
    const [skillscale, setskillscale] = useState()
    const saveSkill = (e) => { e.preventDefault(); if (skillname && skillscale) { onChangeHandler("skills", [...formdata.skills ?? [], { name: skillname, value: skillscale }]); setskillscale(0); setSkillName("") } }
    const [experiencename, setExperienceName] = useState()
    const [experiencevalue, setExperienceValue] = useState()
    const saveExperience = (e) => { e.preventDefault(); if (experiencename && experiencevalue) { onChangeHandler("experience", [...formdata.experience ?? [], { name: experiencename, value: experiencevalue }]); setExperienceValue(""); setExperienceName("") } }
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [validate, setvalidate] = useState(false)
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement, message) => {
        api.info({
            message: "SUCCESSFUL",
            description: message,
            placement,
        });
    };
    // const contextValue = useMemo(
    //     () => ({
    //         name: 'Ant Design',
    //     }),
    //     [],
    // );
    const onChangeHandler = (key, value) => {
        setFormdata(p => ({
            ...p,
            [key]: value,
        }))
    }
    const changetemplate = (value) => {
        setTemplate(value)
        setFormdata(p => ({
            ...p,
            "templatedata": value,
        }))
    }
    const handlesubmit = (e) => {
        e.preventDefault();
        if (formdata.name && formdata.email && formdata.address && formdata.dob && formdata.objective && formdata.tenthr && formdata.tenths && formdata.twelver && formdata.twelves && formdata.graduationc && formdata.graduationr && formdata.skills && formdata.experience) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formdata.email)) {
                setFormdata(p => ({
                    ...p,
                    "formtype": "complete"
                }))
                const saveFile = () => {
                    setTimeout(() => {
                        saveAsDraft()
                    }, 500)
                }
                saveFile()
                clearTimeout(saveFile)
                setvalidate(false)
                setEmailvalidate(false)
            } else {
                setvalidate(false)
                setEmailvalidate(true)
            }
        }
        else {
            setvalidate(true)
        }
    }
    const saveAsDraft = (e) => {
        if (formid === "new") {
            openNotification('topLeft', "RESUME SAVED SUCCESSFULLY")
            dispatch(addResume({ user: userid, data: formdata }))
        }
        else {
            openNotification('topLeft', "RESUME UPDATED SUCCESSFULLY\n YOU WILL BE REDIRECTED")
            dispatch(formUpdater({ user: userid, index: formid, form: formdata }))
            setTimeout(() => navigate("/home"), 1500)
        }
        setskillscale(1)
        setSkillName("")
        setExperienceName("")
        setExperienceValue("")
        setFormdata({ "templatedata": template, "formtype": "draft" })
    }
    return (
        <>
            <div id="formdiv">
                {contextHolder}
                <form id="form" action="/form">
                    <table id="formtable">
                        <tr ><td><label>Name</label></td><td>
                            <input type="text" onChange={(e) => onChangeHandler("name", e.target.value)} className={(!validate || formdata.name) ? "" : "redborder"} value={formdata.name ?? ""} placeholder="ENTER YOUR NAME"></input>
                        </td></tr>
                        <tr ><td><label>Email</label></td><td>
                            <input type="email" onChange={(e) => onChangeHandler("email", e.target.value)} className={((!validate || formdata.email) && !emailvalidate) ? "" : "redborder"} value={formdata.email ?? ""} placeholder="ENTER YOUR EMAIL"></input>
                        </td></tr>
                        <tr ><td><label>Date of birth</label></td><td>
                            <DatePicker style={{ width: "25rem" }} status={(!validate || formdata.skills) ? "" : "error"} onChange={(_, e) => onChangeHandler("dob", e)} />
                        </td></tr>
                        <tr ><td><label>Address</label></td><td>
                            <input type="text" onChange={(e) => onChangeHandler("address", e.target.value)} className={(!validate || formdata.address) ? "" : "redborder"} value={formdata.address ?? ""} placeholder="ENTER YOUR ADDRESS"></input>
                        </td></tr>
                        <tr ><td><label>Objective</label></td><td>
                            <input type="textarea" onChange={(e) => onChangeHandler("objective", e.target.value)} className={(!validate || formdata.objective) ? "" : "redborder"} value={formdata.objective ?? ""} placeholder="ENTER YOUR OBJECTIVE"></input>
                        </td></tr>
                        <tr ><td><label>10th School</label></td><td>
                            <input type="text" onChange={(e) => onChangeHandler("tenths", e.target.value)} className={(!validate || formdata.tenths) ? "" : "redborder"} value={formdata.tenths ?? ""} placeholder="ENTER YOUR 10TH SCHOOL"></input>
                        </td></tr>
                        <tr ><td><label>10th Result(%)</label></td><td>
                            <input type="number" onChange={(e) => onChangeHandler("tenthr", e.target.value)} className={(!validate || formdata.tenthr) ? "" : "redborder"} value={formdata.tenthr ?? ""} placeholder="ENTER YOUR 10TH RESULT(%)"></input>
                        </td></tr>
                        <tr ><td><label>12th School</label></td><td>
                            <input type="text" onChange={(e) => onChangeHandler("twelves", e.target.value)} className={(!validate || formdata.twelves) ? "" : "redborder"} value={formdata.twelves ?? ""} placeholder="ENTER YOUR 12TH SCHOOL"></input>
                        </td></tr>
                        <tr ><td><label>12th Result(%)</label></td><td>
                            <input type="number" onChange={(e) => onChangeHandler("twelver", e.target.value)} className={(!validate || formdata.twelver) ? "" : "redborder"} value={formdata.twelver ?? ""} placeholder="ENTER YOUR 12TH RESULT(%)"></input>
                        </td></tr>
                        <tr ><td><label>Graduation Collage</label></td><td>
                            <input type="text" onChange={(e) => onChangeHandler("graduationc", e.target.value)} className={(!validate || formdata.graduationc) ? "" : "redborder"} value={formdata.graduationc ?? ""} placeholder="ENTER YOUR GRADUATION COLLEGE"></input>
                        </td></tr>
                        <tr ><td><label>Graduation Result(%)</label></td><td>
                            <input type="number" onChange={(e) => onChangeHandler("graduationr", e.target.value)} className={(!validate || formdata.graduationr) ? "" : "redborder"} value={formdata.graduationr ?? ""} placeholder="ENTER YOUR GRADUATION RESULT(%)"></input>
                        </td></tr>
                        <tr ><td><label>Skills</label></td><td>
                            <input type="text" onChange={(e) => setSkillName(e.target.value)} className={(!validate || formdata.skills) ? "" : "redborder"} value={skillname ?? ""} placeholder="ENTER YOUR SKILLS"></input>
                            <Col span={12}>
                                <Slider style={{ backgroundColor: "white", width: "25rem", marginLeft: 0, color: "white" }} min={1} max={10} onChange={(e) => { setskillscale(e) }} status={(!validate || formdata.skills) ? "" : "error"} value={typeof skillscale === 'number' ? skillscale : 0} />
                            </Col>
                        </td><td style={{ width: "10vw" }}><AppstoreAddOutlined onClick={saveSkill} />
                            </td><td><div id="skill">{(formdata?.skills ?? []).map((skill) => {
                                return <p>{skill.name}:{skill.value}</p>
                            })}</div></td></tr>
                        <tr ><td><label>Experience</label></td><td>
                            <input type="text" onChange={(e) => setExperienceName(e.target.value)} className={(!validate || formdata.experience) ? "" : "redborder"} value={experiencename ?? ""} placeholder="ENTER YOUR EXPERIENCE FIELD"></input>
                            <br />
                            <input type="textarea" onChange={(e => setExperienceValue(e.target.value))} className={(!validate || formdata.experience) ? "" : "redborder"} value={experiencevalue ?? ""} placeholder="ENTER YOUR EXPERIENCE"></input>
                        </td><td style={{ width: "10vw" }}><AppstoreAddOutlined onClick={saveExperience} />
                            </td><td><div id="exp">{(formdata?.experience ?? []).map((exp) => {
                                return <p>{exp.name}:---<br />{exp.value}</p>
                            })}
                            </div>
                            </td>
                        </tr>
                    </table>
                    <RollbackOutlined id="back" onClick={() => navigate("/home")} />
                    <div id="btns">
                        {/* <Context.Provider value={contextValue}> */}
                        <h2>RESET<ReloadOutlined onClick={(e) => { e.preventDefault(); setFormdata({}); }} /></h2>
                        <h2>SAVE<SaveOutlined onClick={handlesubmit} type="submit" /></h2>
                        <h2>PREVIEW<Preview changetemplate={changetemplate} data={formdata} /></h2>
                        <h2>DRAFT<ExceptionOutlined onClick={saveAsDraft} /></h2>
                        {/* </Context.Provider> */}

                    </div>
                </form>
            </div>
        </>
    );
};
export default ResumePage;
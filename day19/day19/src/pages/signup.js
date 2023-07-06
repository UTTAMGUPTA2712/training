import { UserOutlined, MailOutlined, ProfileOutlined, ReloadOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Space, Typography, Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import admin from "../assets/images/admin.png";
import user from "../assets/images/user.png";
import editor from "../assets/images/editor.png";
import { Modal } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { addUser, setUserData } from "../redux/slice/shopSlice";
import { SignUpService } from "../services/signUpService";

const { Title } = Typography;

export const Signup = () => {
    // const [form] = Form.useForm();
    const [value, setValue] = useState(1);
    const [title, setTitle] = useState("ADMIN");
    const [name, setName] = useState()
    const [lastname, setlastname] = useState()
    const [email, setEmail] = useState()
    const [prof, setprof] = useState()
    const [password, setPassword] = useState()
    const [repass, setRepass] = useState()
    const [modal, contextHolder] = Modal.useModal();
    const [validateStatus, setvalidatestatus] = useState(false)
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const createAccount =async () => {
        setvalidatestatus(false)
        confirm("ACCOUNT SUCCESSFULLY CREATED", "LOG IN")
        // let users = JSON.parse(localStorage.getItem("userdata")) || [];
        // let users=useSelector(state=>state.shop.userdata)
        const user = {
          title: title,
          name: name,
          lastname: lastname,
          email: email,
          prof: prof,
          password: password, 
        //   cart:{}
        };
        try{
            const response=await SignUpService(user);
            console.log(response)
        }catch(err){
            console.error(err)
        }
        // users.push(user);
        dispatch(addUser(user))
        // localStorage.setItem("userdata", JSON.stringify(users));
    }
    const handleclick=()=> {

        if (name && email && lastname && prof && password && repass) {
            if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                if (password === repass) {
                    createAccount();
                    return
                }
                confirm("Your Password do not match", "Already have account")
                return
            }
            confirm("Wrong email", "Already have account")
            return
        }
        setvalidatestatus(true)
        confirm("please fill all the entries", "Already have account")
    }
    // console.log(form);
    const confirm = (context, okText) => {
        modal.confirm({
            title: 'ERROR',
            icon: <ExclamationCircleOutlined />,
            content: context,
            okText: okText,
            cancelText: 'OK',
            onOk: () => navigate('/'),
            onCancel: () => window.location.reload(),
        });
    };

    return (
        <>
            <div id="main">
                {contextHolder}
                <div id="loginnnn" className="formdiv">
                    <Title>
                        Create new account<span className="blue">.</span>
                    </Title>
                    <Title level={3}>
                        Already A Member?{" "}
                        <span className="blue" onClick={() => navigate("/")}>
                            Log in
                        </span>
                    </Title>
                    <br />
                    <div >
                        <Form id="signup">
                            <div>
                                <Title>Choose Your Role</Title>
                                <br />
                                <div className="cc-selector">
                                    <Space>
                                        <input
                                            onClick={() => {
                                                setValue(1);
                                                setTitle("ADMIN");
                                            }}
                                            id="admin"
                                            type="radio"
                                            name="credit-card"
                                        />
                                        <label style={{ backgroundImage: `url(` + admin + `)` }} className={(value===1)?"checked":"unchecked"} htmlFor="admin"></label>
                                        <input
                                            onClick={() => {
                                                setValue(2);
                                                setTitle("USER");
                                            }}
                                            id="user"
                                            type="radio"
                                            name="credit-card"
                                        />
                                        <label style={{ backgroundImage: `url(` + user + `)` }} className={(value===2)?"checked":"unchecked"} htmlFor="user"></label>
                                        <input
                                            onClick={() => {
                                                setValue(3);
                                                setTitle("VENDOR");
                                            }}
                                            id="editor"
                                            type="radio"
                                            name="credit-card"
                                        />
                                        <label style={{ backgroundImage: `url(` + editor + `)` }} className={(value===3)?"checked":"unchecked"} htmlFor="editor"></label>
                                        <Title level={1}>{title}</Title>
                                    </Space>
                                </div>
                                <Form.Item validateStatus="warning">
                                    <div className={`${(validateStatus && !name) ? "redborder" : ""} border`}>
                                        <Title level={5}>First Name</Title>
                                        <Input bordered={false} onChange={(e) => setName(e.target.value)} allowClear placeholder="Enter Your First Name" suffix={<UserOutlined />} />
                                    </div>
                                </Form.Item>
                                <Form.Item validateStatus="warning">
                                    <div className={`${(validateStatus && !lastname) ? "redborder" : ""} border`}>
                                        <Title level={5}>Last Name</Title>
                                        <Input bordered={false} allowClear onChange={(e) => setlastname(e.target.value)} placeholder="Enter Your Last Name" suffix={<UserOutlined />} />
                                    </div>
                                </Form.Item>
                                <Form.Item validateStatus="warning">
                                    <div className={`${(validateStatus && !email) ? "redborder" : ""} border`}>
                                        <Title level={5}>E-Mail</Title>
                                        <Input bordered={false} allowClear onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your E-Mail" suffix={<MailOutlined />} />
                                    </div>
                                </Form.Item>
                                <Form.Item validateStatus="warning">
                                    <div className={`${(validateStatus && !prof) ? "redborder" : ""} border`}>
                                        <Title level={5}>Profession</Title>
                                        <Input bordered={false} allowClear onChange={(e) => setprof(e.target.value)} placeholder="Enter Your Profession" suffix={<ProfileOutlined />} />
                                    </div>
                                </Form.Item>
                                <Form.Item validateStatus="error">
                                    <div className={`${(validateStatus && !password) ? "redborder" : ""} border`}>
                                        <Title level={5}>Password</Title>
                                        <Input.Password bordered={false} allowClear onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
                                    </div>
                                </Form.Item>
                                <Form.Item validateStatus="error">
                                    <div className={`${(validateStatus && !repass) ? "redborder" : ""} border`}>
                                        <Title level={5}>Password</Title>
                                        <Input.Password bordered={false} allowClear onChange={(e) => setRepass(e.target.value)} placeholder="Re-Enter Password" />
                                    </div>
                                </Form.Item>
                                <Space >
                                    <Button onClick={handleclick} size="large" type="primary">
                                        Create Account
                                    </Button>
                                    <ReloadOutlined onClick={()=>{window.location.reload();}}/>
                                </Space>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Signup;

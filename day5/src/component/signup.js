import { UserOutlined, MailOutlined, ProfileOutlined, ReloadOutlined } from "@ant-design/icons";
import { Space, Typography, Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import admin from "../assets/images/admin.png";
import user from "../assets/images/user.png";
import editor from "../assets/images/editor.png";

const { Title } = Typography;

export const Signup = () => {
    const [form] = Form.useForm();
    const [value, setValue] = useState(1);
    const [title, setTitle] = useState("ADMIN");
    const navigate = useNavigate();
    function handleclick(){
        navigate("/")
    }
    return (
        <>
        <div id="main">
            <div  className="formdiv">
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
                    <Form id="signup" form={form}>
                        <div>
                            <Title>Choose Your Role</Title>
                            <br />
                            <div class="cc-selector">
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
                                    <label style={{ backgroundImage: `url(` + admin + `)` }} class="drinkcard-cc admin" for="admin"></label>
                                    <input
                                        onClick={() => {
                                            setValue(2);
                                            setTitle("USER");
                                        }}
                                        id="user"
                                        type="radio"
                                        name="credit-card"
                                    />
                                    <label style={{ backgroundImage: `url(` + user + `)` }} class="drinkcard-cc user" for="user"></label>
                                    <input
                                        onClick={() => {
                                            setValue(3);
                                            setTitle("VENDOR");
                                        }}
                                        id="editor"
                                        type="radio"
                                        name="credit-card"
                                    />
                                    <label style={{ backgroundImage: `url(` + editor + `)` }} class="drinkcard-cc editor" for="editor"></label>
                                    <Title level={1}>{title}</Title>
                                </Space>
                            </div>
                            <Form.Item validateStatus="warning">
                                <div className="border">
                                    <Title level={5}>First Name</Title>
                                    <Input bordered={false} allowClear placeholder="Enter Your First Name" suffix={<UserOutlined />} />
                                </div>
                            </Form.Item>
                            <Form.Item validateStatus="warning">
                                <div className="border">
                                    <Title level={5}>Last Name</Title>
                                    <Input bordered={false} allowClear placeholder="Enter Your Last Name" suffix={<UserOutlined />} />
                                </div>
                            </Form.Item>
                            <Form.Item validateStatus="warning">
                                <div className="border">
                                    <Title level={5}>E-Mail</Title>
                                    <Input bordered={false} allowClear placeholder="Enter Your E-Mail" suffix={<MailOutlined />} />
                                </div>
                            </Form.Item>
                            <Form.Item validateStatus="warning">
                                <div className="border">
                                    <Title level={5}>Profession</Title>
                                    <Input bordered={false} allowClear placeholder="Enter Your Profession" suffix={<ProfileOutlined />} />
                                </div>
                            </Form.Item>
                            <Form.Item validateStatus="error">
                                <div className="border">
                                    <Title level={5}>Password</Title>
                                    <Input.Password bordered={false} allowClear placeholder="Enter Password" />
                                </div>
                            </Form.Item>
                            <Form.Item validateStatus="error">
                                <div className="border">
                                    <Title level={5}>Password</Title>
                                    <Input.Password bordered={false} allowClear placeholder="Re-Enter Password" />
                                </div>
                            </Form.Item>
                            <Space >
                                <Button onClick={handleclick} size="large" type="primary">
                                    Create Account
                                </Button>
                                <ReloadOutlined />
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

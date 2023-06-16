import {  MailOutlined, } from "@ant-design/icons";
import { Space, Typography,  Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const { Title } = Typography;

export const Login = () => {
    // const [value, setValue] = useState(1);
    // const [title, setTitle] = useState("ADMIN");
    const navigate = useNavigate();
    function handleclick(){
        navigate("/homepage");
    }
    return (
        <>
        <div id="main">

            <div className="formdiv">
                <div id="space"/>
                <Title>
                    Welcome back<span className="blue">!</span>
                </Title>
                <Title level={3}>
                    New Here?{" "}
                    <span className="blue" onClick={() => navigate("signup")}>
                        Create A New Account
                    </span>
                </Title>
                <br /> <br /> 

                <Form id="login">
                    <div>
                        <Form.Item validateStatus="warning">
                            <div className="border">
                                <Title level={5}>E-Mail</Title>
                                <Input bordered={false} allowClear placeholder="Enter Your E-Mail" suffix={<MailOutlined />} />
                            </div>
                        </Form.Item>
                        <Form.Item validateStatus="error">
                            <div className="border">
                                <Title level={5}>Password</Title>
                                <Input.Password bordered={false} allowClear placeholder="Enter Password" />
                            </div>
                        </Form.Item>
                        <Space>
                            <Button onClick={handleclick} size="large" type="primary">
                                Login
                            </Button>
                        </Space>
                    </div>
                </Form>
                </div>
                </div>
        </>
    );
};

import { MailOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import { Space, Typography, Form, Input, Button,Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logUser, setItemList, setTitle } from "../redux/slice/shopSlice";
import { LoginService } from "../services/loginService";
import { GetCartItems } from "../services/getCartItems";

const { Title } = Typography;

export const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [modal, contextHolder] = Modal.useModal();
    const storedData=useSelector(state=>state.shop.userdata)
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const handleclick=async()=> {
        // const storedData = JSON.parse(localStorage.getItem("userdata")) || [];
        try{
            const response=await LoginService({email:email,password:password})
            console.log(response)
            // const Items=await GetCartItems()
            // dispatch(setItemList(Items))
        }catch(err){
            console.log(err)
        }
        const user = storedData.find((userData) => userData.email === email);
        if (user && user.password === password) {
            // localStorage.setItem("currentUser", JSON.stringify(user));
            // localStorage.setItem("titlevalue", JSON.stringify(user.title));
            dispatch(logUser(user))
            dispatch(setTitle(user.title))
            navigate("/homepage");
        } else {
            confirm("Invalid email or password. Please try again.");
        }
    }
    const confirm = (context, okText) => {
        modal.confirm({
            title: 'ERROR',
            icon: <ExclamationCircleOutlined />,
            content: context,
            okText: okText,
            // cancelText: 'OK',
            onOk: () => navigate('/'),
        });
    };
    
    return (
        <>
            <div id="main">
                {contextHolder}
                <div id="loginnnn" className="formdiv">
                    <div id="space" />
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
                                    <Input onChange={(e) => setEmail(e.target.value)} bordered={false} allowClear placeholder="Enter Your E-Mail" suffix={<MailOutlined />} />
                                </div>
                            </Form.Item>
                            <Form.Item validateStatus="error">
                                <div className="border">
                                    <Title level={5}>Password</Title>
                                    <Input.Password onChange={(e) => setPassword(e.target.value)} bordered={false} allowClear placeholder="Enter Password" />
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

import { MenuFoldOutlined, MenuUnfoldOutlined, ShoppingCartOutlined, LogoutOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons";
import { Button, Menu, Popconfirm } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Logout from "./logout";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice/shopSlice";
import { UpdateProfile } from "../services/updateProfile";

const Navigation = ({ keyval }) => {
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const currentUser=useSelector(state=>state.shop.currentUser)
    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }   
    const items = [
        getItem("PROFILE", "1", <UserOutlined onClick={() => navigate("/profile")} />),
        getItem(
            "HOME",
            "2",
            <HomeOutlined
                onClick={() => {
                    navigate("/homepage");
                }} />
        ),
        getItem(
            "CART",
            "3",
            <ShoppingCartOutlined
                onClick={() => {
                    navigate("/cart");
                }} />
        ),
        getItem(
            "LOGOUT",
            "4",
            <Popconfirm
                width="4vw"
                placement="right"
                title={"Are you sure want to Logout?"}
                // description={"LOGOUT"}
                onConfirm={async() => {  
                    // localStorage.setItem("currentUser",""); 
                    try {
                        const response=await UpdateProfile(currentUser)
                        console.log(response); 
                    } catch (error) {
                        console.log(error);
                    }
                    dispatch(logout())
                    navigate("/")}}
                okText="Yes"
                cancelText="No">
                <LogoutOutlined />
            </Popconfirm>
        ),
    ];
    const [collapsed, setCollapsed] = useState(true);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    return (
        <>
            <div
                id="menu"
                style={{
                    width: "10vw",
                }}
            >
                <Button
                    type="primary"
                    onClick={toggleCollapsed}
                    style={{
                        marginBottom: 16,
                        backgroundColor: "#888",
                    }}
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                <Menu
                    defaultSelectedKeys={[keyval]}
                    defaultOpenKeys={[`sub2`]}
                    mode="inline"
                    theme="dark"
                    style={{
                        height: "90vh",
                        borderRadius: "10px",
                        backgroundColor: "#00000050",
                    }}
                    inlineCollapsed={collapsed}
                    items={items}
                />
            </div>
        </>
    );
};
export default Navigation;
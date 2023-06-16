import { MenuFoldOutlined, MenuUnfoldOutlined,ShoppingCartOutlined, LogoutOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

 const Navigation = ( {keyval} ) => {
    const navigate = useNavigate();
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
                }}
            />
        ),
        getItem(
            "CART",
            "3",
            <ShoppingCartOutlined 
                onClick={() => {
                    navigate("/cart");
                }}
            />
        ),
        getItem(
            "LOGOUT",
            "4",
            <LogoutOutlined
                onClick={() => {
                    navigate("/");
                }}
            />
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
                    width: 150,
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
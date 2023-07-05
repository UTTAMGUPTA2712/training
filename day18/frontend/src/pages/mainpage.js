import { Drawer } from "antd";
import { useEffect, useState } from "react";
import image from "../asset/image/image.json";
import SideCard from "../component/sidecard";
import { LeftOutlined, RollbackOutlined } from "@ant-design/icons";
import WeatherDetail from "../component/weatherdetail";
import { WeatherService } from "../services/weatherservice";
import { Switch } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slice/authSLice";

const MainPage = () => {
    const [index, setindex] = useState(0);
    const [index2, setindex2] = useState(0);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState();
    const [err, seterr] = useState(false)
    const dispatch=useDispatch()
    const showDrawer = () => {
        setOpen(true);
    };
    const [data, setData] = useState(null);
    const onClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        const getdata = async () => {
            try {
                const value = await WeatherService(search);
                if (value.data === "") { seterr(true); } else {
                    seterr(false);
                    setData(value.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getdata();
    }, [search]);
    useEffect(() => {
        switch (data?.weather[0].description) {
            case "clear sky":
            case "few clouds":
                setindex(0);
                break;
            case "broken clouds":
            case "scattered clouds":
                setindex(1);
                break;
            case "shower rain":
            case "rain":
                setindex(2);
                break;
            case "thunderstorm":
                setindex(3);
                break;
            case "snow":
                setindex(4);
                break;
            case "mist":
            case "dust":
                setindex(5);
                break;
            default:
                setindex(0);
        }
    }, [data]);
    return (
        <>
            <div id="main" style={{ backgroundImage: `url(${image.data[index2][index]})`, color: (index2 === 1) ? "#f0f0f0" : "#0f0f0f" }}>
                <RollbackOutlined style={{fontSize:"3rem",position:"absolute"}} onClick={()=>dispatch(logout())} />
                <WeatherDetail data={data} />
                <div id="changebtn" className={open ? "hide" : ""}>
                    <Switch size="large" onChange={() => setindex2((index2 === 0) ? 1 : 0)} checkedChildren="DAY" unCheckedChildren="NIGHT" defaultChecked />
                </div>
                <div onClick={showDrawer} className={open ? "hide" : ""} id="openbutton">
                    <LeftOutlined />
                    <LeftOutlined />
                </div>
                <Drawer style={{ backgroundColor: "#ffffff00", backdropFilter: "blur(10px)" }} width="40rem" closable={false} onClose={onClose} open={open}>
                    <SideCard err={err} data={data} setSearch={setSearch} />
                </Drawer>
            </div>
        </>
    );
};
export default MainPage;

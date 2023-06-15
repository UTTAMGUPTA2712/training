import { Button, Drawer } from "antd";
import { useEffect, useState } from "react";
import image from "../asset/image/image.json";
import SideCard from "../component/sidecard";
import { LeftOutlined } from "@ant-design/icons";
import WeatherDetail from "../component/weatherdetail";
import { WeatherService } from "../services/weatherservice";
import val from "../check.json";
import { RadioChangeEvent } from "antd";
import { Input, Radio, Space } from "antd";

const MainPage = () => {
    const [index, setindex] = useState(0);
    const [index2, setindex2] = useState(0);

    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState();
    const showDrawer = () => {
        setOpen(true);
    };
    const [data, setData] = useState(val);
    const onClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        const getdata = async () => {
            try {
                const value = await WeatherService(search);
                console.log("baskbxjkaj", value);
                setData(value.data);
            } catch (error) {
                console.log(error);
            }
        };
        getdata();
    }, [search]);
    console.log(data);
    useEffect(() => {
        switch (data.weather[0].description) {
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
            <div id="main" style={{ backgroundImage: `url(${image.data[index2][index]})` }}>
                <WeatherDetail data={data} />
                <div id="changebtn" className={open?"hide":""}>
                    <Space direction="vertical">
                        <Button size="large" type="text" danger onClick={()=>setindex2(0)}>DAY</Button>
                        <Button  size="large" type="text" danger onClick={()=>setindex2(1)}>NIGHT</Button>
                    </Space>
                </div>
                <div onClick={showDrawer} className={open ? "hide" : ""} id="openbutton">
                    <LeftOutlined />
                    <LeftOutlined />
                </div>
                <Drawer style={{ backgroundColor: "#ffffff00" }} width="30%" closable={false} onClose={onClose} open={open}>
                    <SideCard data={data} setSearch={setSearch} />
                </Drawer>
            </div>
        </>
    );
};
export default MainPage;

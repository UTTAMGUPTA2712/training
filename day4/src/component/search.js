import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Tooltip } from "antd";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
const Search = ({ setSearch }) => {
    // const [search,setSearch] = useState("");
    const [value, setValue] = useState();
    const work = () => {
        setSearch(value);
    };
    return (
        <>
            <Input
                id="search"
                style={{ backgroundColor: "#ffffff70" }}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                placeholder="Enter Location"
                prefix={<UserOutlined style={{ fontSize: "25px" }} className="site-form-item-icon" />}
                suffix={
                    <>
                        <Tooltip title="Enter The Location At Which You Want To Check The Weather">
                            <InfoCircleOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                        </Tooltip>
                        <Tooltip title="search">
                            <Button onClick={work} size="large" shape="circle" icon={<SearchOutlined />} />
                        </Tooltip>
                    </>
                }
            />
        </>
    );
};
export default Search;

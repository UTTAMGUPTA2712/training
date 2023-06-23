import { Input, Select } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { phoneNumberAuthe } from "../redux/slice/authSlice";
const options = [];
for (let i = 80; i <= 99; i++) {
    options.push({
        value: i,
        label: i,
    });
}
const LoginPage = () => {
    const dispatch = useDispatch();
    const [option,setoption]=useState()
    const [phoneNumber,setPhoneNumber] = useState()
    const navigate=useNavigate()
    const handleclick=()=>{
        if(options&&phoneNumber){
            const value=option+phoneNumber
            dispatch(phoneNumberAuthe(value))
            navigate("/otp")
        }
    }
    return (
        <>
            <div id="logmain">
                <div>
                    <p>PLEASE FILL ALL THE VALUES TO GET OTP</p>
                    <Select onChange={(value)=>setoption(value)} style={{ width: "10%" }}   options={options} />
                    <Input onChange={(e)=>setPhoneNumber(e.target.value)} size="large" placeholder="large size" suffix={<PhoneOutlined />} />
                    <button disabled={!(option&&phoneNumber)} onClick={handleclick}>GET OTP</button>
                </div>
            </div>
        </>
    );
};
export default LoginPage;

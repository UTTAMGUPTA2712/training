import { Input, Select } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { phoneNumberAuthe } from "../redux/slice/authSlice";
const options = [];
for (let i = 80; i <= 271; i++) {
    options.push({
        value: i,
        label: i,
    });
}
const LoginPage = () => {
    const dispatch = useDispatch();
    const [option,setoption]=useState()
    const [phoneNumber,setPhoneNumber] = useState()
    // const phonenumbersize=()=>{phoneNumber.length}
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
            <div id="loghome">
                <div id="logmain">
                    <p>PLEASE FILL ALL THE VALUES TO GET OTP</p>
                    <div style={{width:"90%",textAlign:"center"}}>
                    <Select onChange={(value)=>setoption(value)} style={{ width: "10%" }} size="large"   options={options} />{" "}{" "}
                    <Input type="number"  onChange={(e)=>setPhoneNumber(e.target.value)} size="large" style={{width:"80%"}}   placeholder="large size" suffix={<PhoneOutlined />} />
                    </div>
                    <br/>
                    <button disabled={!(option&&(phoneNumber?.length)==1)} onClick={handleclick}>GET OTP</button>
                </div>
            </div>
        </>
    );
};
export default LoginPage;

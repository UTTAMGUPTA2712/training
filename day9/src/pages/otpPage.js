import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slice/resumeSlice";
import { auth } from "../redux/slice/authSlice";
import OtpInput from 'react-otp-input';
const Otp = () => {
    const [otp, setotp] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const phoneNumber = useSelector((state) => state.auth.phoneNumber);
    const handleClick = () => {
        if (otp == process.env.REACT_APP_OTP) {
            navigate("/home");
            dispatch(auth());
            dispatch(login(phoneNumber));
        }else{
            navigate("/")
        }
    };
    return (
        <>
            <div id="loghome">
                <div id="logmain">
                    <OtpInput
                        inputStyle={{width:"35px",height:"60px",backgroundColor:"#0f0f0f",color:"#f0f0f0",fontSize:"38px"}}
                        value={otp}
                        onChange={setotp}
                        numInputs={4}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} />}
                    />
                    <br/>
                    <button onClick={handleClick}>LOGIN</button>
                </div>
            </div>
        </>
    );
};
export default Otp;

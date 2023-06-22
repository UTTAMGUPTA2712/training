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
    const phoneNumber = useSelector((state) => state.phoneNumber);
    const handleClick = () => {
        if (otp == process.env.REACT_APP_OTP) navigate("/homepage");
        dispatch(auth());
        dispatch(login(phoneNumber));
    };
    return (
        <>
            <div id="logmain">
                <div>
                    {/* <input onChange={(e) => setotp(e.target.value)} id="otp" placeholder="xxxx" maxlength="4" /> */}
                    <OtpInput
      value={otp}
      onChange={setotp}
      numInputs={4}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
    />
                    <button onClick={handleClick}>LOGIN</button>
                </div>
            </div>
        </>
    );
};
export default Otp;

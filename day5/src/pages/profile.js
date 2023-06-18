import { useState } from "react";
import Navigation from "../component/navigation";
import { Modal } from 'antd';
import { MailOutlined, HomeOutlined, FileProtectOutlined, EditOutlined, SaveOutlined, RollbackOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const Profile = () => {
    const keyval = "1";
    const [userData, setuser] = useState(JSON.parse(localStorage.getItem("currentUser")));
    const [componentDisabled, setComponentDisabled] = useState(true);

    const [name, setName] = useState(userData.name)
    const [lastname, setlastname] = useState(userData.lastname)
    const [email, setEmail] = useState(userData.email)
    const [prof, setprof] = useState(userData.prof)
    const [address, setAddress] = useState(userData.address || "Chandigarh, India")
    const [location, setlocation] = useState(userData.location || "Zenmonk")
    const [modal, contextHolder] = Modal.useModal();
    const confirm = (content) => {
        modal.confirm({
            title: 'ERROR',
            icon: <ExclamationCircleOutlined />,
            content: content||"Name, Email, Profession Cannot be black",
            okText: "EXIT WITHOUT CHANGING",
            cancelText: 'TYPE',
            onOk: () => { window.location.reload() },
        });
    };
    const handlesave = () => {
        if (name && lastname && email && prof) {
            if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                const user = {
                    title: userData.title,
                    name: name,
                    lastname: lastname,
                    email: email,
                    prof: prof,
                    address: address,
                    location: location,
                };
                localStorage.setItem("currentUser", JSON.stringify(user));
                setComponentDisabled(true)
            } else {
                confirm("Email Not Valid")
            }
        }
        else {
            confirm()
        }
    }
    return (
        <>
            <div id="profilehome">
                <Navigation keyval={keyval} />
                <div id="profileimage">
                    <div id="profile">
                        <div id="profiledetail">
                            {contextHolder}
                            <div id="edit">{(componentDisabled) ? <EditOutlined style={{ fontSize: "7vh" }} onClick={() => setComponentDisabled(false)} /> :
                                <div><RollbackOutlined style={{ fontSize: "7vh" }} onClick={() => window.location.reload()} />
                                    {"  "}{" "}
                                    <SaveOutlined style={{ fontSize: "7vh" }} onClick={handlesave} /></div>}</div>
                            <div className="topleft">
                                <h1><input id={componentDisabled ? "" : "bordercolor"} className="profileinput" onChange={(e) => setName(e.target.value)} disabled={componentDisabled} value={(name).toUpperCase()} ></input>
                                    <input id={componentDisabled ? "" : "bordercolor"} className="profileinput" onChange={(e) => setlastname(e.target.value)} disabled={componentDisabled} value={(lastname).toUpperCase()}></input></h1>
                                <br />
                                <h4><input id={componentDisabled ? "" : "bordercolor"} className="profileinput" onChange={(e) => setlocation(e.target.value)} disabled={componentDisabled} value={location}></input></h4>
                                <h4>ROLE : {userData.title}</h4>
                            </div>
                            <div className="bottomright">
                                <h2>Hey There</h2>
                                <p><FileProtectOutlined /> A <input id={componentDisabled ? "" : "bordercolor"} className="profileinput" onChange={(e) => setprof(e.target.value)} disabled={componentDisabled} value={prof}></input></p>
                                <p><MailOutlined /> Email : <input id={componentDisabled ? "" : "bordercolor"} className="profileinput" onChange={(e) => setEmail(e.target.value)} disabled={componentDisabled} value={email}></input></p>
                                <p><HomeOutlined /> Address : <input id={componentDisabled ? "" : "bordercolor"} className="profileinput" onChange={(e) => setAddress(e.target.value)} disabled={componentDisabled} value={address}></input></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Profile;

import Navigation from "../component/navigation";

const Profile = () => {
    const keyval = "1";
    return (
        <>
            <div id="profilehome">
                <Navigation keyval={keyval} />
                <div id="profileimage">
                    <div id="profile">
                        <div id="profiledetail">
                    <div className="topleft">
                        <h1>Uttam Gupta</h1>
                        <br /> <br /> 
                        CHANDIGARH, INDIA
                    </div>
                    <div className="bottomright">
                        <h2>hey there</h2>
                        <p>A Full Stack Developer</p>
                        <p>EMAIL : uttamgupta@gmail.com</p>
                        <p>Address : Walk-in coorp</p>
                    </div>

                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Profile;

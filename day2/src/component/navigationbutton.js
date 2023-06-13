import { useNavigate } from "react-router-dom";

const NaviButton = ({ data, list }) => {
    const navigate = useNavigate();
    if (!data) data = "";
    return (
        <>
            <button className={data + " navbtn"} onClick={() => navigate("/" + data, { state: { list } })}>
                {data == "" ? "RETURN" : data == "complete" ? "COMPLETED ITEMS" : "DELETED ITEMS"}
            </button>
        </>
    );
};
export default NaviButton;

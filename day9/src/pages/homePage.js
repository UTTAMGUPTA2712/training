import { useSelector } from "react-redux"
import { FolderAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


const HomePage = () => {
    const data = useSelector((state) => state.currentUser)
    const navigate=useNavigate()
    return (<>

        <button id="addresume" onClick={()=>navigate("/form")}>
            <FolderAddOutlined/>
            </button>
    </>)
}
export default HomePage
import { useSelector } from "react-redux"
import { FolderAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ResumeCard from "../component/resumeCard";


const HomePage = () => {
    const data = useSelector((state) => state.resume.currentUser.data)
    const navigate=useNavigate()
    return (<>
    {data.map((cv)=>{return<> <ResumeCard/></>})}
        <button id="addresume" onClick={()=>navigate("/form")}>
            <FolderAddOutlined/>
            </button>
    </>)
}
export default HomePage
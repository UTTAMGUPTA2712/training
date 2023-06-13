import { useLocation } from "react-router-dom";
import ItemList from "../component/itemlist";
import NaviButton from "../component/navigationbutton";

const DeletedTaskPage = () => {
    const location = useLocation();
    const data = location.state.list;
    return (
        <>
            <NaviButton />
            <ItemList data={data ? data : []} type={"delete"} />
        </>
    );
};
export default DeletedTaskPage;

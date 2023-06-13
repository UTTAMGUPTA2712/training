import { useLocation } from "react-router-dom";
import ItemList from "../component/itemlist";
import NaviButton from "../component/navigationbutton";

const CompletedTaskPage = () => {
    const location = useLocation();
    const data = location.state.list;
    return (
        <>
            <NaviButton />
            <ItemList data={data ? data : []} removedTask={null} type={"complete"} />
        </>
    );
};
export default CompletedTaskPage;

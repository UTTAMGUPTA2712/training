import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useDispatch } from "react-redux";
import { deletenote } from "../redux/reducer/noteslice";
const NoteCard = ({ setModal, showDrawer, data }) => {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deletenote(data.id));
    };
    return (
        <>
            <div id="card">
                <Card
                    title={<h2>{data?.title || "note"}</h2>}
                    extra={
                        <span style={{ cursor: "pointer" }} onClick={() => setModal(data)}>
                            More...
                        </span>
                    }
                    style={{ width: "220px", backgroundColor: "#B19EE680", border: 0 }}
                >
                    <div id="data" style={{ height: "100px" }} dangerouslySetInnerHTML={{ __html: data.content }}></div>
                    <div id="icondiv">
                        <EditOutlined
                            onClick={() => {
                                showDrawer(data);
                                console.log("kjgch");
                            }}
                        />{" "}
                        <DeleteOutlined onClick={handleDelete} />
                    </div>
                </Card>
            </div>
        </>
    );
};
export default NoteCard;

import { FolderViewOutlined, DeleteOutlined } from "@ant-design/icons";
const ResumeCard = ({ data, index }) => {
    const handleDelete = () => {

    }
    const handleView = () => { }
    return (
        <>
            <div id="resumecard">
                <div id="carddata"></div>
                <FolderViewOutlined onclick={handleView} />
                <DeleteOutlined onclick={handleDelete} />
            </div>
        </>
    );
};
export default ResumeCard;

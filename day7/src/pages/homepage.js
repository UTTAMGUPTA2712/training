import { useSelector } from "react-redux";
import Search from "../component/search";
import { FolderAddOutlined } from "@ant-design/icons";
import NoteCard from "../component/notecard";
import { useState } from "react";
import { Drawer } from "antd";
import Editor from "../component/editor";
import Shownote from "../component/shownote";

const HomePage = () => {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const notes = useSelector((state) => state.note.note);
    const [drawerdata, setDrawerdata] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [noteModal, setNoteModal] = useState();
    console.log(notes);
    const setModal = (value) => {
        setNoteModal(value);
        setOpenModal(true);
    };
    const showDrawer = (value) => {
        setOpen(true);
        setDrawerdata(value);
    };
    const onClose = () => {
        setOpen(false);
    };
    const changeSearch = (value) => {
        setSearch(value);
    };
    const closeModal = () => {
        setOpenModal(false);
    };
    console.log(search);
    return (
        <>
            <div id="home">
                <div id="bar">
                    <FolderAddOutlined id="add" onClick={showDrawer} />

                    <Search changeSearch={changeSearch} />
                </div>

                <div id="board">
                    <Shownote closeModal={closeModal} open={openModal} data={noteModal} />
                    {notes.length > 0 &&
                        notes?.map((note) => {
                            const query = search.toLowerCase();
                            if (note.title.toLowerCase().includes(query) || note.content.toLowerCase().includes(query)) {
                                return <NoteCard setModal={setModal} showDrawer={showDrawer} data={note} />;
                            }
                        })}
                    <Drawer id="drawer" style={{ backgroundColor: "#BC9EE0a0" }} title={"WRITE A NOTE..."} placement="right" width="40vw" onClose={onClose} open={open}>
                        <Editor onClose={onClose} data={drawerdata} />
                    </Drawer>
                </div>
            </div>
        </>
    );
};
export default HomePage;

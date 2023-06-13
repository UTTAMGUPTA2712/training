import { useState } from "react";
import Form from "../component/form";
import ItemList from "../component/itemlist";
import NaviButton from "../component/navigationbutton";

const Mainpage = () => {
    const [tasklist, setTasklist] = useState([]);
    const [completedTask, setCompletedTask] = useState([]);
    const [deletedTask, setDeletedTask] = useState([]);
    const addtasklist = (task, date) => {
        setTasklist(task !== "" && date ? [...tasklist, [task, date]] : tasklist);
    };
    const removedTask = (index, status) => {
        if (status == "delete") {
            setDeletedTask([...deletedTask, tasklist[index]]);
        } else {
            setCompletedTask([...completedTask, tasklist[index]]);
        }
        tasklist.splice(index, 1);
        setTasklist(tasklist);
    };
    console.log(completedTask);
    return (
        <>
            <Form addtasklist={addtasklist} />
            <br/>
            <NaviButton data="complete" list={completedTask} />
            <NaviButton data="delete" list={deletedTask} />
            <br/>
            <br/>
            <ItemList data={tasklist} removedTask={removedTask} type={"main"} />
        </>
    );
};
export default Mainpage;

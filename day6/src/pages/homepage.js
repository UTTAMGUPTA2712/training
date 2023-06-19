import { useDispatch, useSelector } from "react-redux";
import { add, deleter } from "../redux/action/slice.js";
import { useEffect, useRef, useState } from "react";
import { Avatar, Badge, Space, Select, Input, DatePicker, Button, Form } from "antd";
import Task from "../component/task.js";

const HomePage = () => {
    const dispatch = useDispatch();
    const form = useRef(null);
    const [task, settask] = useState("");
    const data = useSelector((state) => state.arr.value);
    const taskassign = useSelector((state) => state.arr.task);
    console.log(taskassign);
    const [option, setoption] = useState("");
    const [date, setdate] = useState("2023-06-01");
    const [user, setuser] = useState("");
    useEffect(() => {
        let arr = [];
        data.map((item) => {
            arr.push({ value: item.userId, label: item.name });
        });
        setoption(arr);
    }, []);
    const handleChange = () => {
        for(let tasknow of taskassign) {
            const task=JSON.parse(tasknow);
            if(task.user.userId==user&&task.task==task) {
                // return state
                // console.log(tasknow.value);
                alert("Alerdy assigned")
            }
        }
        const value = [user, task, date];
        console.log("", value);
        dispatch(add(value));
        setdate("");
        settask("");
        setuser("");
        form.current.resetFields()
    };
    return (
        <>
            <div id="home">
                <Space.Compact block>
                    <Form id="form" ref={form}>
                        <Form.Item name="select">
                            <Select
                                size="large"
                                style={{
                                    width: "100%",
                                }}
                                placeholder="Tags Mode"
                                onChange={(value) => {
                                    setuser(value);
                                }}
                                options={option}
                                // value={user}
                            />
                        </Form.Item>
                        <Form.Item name={"input"}>
                            <Input
                                size="large"
                                placeholder="input with clear icon"
                                allowClear
                                onChange={(e) => {
                                    settask(e.target.value);
                                }}
                                // value={task}
                            />
                        </Form.Item>
                        <Form.Item name="date">
                            <DatePicker
                                size="large"
                                onChange={(_, dateString) => {
                                    setdate(dateString);
                                    console.log(dateString);
                                }}
                                // value={date}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button disabled={task && user && date ? false : true} size="large" onClick={handleChange}>
                                ADD
                            </Button>
                        </Form.Item>
                    </Form>
                </Space.Compact>{" "}
                <div id="avatar">
                    <Space>
                        {data.map((item) => {
                            return (
                                <>
                                    {item.taskCount > 0 && (
                                        <Badge count={item.taskCount}>
                                            <Avatar size={70} src={item.pic} shape="circle" />
                                        </Badge>
                                    )}
                                </>
                            );
                        })}
                    </Space>
                </div>
                <div id="tasklist">
                    <Space direction="vertical">
                        <div id="taskhead">
                            <h1 id="taskpic">#</h1>
                            <h1 id="detail">DESCRIPTION</h1>
                            <h1 id="date">DATE</h1>
                        </div>
                        <div style={{ height: "60vh", overflowY: "auto" }}>
                            {taskassign.map((item, index) => {
                                return (
                                    <>
                                        <div id="task" key={index}>
                                            <Task data={JSON.parse(item)} />
                                        </div>
                                    </>
                                );
                            })}
                        </div>
                    </Space>
                </div>
            </div>
        </>
    );
};
export default HomePage;

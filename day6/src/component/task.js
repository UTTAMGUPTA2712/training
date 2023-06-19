const Task = ({ data }) => {
    return (
        <>
            <img src={data.user.pic} id="taskpic" />
            <div id="detail">
                <h1>{data.user.name.toUpperCase()}</h1>
                <h3>{data.task}</h3>
            </div>
            <h3 id="date">{data.date}</h3>
        </>
    );
};
export default Task;

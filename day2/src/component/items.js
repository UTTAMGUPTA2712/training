const Item = ({ data, type, removedTask, index }) => {
    const tocompleted = () => {
        removedTask(index, "complete");
    };
    const todeleted = () => {
        removedTask(index, "delete");
    };
    return (
        <>
            <td >{data[0]}</td>
            <td>{data[1]}</td>
            {type == "main" ? (
                <td>

                    <button  className="selectorbtn"onClick={() => {tocompleted();}}>✔️</button>
                    {' '}
                    <button  className="selectorbtn" onClick={() => {todeleted();}}>❌</button>
                </td>
            ) : (
                <td>
                    <button className={type + " navbtn"} disabled>
                        {type == "complete" ? "SUBMITTED" : "DELETED"}
                    </button>
                </td>
            )}
        </>
    );
};
export default Item;

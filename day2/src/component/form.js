import { useState } from "react";

const Form = ({ addtasklist }) => {
    const [data, setdata] = useState("");
    const [date, setdate] = useState();
    const [err, seterr] = useState(true);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!date || !data) {
            seterr(false);
            console.log(!date || !data);
            return;
        }
        addtasklist(data, date);
        setdata("");
        setdate();
        seterr(true);
        document.getElementById("form").reset();
    };
    return (
        <>
            <div>
                <form id="form" onSubmit={handleSubmit}>
                    <div className="formdiv">
                        <input 
                            id="taskinput"
                            onChange={(e) => {
                                setdata(e.target.value);
                            }}
                            type="text"
                            name="task"
                            placeholder="TASK TO BE DONE"
                        />
                        <br />
                        <span style={{ visibility: data != "" || err ? "hidden" : "visible" }} className={"err"}>
                            PLEASE FILL THE TASK
                        </span>
                        <br />
                        <input
                            onChange={(e) => {
                                setdate(e.target.value);
                            }}
                            type="date"
                            placeholder="DEAD LINE"
                        />
                        <br />
                        <span style={{ visibility: date || err ? "hidden" : "visible" }} className={"err"}>
                            PLEASE SELECT THE DATE
                        </span>
                    </div>
                    <button id="submit" type="submit">
                        SUBMIT
                    </button>
                </form>
            </div>
        </>
    );
};
export default Form;

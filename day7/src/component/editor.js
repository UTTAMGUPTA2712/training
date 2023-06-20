import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { add, edit } from "../redux/reducer/noteslice";
import { useDispatch } from "react-redux";
import { RandomNumber } from "../util/randomnumber";
function Editor({ onClose, data }) {
    console.log(data);
    const dispatch = useDispatch();
    const editor = useRef(null);
    const [content, setContent] = useState(data.content || "");
    const [notetitle, setNotetitle] = useState(data.title || "");
    console.log(content, notetitle);
    useEffect(() => {
        console.log("xaxjasvxjavsxjvasxsghg");
        setContent(data.content);
        setNotetitle(data.title);
    }, [data]);
    function submitNote() {
        // event.preventDefault();
        if (notetitle && content) {
            dispatch(add({ title: notetitle, content: content, id: RandomNumber() }));
            setNotetitle("");
            setContent("");
            onClose();
        }
    }
    const handleedit = () => {
        if (notetitle && content) {
            dispatch(edit({ title: notetitle, content: content, data: data.id }));
            setNotetitle("");
            setContent("");
            onClose();
        }
    };
    console.log(notetitle, content);
    return (
        <div id="editor">
            <input id="title" onChange={(e) => setNotetitle(e.target.value)} value={notetitle} placeholder="TITLE" />
            <br />
            {console.log("qdq", data.title)}

            <div id="editordiv">
                <JoditEditor ref={editor} value={content} tabIndex={1} onBlur={(newContent) => setContent(newContent)} />
            </div>
            {!data.title && (
                <button id="button" className="btn" onClick={submitNote}>
                    Add
                </button>
            )}
            {data.title && (
                <button
                    className="btn"
                    onClick={() => {
                        handleedit();
                    }}
                >
                    edit
                </button>
            )}
        </div>
    );
}
export default Editor;

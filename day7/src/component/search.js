import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

const Search = ({ changeSearch }) => {
    const handleChange = (e) => {
        const change = () => {
            setTimeout(() => {
                changeSearch(e.target.value);
            }, 1200);
        };
        change();
        clearTimeout(change);
    };
    return (
        <>
            <input id="search" placeholder="SEARCH" onChange={handleChange} />
        </>
    );
};
export default Search;

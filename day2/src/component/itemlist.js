import { useState } from "react";
import Item from "./items";

const ItemList = ({ data, removedTask, type }) => {
    return (
        <>
            <table>
                <tr>
                    <th>TASK</th>
                    <th>DEADLINE</th>
                    <th>STATUS</th>
                </tr>
                {data.map((item, index) => {
                    return (
                        <>
                            <tr key={index}>
                                <Item data={item} type={type} removedTask={removedTask} index={index} />
                            </tr>
                        </>
                    );
                })}
            </table>
        </>
    );
};
export default ItemList;

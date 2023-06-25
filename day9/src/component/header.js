import { Button, Menu, Dropdown, Space, Tooltip } from 'antd';
import Logout from "./logout"
import { useState } from 'react';

const Header=({template,formtype,changeformtype,changetemplate})=>{
    return (
        <>
        
        <div id="header">
            
            <Space>
            SORT BY TYPE : <Space.Compact block><span className={formtype==""?"selectedspan":"unselectedspan"} onClick={()=>changeformtype("")}>ALL</span><span className={formtype=="complete"?"selectedspan":"unselectedspan"} onClick={()=>changeformtype("complete")}>COMPLETE</span><span className={formtype=="draft"?"selectedspan":"unselectedspan"} onClick={()=>changeformtype("draft")}>DRAFT</span></Space.Compact>
            BY TEMPLATE : <Space.Compact block><span className={template==""?"selectedspan":"unselectedspan"} onClick={()=>changetemplate("")}>ALL</span><span className={template=="1"?"selectedspan":"unselectedspan"} onClick={()=>changetemplate("1")}>TEMP1</span><span className={template=="2"?"selectedspan":"unselectedspan"} onClick={()=>changetemplate('2')}>TEMP2</span><span className={template=="3"?"selectedspan":"unselectedspan"} onClick={()=>changetemplate("3")}>TEMP3</span></Space.Compact>
            </Space>
            <Logout/>

        </div>
        </>
    )
}
export default Header
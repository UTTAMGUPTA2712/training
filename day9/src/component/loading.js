import { Alert, Space, Spin } from 'antd';

const Loading=()=>{
    return(<>
        <div style={{display:"flex",flexDirection:"column",height:"100vh",width:"100vw",justifyContent:"center",alignContent:"center"}}>
             <Spin style={{color:"white"}} tip={<h1>PLEASE WAIT . . .</h1>} size="large">
        <div className="content" />
      </Spin>
      </div>
    </>)
}
export default Loading
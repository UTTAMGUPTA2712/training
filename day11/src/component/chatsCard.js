const ChatsCard=({data,user})=>{
    return (<>
        <div className={data?.sender==user?"userchat":"senderchat"}>
            <p>{data?.chat}</p><span>{data?.time}</span>
        </div>
        
    </>)
}
export default ChatsCard
const ChatsCard=({data,user})=>{
    return (<>
        <div className={data?.sender==user?"senderchat":"recieverchat"}>
            <div>{data?.chat}</div><span>{data?.time}</span>
        </div>
    </>)
}
export default ChatsCard
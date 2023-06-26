const UserCard=({data})=>{
    return (<>
    <div id="usercard"><img src={data?.imageURL??""}/><div><h1>{data?.name??"name"}</h1><h2>{data?.chat??"chat"}</h2></div></div>
    </>)
}
export default UserCard
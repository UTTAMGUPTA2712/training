import avataricon from "../assets/images/avatar.png"
const UserCard=({data})=>{
    data=data.data()
    console.log("mkmkmk",data)

    return (<>
    <div id="usercard"><img src={data?.photo??avataricon}/><div><h1>{data?.name??"name"}</h1><h2>{data?.chat??"chat"}</h2></div></div>
    </>)
}
export default UserCard
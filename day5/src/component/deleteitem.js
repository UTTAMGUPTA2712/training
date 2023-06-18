const DeleteItem=({id})=>{
    const itemdata=JSON.parse(localStorage.getItem("data"));
    const newdata=itemdata.filter(item=>item.id!=id)
    localStorage.setItem("data",JSON.stringify(newdata))
}
export default DeleteItem
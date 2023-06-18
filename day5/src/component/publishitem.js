const PublishItem = ({ id }) => {
    const itemData = JSON.parse(localStorage.getItem("data"));
    for(let item of itemData) {
        if(item.id === id){item.published=true}
    }
    console.log(itemData);
    localStorage.setItem("data", JSON.stringify(itemData))
};
export default PublishItem;
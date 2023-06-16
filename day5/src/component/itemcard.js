const ItemCard = ({ data }) => {
    return (
        <>
            <div id="item">
                <img></img>
                <h3>data.item</h3>
                <h4>data.description</h4>
                <h4>$data.price</h4>
            </div>
        </>
    );
};
export default ItemCard;
const Cart = (count) => {
    return (
        <>
            <span id="cartcount">{count.count}</span>
            <span id="cartimage">🛒</span>
        </>
    );
};
export default Cart;

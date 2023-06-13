const Item = ({ data }) => {
    return (
        <>
            <div className="item">
                <h1>{data.name}</h1>
                {/* <img src={data.image}/> */}
                <img src="https://i.ytimg.com/vi/P172dFjf2nM/maxresdefault.jpg"></img>
                <h3>
                    PRICE : $<span>{data.price}</span>
                </h3>
            </div>
        </>
    );
};
export default Item;

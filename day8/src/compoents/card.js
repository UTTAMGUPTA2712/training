const Card = ({ data }) => {
    return (
        <>
            <div className="card">
                <img src={data.images.jpg.large_image_url} />
                <h2>{data.title}</h2>
            </div>
        </>
    );
};
export default Card;

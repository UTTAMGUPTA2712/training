const Carosal = ({ data }) => {
    return (
        <>
            <div className="block">
                <h1>{data.title}</h1>
                <p className="description">{data.description}</p>
                <a href={data.url} target="_blank">
                    <button className="carobutton">LEARN MORE</button>
                </a>
            </div>
        </>
    );
};
export default Carosal;

const Item = ({ music }) => {
    return (
        <>
                <div style={{width:"90%"}}>
                    <h3>{music.title}</h3>
                    <p>
                        {music.genre}
                        <span id="views">Total Views : {music.count}</span>
                    </p>
                </div>
                <div>
                    <span>{music.duration}</span>
                </div>
        </>
    );
};
export default Item;

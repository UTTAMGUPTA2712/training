import Item from "./item";

const ListItem = ({ musicList,search, playingSong, changePlayingSong }) => {
    if(!search)search = ""
    return (
        <>
            <div >
                <table id="listitem">
                    <thead>
                        <tr>
                            <div>#</div>
                        </tr>
                    </thead>
                    <tbody>
                        {musicList.map((music, index) => {
                            return(
                                <>
                                {(!search || music.title.toLowerCase().includes(search.toLowerCase()))&&(
                                        <tr  className={music.title == playingSong[0].title ? "active" : ""}  onClick={()=>{changePlayingSong(index)}}>
                                            <div>{index + 1}</div>
                                            <Item music={music}/>
                                        </tr>
                            )}
                            </>
                        )})}
                    </tbody>
                </table>
            </div>
        </>
    );
};
export default ListItem;

const Search=({setSearch})=>{
    const debounce = (setSearch, wait = 800) => {
        let timeout;
        return (...args)=> {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                clearTimeout(timeout);
                setSearch(...args);
            }, wait);
        };
    };
    const work=debounce((e)=>{setSearch(e.target.value)});
    return (
        <>
            <input onChange={work}type="text"/>
        </>
    )
}
export default Search
import { useEffect, useState } from "react";
import AddItem from "../component/additem";
import ItemCard from "../component/itemcard";
import Navigation from "../component/navigation";
import { FolderAddOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
// import SetCart from "../component/setcart";

const Homepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const keyval = "2"
  const [indexing,setindexing]=useState(new Map())
  console.log("index",indexing)
  useEffect(() => {
    const localData = localStorage.getItem("data")
    if (localData) {
      setData(JSON.parse(localData)||[])
    }
  }, [isModalOpen])
  console.log("val", data);
  return (<>
    <AddItem isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    <div id="home">
      <Navigation keyval={keyval} />
      <div className={data[0] ? "nonempty" : "empty"} id="list">
        {(currentUser.title != "USER") ? <div id="item" className="additem" onClick={() => setIsModalOpen(true)}>
          <FolderAddOutlined style={{ fontSize: "67px" }} />
          <h1>ADD ITEM</h1>
        </div> : ""}
        {data.map((item) => {
          if ((currentUser.title == "VENDOR" && item.published == false && currentUser.email != item.user) || (currentUser.title == "USER" && item.published == false)) { } else {
            return <><ItemCard indexing={indexing} setindexing={setindexing} data={item} /></>
          }
        })}
      </div>
    </div>
  </>
  );
};
export default Homepage;

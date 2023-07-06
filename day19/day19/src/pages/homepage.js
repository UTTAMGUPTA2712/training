import { useEffect, useState } from "react";
import AddItem from "../component/additem";
import ItemCard from "../component/itemcard";
import Navigation from "../component/navigation";
import { FolderAddOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import axios from "axios";
import { GetCartItems } from "../services/getCartItems";

const Homepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [data, setData] = useState([]);
  const cart = useSelector(state => state.shop.itemList)
  const [data, setData] = useState([]);
  // const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const currentUser = useSelector(state => state.shop.currentUser)
  const keyval = "2"
  const [indexing, setindexing] = useState(new Map())
  
  // console.log("index", indexing)
  // useEffect(() => {
  //   const localData = localStorage.getItem("data")
  //   if (localData) {
  //     setData(JSON.parse(localData) || [])
  //   }
  // }, [isModalOpen])
  // console.log("val", data);
  useEffect(() => {
    const getCartData = async () => {
      try{
      const cartData = await GetCartItems()
      console.log(cartData)
      setData(cartData.data)
      }catch(err){console.log(err);}
    }
    getCartData()
  }, [cart])
  return (<>
    <AddItem isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    <div id="home">
      <Navigation keyval={keyval} />
      <div className={data[0] ? "nonempty" : "empty"} id="list">
        {(currentUser.title !== "USER") ? <div id="item" className="additem" onClick={() => setIsModalOpen(true)}>
          <FolderAddOutlined style={{ fontSize: "67px" }} />
          <h1>ADD ITEM</h1>
        </div> : ""}
        {data.map((item) => {
          if ((currentUser.title === "VENDOR" && item.published === false && currentUser.email !== item.user) || (currentUser.title === "USER" && item.published === false)||(item.user===null)) { } else {
            return <><ItemCard indexing={indexing} setindexing={setindexing} data={item} countnum={currentUser.cart[item.id]}/></>
          }
        })}
      </div>
    </div>
  </>
  );
};
export default Homepage;

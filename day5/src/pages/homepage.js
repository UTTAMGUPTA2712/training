import { useState } from "react";
import AddItem from "../component/additem";
import ItemCard from "../component/itemcard";
import  Navigation  from "../component/navigation";


 const Homepage=()=>  {
  const [isModalOpen, setIsModalOpen] = useState(false);
    const keyval="2"
    return(<>
            <div id="home">
                <Navigation keyval={keyval}/>
                <div id="list">
                <button onClick={()=>setIsModalOpen(true)}>ADD ITEM+</button>
                <AddItem isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                </div>
            </div>
      </>
    );
  };
  export default Homepage; 
  
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [data, setdata] = useState([])
  const [company, setcompany] = useState("")
  const [query, setQuery] = useState("")
  const getData = async () => {
    const response = await axios.post("http://localhost:1000/data", { location: company.location, distance: query })
    console.log("func", response.data);
    setdata(response?.data)
  }
  useEffect(() => {
    try {
      const start = async () => {
        const response = await axios.get("http://localhost:1000/")
        setdata(response?.data)
      }
      start()
    } catch (err) {
      console.log(err)
    }
  }, [])
  console.log(data, company, query);
  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} type='number' placeholder='Enter Distance' />
      <button onClick={() => getData()} disabled={company.length > 0}>FILTER</button>
      <div>
        <h2>{company?.name}</h2>
        <p>{company?.category}</p>
      </div>
      <div>
        {data.map((item, i) => {
          return <div style={{ display: "flex", justifyContent: "space-between", width: "30rem" }}><p>{i + 1}</p><h2 style={{ margin: 0 }}>{item?.name}</h2><button onClick={() => setcompany(item)}>SELECT</button></div>
        })}
      </div>
    </>
  );
}

export default App;

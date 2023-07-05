import { Card } from 'antd';
import Search from './search';
import { Button, Typography } from 'antd';
import { Collapse } from 'antd';

const { Title } = Typography;

const SideCard = ({err, data, setSearch }) => (

    <>
        <Search err={err} setSearch={setSearch} />
        <Title style={{ display: "flex", justifyContent: "space-between" }} level={2}><span>QUICK SEARCH</span></Title>
        <Button size='large' onClick={() => { setSearch("Delhi") }} type="secondary">Delhi</Button>
        <Button size='large' onClick={() => { setSearch("Mumbai") }} type='secondary'>Mumbai</Button>
        <Button size='large' onClick={() => { setSearch("Chennai") }} type='secondary'>Chennai</Button>
        <Button size='large' onClick={() => { setSearch("Varanasi") }} type='secondary'>Varanasi</Button>
        <Button size='large' onClick={() => { setSearch("Chandigarh") }} type='secondary'>Chandigarh</Button>
        <br />
        <br />
        <Card style={{ backgroundColor: "#ffffff50" }}>
            <Title style={{ display: "flex", justifyContent: "space-between" }} level={1}><span>Weather </span>   <span>{data?.weather[0].description} </span></Title>
            <Title style={{ display: "flex", justifyContent: "space-between" }} level={1}><span>Min Temp</span>   <span>{Math.floor(data?.main.temp_max - 273)}&#176;</span></Title>
            <Title style={{ display: "flex", justifyContent: "space-between" }} level={1}><span>Max Temp </span>   <span> {Math.floor(data?.main.temp_min - 273)}&#176;</span></Title>
            <Title style={{ display: "flex", justifyContent: "space-between" }} level={1}><span>Cloudy </span>   <span> {data?.clouds.all}%</span></Title>
            <Title style={{ display: "flex", justifyContent: "space-between" }} level={1}><span>Humidity </span>   <span> {data?.main.humidity}%</span></Title>
            <Title style={{ display: "flex", justifyContent: "space-between" }} level={1}><span>Pressure </span>   <span> {data?.main.pressure / 100}mm</span></Title>
            <Title style={{ display: "flex", justifyContent: "space-between" }} level={1}><span>Wind </span>   <span> {data?.wind.speed}km/h</span></Title>
        </Card>
        <Collapse></Collapse>

    </>

);
export default SideCard
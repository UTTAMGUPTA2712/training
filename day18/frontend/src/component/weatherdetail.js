import { Typography } from "antd";

const { Title } = Typography;
const WeatherDetail = ({ data }) => {
    // const date=new Date(Date.now()).toDateString();
    return (
        <>
            <div className="container">
                <Title id="temperature">{Math.floor(data?.main.temp - 273)}&#176;</Title>
                <div>
                    <Title id="name" level={2} className="temperature">
                        {data?.name}
                    </Title>
                    <Title id="date" level={3}>
                        {new Date(Date.now()).toDateString()}
                    </Title>
                </div>
            </div>
        </>
    );
};
export default WeatherDetail;

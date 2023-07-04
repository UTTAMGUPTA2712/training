import { useState } from "react";
import Carosal from "../component/carosal";
import backimage1 from "../asset/image/homepage.jpg";
import backimage2 from "../asset/image/background.jpg";
const HomePage = () => {
    const [carosal, setcarosal] = useState(0);
    const carosalData = [
        {
            title: "Summer Sale",
            description: "Get up to 50% off on summer essentials.",
            url: "https://example.com/summer-sale",
        },
        {
            title: "New Arrivals",
            description: "Discover the latest fashion trends for the season.",
            url: "https://example.com/new-arrivals",
        },
        {
            title: "Limited Offer",
            description: "Shop now and enjoy exclusive discounts for a limited time.",
            url: "https://example.com/limited-offer",
        },
    ];
    return (
        < >
            <div style={{ backgroundImage: `url(${backimage2})`,backgroundRepeat:"no-repeat",backgroundAttachment:"fixed",backgroundSize:"cover" }}>
            <div id="top" style={{ backgroundImage: `url(${backimage1})` }}>
                <div id="carosal">
                    <span
                        onClick={() => {
                            setcarosal(carosal == 0 ? 2 : carosal - 1);
                        }}
                    >
                        {"<"}
                    </span>
                    <Carosal data={carosalData[carosal]} />
                    <span
                        style={{ left: "650px" }}
                        onClick={() => {
                            setcarosal((carosal + 1) % 3);
                        }}
                    >
                        {">"}
                    </span>
                </div>
            </div>
            <div id="main">
                
            </div>
            </div>
        </>
    );
};
export default HomePage;

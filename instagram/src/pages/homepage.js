import Posts from "../component/posts"
import Sidebar from "../component/sidebar"

const HomePage = () => {
    return (<>

        <div id="grid">
            <Sidebar />
            <div>
                {/* showing post */}
                <Posts />
            </div>
        </div>
    </>)
}
export default HomePage
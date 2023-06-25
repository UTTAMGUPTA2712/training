import ResumeTemplate1 from "./resumeTemplate1.js"
import ResumeTemplate2 from "./resumeTemplate2.js"
import ResumeTemplate3 from "./resumeTemplate3.js"
import ResumeTemplate4 from "./resumeTemplate4.js"
const TemplateOption=({changeoption,option})=>{
    return(<>
            <div id="picker">
            <div onClick={() => changeoption(1)} className={option == 1 ? "tick options" : "untick options"}><ResumeTemplate1 /></div>
            <div onClick={() => changeoption(3)} className={option == 3 ? "tick options" : "untick options"}><ResumeTemplate3 /></div>
            <div onClick={() => changeoption(2)} className={option == 2 ? "tick options" : "untick options"}><ResumeTemplate2 /></div>
            <div onClick={() => changeoption(4)} className={option == 4 ? "tick options" : "untick options"}><ResumeTemplate4 /></div>
        </div>
    </>)
}
export default TemplateOption
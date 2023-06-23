import ResumeTemplate1 from "./resumeTemplate1";
import ResumeTemplate2 from "./resumeTemplate2";
import ResumeTemplate3 from "./resumeTemplate3";
import ResumeTemplate4 from "./resumeTemplate4";
const ResumeCard = ({ data }) => {
    const template=data.templatedata||2;
    const temp=()=>{
        switch(template){
            case 1:return <><ResumeTemplate1 data={data}/></>
            case 2:return <><ResumeTemplate2 data={data}/></>
            case 3:return <><ResumeTemplate3 data={data}/></>
            case 4:return <><ResumeTemplate4 data={data}/></>
        }
    }
    console.log(data);
    return (
        <>
            {temp()}
        </>
    );
};
export default ResumeCard;

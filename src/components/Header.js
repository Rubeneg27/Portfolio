import {FaReact, FaJs, FaHtml5, FaCss3, FaUnity } from "react-icons/fa";

function Header ({updateContent}) {
    return (
        <div className="Header">
                <div className="title" onClick={() => updateContent("Home")}>Ruben's site</div>
                <div className="decoration">
                        <div className="logoCont1"><FaJs className="logo1" /><span>Javascript</span></div>
                        <div className="logoCont2"><FaReact className="logo2" /><span>React</span></div>
                        <div className="logoCont3"><FaHtml5 className="logo3" /><span>HTML5</span></div>
                        <div className="logoCont4"><FaCss3 className="logo4" /><span>CSS</span></div>
                        <div className="logoCont5"><FaUnity className="logo5" /><span>Unity</span></div>
                        <div className="logoCont6"><div className="logo6" >C#</div><span>C#</span></div>
                </div>
                <div className="email">rubeneg27@gmail.com</div> 
        </div>
    )
}

export default Header;
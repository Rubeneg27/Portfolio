import {FaReact, FaJs, FaHtml5, FaCss3, FaUnity, FaAngular } from "react-icons/fa";
import './Header.css'
import { useDevice } from "../Context/DeviceContext.js";

function Header ({updateContent}) {

    const { isMobile } = useDevice();

    return (
        <div className={isMobile ? "HeaderMobile" : "Header"}>
                <div className="title" onClick={() => updateContent("Home")}>Ruben's site</div>
                <div className={isMobile ? "decorationMobile" : "decoration"} >
                        <div className="logoCont"><FaJs className="logo" /><span>Javascript</span></div>
                        <div className="logoCont"><FaReact className="logo" /><span>React</span></div>
                        <div className="logoCont"><FaAngular className="logo" /><span>Angular</span></div>
                        <div className="logoCont"><FaHtml5 className="logo" /><span>HTML5</span></div>
                        <div className="logoCont"><FaCss3 className="logo" /><span>CSS</span></div>
                        <div className="logoCont"><FaUnity className="logo" /><span>Unity</span></div>
                        <div className="logoCont"><div className="logo" >C#</div><span>C#</span></div>
                </div>
                <div className="email">{isMobile ? "" : "rubeneg27@gmail.com"}</div> 
        </div>
    )
}

export default Header;
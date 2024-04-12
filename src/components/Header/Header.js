import {FaReact, FaJs, FaHtml5, FaCss3, FaUnity, FaAngular, FaMailBulk, FaMailchimp, FaVoicemail, FaEnvelope } from "react-icons/fa";
import './Header.css'
import { useDevice } from "../Context/DeviceContext.js";

function Header ({updateContent}) {

    const { isMobile } = useDevice();

    return (
        <div className={isMobile ? "HeaderMobile" : "Header"}>
                <div className={isMobile ? "decorationMobile" : "decoration"} >
                        <div className="logoCont"><FaJs className="logo" /><span>Javascript</span></div>
                        <div className="logoCont"><FaReact className="logo" /><span>React</span></div>
                        <div className="logoCont"><FaAngular className="logo" /><span>Angular</span></div>
                        <div className="logoCont"><FaHtml5 className="logo" /><span>HTML5</span></div>
                        <div className="logoCont"><FaCss3 className="logo" /><span>CSS</span></div>
                        <div className="logoCont"><FaUnity className="logo" /><span>Unity</span></div>
                        <div className="logoCont"><div className="logo" >C#</div><span>C#</span></div>
                </div>
                {/* <div className="email" style={{display: 'flex', boxSizing: 'border-box', padding: '1vw'}}>
                    <FaEnvelope className="logo" />
                    <span style={{alignSelf: 'center', marginLeft: '1vw'}}>
                        {isMobile ? "" : "rubeneg27@gmail.com"}
                    </span>
                </div>  */}
        </div>
    )
}

export default Header;
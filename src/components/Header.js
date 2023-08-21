import {FaReact, FaJs, FaHtml5, FaCss3 } from "react-icons/fa";

function Header ({isNavCollapsed, updateContent}) {
    return (
        <div className="Header">
                <div className="title" onClick={updateContent}>Ruben's site</div>
                <div className="decoration">
                        <FaJs className="logo" />
                        <FaReact className="logo" />
                        <FaHtml5 className="logo" />
                        <FaCss3 className="logo" />
                </div>
                <div className="email">rubeneg27@gmail.com</div> 
        </div>
    )
}

export default Header;
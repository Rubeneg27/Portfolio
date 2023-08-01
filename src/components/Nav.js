import {FaReact, FaJs, FaHtml5, FaCss3 } from "react-icons/fa";

function Nav ({isNavCollapsed, isCollapsed, handleClickHome, handleClickAbout, handleClickProjects, handleClickContact}) {
  return (
      <ul className={ isCollapsed ? "Nav-collapsed" : "Nav" } >
                <div className={isNavCollapsed? "logos-collapsed" : "logos"}>
                    <FaJs className="logo" />
                    <FaReact className="logo" />
                    <FaHtml5 className="logo" />
                    <FaCss3 className="logo" />
                </div>
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={handleClickHome}>Home</li>
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={handleClickAbout}>About</li>
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={handleClickProjects}>Projects</li>
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={handleClickContact}>Contact</li>
      </ul>
  )
}

export default Nav;

import { useDevice } from "../Context/DeviceContext.js";
import './Nav.css'

function Nav ({isCollapsed, handleClickHome, handleClickAbout, handleClickProjects, handleClickContact}) {
  
  const { isMobile } = useDevice();

  return (
    <div className={isMobile? "sidebarMobile" : isCollapsed ? "sidebarCollapsed" : "sidebar"}>
      <ul className={ isCollapsed ? "Nav-collapsed" : "Nav" } >      
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={handleClickHome}>Home</li>
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={handleClickAbout}>About</li>
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={handleClickProjects}>Projects</li>
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={handleClickContact}>Contact</li>
      </ul>
    </div>
      
  )
}

export default Nav;

import { useDevice } from "../Context/DeviceContext.js";
import './Nav.css'

function Nav ({NavHandleClick, isCollapsed}) {
  
  const { isMobile } = useDevice();

  return (
    <div className={isMobile? "sidebarMobile" : isCollapsed ? "sidebarCollapsed" : "sidebar"}>
      <ul className={ isCollapsed ? "Nav-collapsed" : "Nav" } >      
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={() =>NavHandleClick("Home", false, false)}>Home</li>
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={() =>NavHandleClick("About", true, false)}>About</li>
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={() =>NavHandleClick("GamingHub", false, false)}>Gaming Hub</li>
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={() =>NavHandleClick("ImgGallery", false, true)}>Art Gallery</li>
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={() =>NavHandleClick("Contact", false, false)}>Contact</li>
      </ul>
    </div>
      
  )
}

export default Nav;
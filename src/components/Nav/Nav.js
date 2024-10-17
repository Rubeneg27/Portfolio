
import { useDevice } from "../Context/DeviceContext.js";
import './Nav.css'

function Nav ({NavHandleClick, isCollapsed}) {
  
  const { isMobile } = useDevice();

  return (
    <div className={isMobile? "sidebarMobile" : isCollapsed ? "sidebarCollapsed" : "sidebar"}>
      <ul className={ isCollapsed ? "Nav-collapsed" : "Nav" } >      
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={() =>NavHandleClick("Home", false)}>Home</li>
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={() =>NavHandleClick("About", true)}>About</li>
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={() =>NavHandleClick("Projects", false)}>Gaming Hub</li>
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={() =>NavHandleClick("ArtGallery", false)}>Art Gallery</li>
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={() =>NavHandleClick("Contact", false)}>Contact</li>
      </ul>
    </div>
      
  )
}

export default Nav;
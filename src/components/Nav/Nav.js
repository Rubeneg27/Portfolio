
import { useEffect } from "react";
import { useDevice } from "../Context/DeviceContext.js";
import './Nav.css'

function Nav ({NavHandleClick, isNavHidden}) {
  
  const { isMobile } = useDevice();
  
  return (
    <div className={isMobile? isNavHidden ? "sidebarMobile hidden" : "sidebarMobile" : "sidebar"}>
      <ul className="Nav">      
        <li className="li" onClick={() =>NavHandleClick("Home", false, false)}>Home</li>
        <li className="li" onClick={() =>NavHandleClick("About", true, false)}>About</li>
        <li className="li" onClick={() =>NavHandleClick("GamingHub", true, false)}>Gaming Hub</li>
        <li className="li" onClick={() =>NavHandleClick("ImgGallery", false, true)}>Art Gallery</li>
        <li className="li" onClick={() =>NavHandleClick("Contact", false, false)}>Contact</li>
      </ul>
    </div>
      
  )
}

export default Nav;
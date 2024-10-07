import { useDevice } from "../Context/DeviceContext.js";
import './Burger.css'

function Burger ({isCollapsed, isMenuOpen, handleClick, toggleMenu}) {

  const { isMobile } = useDevice();
  
  return (
      <div>
        <div className={isMenuOpen? "burger-hidden": isMobile ? "burgerMobile" : "burger" }onClick={toggleMenu} >
          <svg width="60px" height="60px">
            <rect></rect>
            <rect y="10"></rect>
            <rect y="20"></rect>
          </svg>
        </div>
        <ul className={isMenuOpen ? "dropdownMenuMobile" : "dropdown-menu-hidden"}>
          <li onClick={()=>{handleClick("Home")}}>Home</li>
          <li onClick={()=>{handleClick("About", true)}}>About</li>
          <li onClick={()=>{handleClick("Contact")}}>Contact</li>
        </ul>
      </div>
  )
}

export default Burger;
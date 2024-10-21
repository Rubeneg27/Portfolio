import { useDevice } from "../Context/DeviceContext.js";
import './Burger.css'

function Burger ({handleClick, isMenuOpen}) {

  const { isMobile } = useDevice();
  
  return (
      <div>
        <div className={isMenuOpen? "burger-hidden": isMobile ? "burgerMobile" : "burger" } onClick={handleClick} >
          <svg width="60px" height="60px">
            <rect></rect>
            <rect y="10"></rect>
            <rect y="20"></rect>
          </svg>
        </div>
      </div>
  )
}

export default Burger;
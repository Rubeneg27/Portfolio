function Burger ({isCollapsed, isMenuOpen, handleClick, toggleMenu}) {
  
  return (
    <div>
      {isCollapsed?
      <div>
        <div className={isMenuOpen? "burger-hidden": "burger" }onClick={toggleMenu} >
          <svg width="60px" height="60px">
            <rect></rect>
            <rect y="10"></rect>
            <rect y="20"></rect>
          </svg>
        </div>
        <ul className={isMenuOpen? "dropdown-menu" : "dropdown-menu-hidden"}>
          <li onClick={()=>{handleClick("Home")}}>Home</li>
          <li onClick={()=>{handleClick("About")}}>About</li>
          <li onClick={()=>{handleClick("Contact")}}>Contact</li>
        </ul>
      </div>
      : 
      <div className="burger-hidden"></div>
      }
    </div>
  )
}

export default Burger;
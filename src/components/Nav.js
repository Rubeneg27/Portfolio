import { useState } from "react";

function Nav (props) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  console.log(`is Nav collapsed?` + isCollapsed)
  const handleClick = () => {
    setIsCollapsed(!isCollapsed)
    props.onCollapseChange()
  }
  return (
    <div>
      <ul className={ isCollapsed ? "Nav-collapsed" : "Nav" } onClick={handleClick} >
      <li className={ isCollapsed ? "li-collapsed" : "li" } onClick={handleClick}>Home</li>
      <li className={ isCollapsed ? "li-collapsed" : "li" } onClick={handleClick}>About</li>
      <li className={ isCollapsed ? "li-collapsed" : "li" } onClick={handleClick}>Projects</li>
      <li className={ isCollapsed ? "li-collapsed" : "li" } onClick={handleClick}>Contact</li>
    </ul>
    </div>
    
  )
  
}

export default Nav;

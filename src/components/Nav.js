
import sprite_01 from "../Assets/sprite_01.png"

function Nav ({isCollapsed, handleClickHome, handleClickAbout, handleClickProjects, handleClickContact}) {
  return (
    <div className="sidebar">
      <ul className={ isCollapsed ? "Nav-collapsed" : "Nav" } >      
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={handleClickHome}>Home</li>
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={handleClickAbout}>About</li>
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={handleClickProjects}>Projects</li>
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={handleClickContact}>Contact</li>
      </ul>
        <img src={sprite_01} alt="sprite"/>
    </div>
      
  )
}

export default Nav;
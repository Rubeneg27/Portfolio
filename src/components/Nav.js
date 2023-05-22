import { useState } from "react";

function Nav ({onCollapseChange}) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [content, setContent] = useState(
    <div className="Home">Foto y descripción</div>
  )

  const handleClick = () => {
    setIsCollapsed(!isCollapsed)
    onCollapseChange()
  }

  const handleClickAbout = () => {
    setIsCollapsed(!isCollapsed)
    onCollapseChange()
    setContent(
      <div className="About">About</div>
    )
  }

  return (
    <div className="Hero">
      <ul className={ isCollapsed ? "Nav-collapsed" : "Nav" } onClick={handleClick}>
        <li className={ isCollapsed ? "li-collapsed" : "li" } onClick={handleClick}>Home</li>
        <li className={ isCollapsed ? "li-collapsed" : "li" } onClick={handleClickAbout}>About</li>
        <li className={ isCollapsed ? "li-collapsed" : "li" } onClick={handleClick}>Projects</li>
        <li className={ isCollapsed ? "li-collapsed" : "li" } onClick={handleClick}>Contact</li>
      </ul>
      <div className={isCollapsed? "article-expanded" : "article"}>{content}</div>
    </div>
    
  )
  
}

export default Nav;

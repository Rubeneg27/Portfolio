import Nav from "./Nav";

import { useState } from "react";

function Main ({unCollapse, collapse, setContent, content, setIsCollapsed, isCollapsed, isMenuOpen, setisMenuOpen}) { //All states managed by parent component App.js
  
  

  return (
    <main>
      <Nav></Nav>
      <div className={isCollapsed? "article-expanded" : "article"}>
        {isCollapsed&&!isMenuOpen ?
        <div className="burger" onClick={toggleMenu} >
          <svg width="60px" height="60px">
            <rect></rect>
            <rect y="10"></rect>
            <rect y="20"></rect>
          </svg>
        </div> 
        : isMenuOpen ? <ul className="dropdown-menu">
        <li onClick={handleClickHome}>Home</li>
        <li onClick={handleClickAboutBurger}>About</li>
        <li onClick={handleClickProjects}>Projects</li>
        <li onClick={handleClickContact}>Contact</li>
      </ul> : 
        <button className="burger-hidden"></button>}
        {content}
        </div>
    </main>
    
  )
  
}

export default Main;
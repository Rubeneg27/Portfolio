import Home from "./Home";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import { useState } from "react";

function Hero ({unCollapse, collapse, setContent, content, setIsCollapsed, isCollapsed, isMenuOpen, setisMenuOpen}) { //All states managed by parent component App.js
  
  const [backHome, setBackHome] = useState(false)

  const updateHome = (value) => {
    setBackHome(value)
  }

  const handleClickHome = () => {
    setisMenuOpen(false)
    setIsCollapsed(false)
    unCollapse()
    setContent(
      <Home></Home>
    )
  }
  const handleClickAbout = () => {
    setisMenuOpen(false)
    setIsCollapsed(true)
    collapse()
    setContent(
      <About backHome={backHome} updateHome={updateHome}></About>
    )
  }
  const handleClickProjects = () => {
    setisMenuOpen(false)
    setIsCollapsed(true)
    collapse()
    setContent(
      <Projects ></Projects>
    )
  }
  const handleClickContact = () => {
    unCollapse()
    setisMenuOpen(false)
    setIsCollapsed(false)
    setContent(
      <Contact></Contact>
    )
  }
  const handleClickAboutBurger = () => {
    setBackHome(true)
  }
  const toggleMenu = () => {
    setisMenuOpen(!isMenuOpen)
    console.log("Menu open")
  }

  return (
    <div className="Hero">
      <ul className={ isCollapsed ? "Nav-collapsed" : "Nav" } >
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={handleClickHome}>Home</li>
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={handleClickAbout}>About</li>
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={handleClickProjects}>Projects</li>
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={handleClickContact}>Contact</li>
      </ul>
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
    </div>
    
  )
  
}

export default Hero;
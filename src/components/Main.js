import Home from "./Home";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import Header from './Header';
import Nav from './Nav';

import { useState } from "react";

function Main () { 

  const [backHome, setBackHome] = useState(false)
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMenuOpen, setisMenuOpen] = useState(false)
  const [content, setContent] = useState(
    <Home></Home>
  )

  const collapse = () => { //Collapses hero's section
    setIsNavCollapsed(true);
  }
  const unCollapse = () => { //Uncollapses hero's section
    setIsNavCollapsed(false)
  }
  
  const updateContent = () => { 
    setContent(<Home></Home>) // update heros's section content to "Home" when clicking on "Ruben's site" in the Header component
    setIsCollapsed(false)
    setIsNavCollapsed(false)
    setisMenuOpen(false)
  }
  
  const handleClickBody = () => {
    if (isMenuOpen) {
      setisMenuOpen(false)
    }
  }
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
    <div className="Hero" onClick={handleClickBody}>
      <Header isNavCollapsed={isNavCollapsed} updateContent={updateContent}></Header>
      <div className="Hero-2">
        <Nav 
        isCollapsed={isCollapsed} 
        handleClickHome={handleClickHome} 
        handleClickAbout={handleClickAbout} 
        handleClickProjects={handleClickProjects} 
        handleClickContact={handleClickContact} 
        />
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
      
    </div>
    
  )
  
}

export default Main;
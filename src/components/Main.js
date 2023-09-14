import Home from "./Home";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import Header from './Header';
import Nav from './Nav';

import { useEffect, useState } from "react";

function Main () { 
  
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMenuOpen, setisMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [aboutClicked, setAboutClicked] = useState(false)
  const [content, setContent] = useState(
    "Home"
  )
  const [isGameClosed, setIsGameClosed] = useState(true)
  const [backHome, setBackHome] = useState(false)
  
  function handleCloseGame (e) {
    setIsGameClosed(e)
  }

  useEffect(() => {
    console.log(isGameClosed)
  }, [isGameClosed])
  
  ///Collapses hero's section///
  const collapse = () => { 
    setIsNavCollapsed(true);
  }
  ///Uncollapses hero's section///
  const unCollapse = () => { 
    setIsNavCollapsed(false)
  }
  
  useEffect(() => {
    setHidden(false)
    //setContent("Home") 
    setIsCollapsed(false)
    setIsNavCollapsed(false)
    setisMenuOpen(false)
    setContent(backHome)
  },[backHome])

  const updateContent = (e) => {
    setIsGameClosed(true)
    setBackHome(e)
  }
  
  const handleClickBody = () => {
    if (isMenuOpen) {
      setisMenuOpen(false)
    }
  }

  ///Will show/hide buttons in about/projects section
  const handleButtons = () => {
    setHidden(true)
    setAboutClicked(!aboutClicked)
  }

  const handleClick = (e) => {
    updateContent(e)
    setHidden(false)
    setisMenuOpen(false)
    setIsCollapsed(false)
    unCollapse()
  }

  const handleCollapse = (e) => {
    setHidden(false)
    setisMenuOpen(false)
    setIsCollapsed(e)
    collapse()
  }

  const toggleMenu = () => {
    setisMenuOpen(!isMenuOpen)
  }

  useEffect(()=>{
    if (hidden) {
      setHidden(false)
      setContent("About")
    } else {
      setContent(content)
    }
    
  },[aboutClicked])

  return (
    <main onClick={handleClickBody}>
      
      <Header isNavCollapsed={isNavCollapsed} updateContent={updateContent}></Header>
      <div className="main-section">
        <Nav 
        isNavCollapsed={isNavCollapsed}
        isCollapsed={isCollapsed}
        handleClickHome={()=>{handleClick("Home")}} 
        handleClickAbout={()=>{handleClick("About")}} 
        handleClickProjects={()=>{handleClick("Projects")}} 
        handleClickContact={()=>{handleClick("Contact")}}
        />
        <div className={isCollapsed? "article-expanded" : "article"}>
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
          {content === "Home"? <Home></Home> : null}
          {content === "Projects"? <Projects handleCloseGame={handleCloseGame} isGameClosed={isGameClosed} handleCollapse={handleCollapse}></Projects> : null}
          {content === "Contact"? <Contact></Contact> : null}
          {content === "About"? <About hidden={hidden} handleButtons={handleButtons}></About> : null}
          </div>
      </div>
      
    </main>
    
  )
  
}

export default Main;
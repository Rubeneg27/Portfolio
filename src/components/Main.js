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
  const [isGameClosed, setIsGameClosed] = useState(false)
  
  function handleCloseGame (e) {
    setIsGameClosed(e)
  }

  useEffect(() => {
    console.log(isGameClosed)
  }, [isGameClosed])
  
  const collapse = () => { //Collapses hero's section
    setIsNavCollapsed(true);
  }
  const unCollapse = () => { //Uncollapses hero's section
    setIsNavCollapsed(false)
  }
  
  const updateContent = () => {
    setIsGameClosed(true)
    setHidden(false)
    //setContent("Home") // update heros's section content to "Home" when clicking on "Ruben's site" in the Header component
    setIsCollapsed(false)
    setIsNavCollapsed(false)
    setisMenuOpen(false)
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

  const handleClickHome = () => {
    setHidden(false)
    setisMenuOpen(false)
    setIsCollapsed(false)
    unCollapse()
    setContent(
      "Home"
    )
  }


  const handleClickAbout = (e) => {
    setHidden(false)
    setisMenuOpen(false)
    setIsCollapsed(false)
    setContent(
      "About"
    )
  }

  const handleCollapse = (e) => {
    setHidden(false)
    setisMenuOpen(false)
    setIsCollapsed(e)
    collapse()
  }

    //Maneja el click de Projects en el dropdown-menu. Para arreglarlo hay que pasar más estados de Projects al componente main
  const handleClickProjects = () => {
    setHidden(false)
    setisMenuOpen(false)
    setIsCollapsed(false)
    setContent(
      "Projects"
    )
  }
  const handleClickContact = () => {
    setHidden(false)
    unCollapse()
    setisMenuOpen(false)
    setIsCollapsed(false)
    setContent(
      "Contact"
    )
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
        handleClickHome={handleClickHome} 
        handleClickAbout={handleClickAbout} 
        handleClickProjects={handleClickProjects} 
        handleClickContact={handleClickContact}
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
              <li onClick={handleClickHome}>Home</li>
              <li onClick={handleClickAbout}>About</li>
              <li onClick={handleClickContact}>Contact</li>
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
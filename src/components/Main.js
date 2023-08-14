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
  console.log(`hidden in main: ${hidden}`)
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
    setHidden(false)
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
      <Home></Home>
    )
  }
  const handleClickAbout = () => {
    setHidden(false)
    setisMenuOpen(false)
    setContent(
      <About hidden={hidden} handleButtons={handleButtons}></About> //Se tiene que renderizar cuando cambie hidden
    )
  }

  const handleCollapse = () => {
    setHidden(false)
    setisMenuOpen(false)
    setIsCollapsed(true)
    collapse()
  }

  const handleClickProjects = () => {
    setContent(
      <Projects handleCollapse={handleCollapse}></Projects>
    )
  }
  const handleClickContact = () => {
    setHidden(false)
    unCollapse()
    setisMenuOpen(false)
    setIsCollapsed(false)
    setContent(
      <Contact></Contact>
    )
  }

  const toggleMenu = () => {
    setisMenuOpen(!isMenuOpen)
  }

  useEffect(()=>{
    if (hidden) {
      setHidden(false)
      setContent(<About hidden={hidden} handleButtons={handleButtons}></About>)
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
          {isCollapsed&&!isMenuOpen ?
          <div className="burger" onClick={toggleMenu} >
            <svg width="60px" height="60px">
              <rect></rect>
              <rect y="10"></rect>
              <rect y="20"></rect>
            </svg>
          </div> 
          : isMenuOpen ? 
          <ul className="dropdown-menu">
            <li onClick={handleClickHome}>Home</li>
            <li onClick={handleClickAbout}>About</li>
            <li onClick={handleClickProjects}>Projects</li>
            <li onClick={handleClickContact}>Contact</li>
          </ul> : 
          <div className="burger-hidden"></div>}
          {content}
          </div>
      </div>
      
    </main>
    
  )
  
}

export default Main;
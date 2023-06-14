import Home from "./Home";
import Projects from "./Projects";
import Contact from "./Contact";
import Header from './Header';
import Nav from './Nav';
import Skills from "./About/Skills"
import Experience from "./About/Experience"
import Goals from "./About/Goals"
import { useEffect, useState } from "react";

function Main () { 
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMenuOpen, setisMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [about, setAbout] = useState("");
  const [content, setContent] = useState(
    <Home></Home>
  )
  useEffect(() => {
    function handleClick (elemento) {
      console.log(`hidden: ${hidden}`)
      setHidden(true)
      switch (elemento) {
        case "Formación":
          setAbout(<Skills></Skills>);
          break;
        case "Experiencia":
          setAbout(<Experience></Experience>);
          break;
        case "Objetivos":
          setAbout(<Goals></Goals>);
          break;
        default:
          setAbout("")
      }
    }
    setContent(
      <section className="about">
        <button hidden={hidden} onClick={()=>handleClick("Formación")}>Formación</button>
        <button hidden={hidden} onClick={()=>handleClick("Experiencia")}>Experiencia</button>
        <button hidden={hidden} onClick={()=>handleClick("Objetivos")}>Objetivos</button>
        {hidden? about : null}
      </section>
    )
  }, [hidden, about])
  

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

  const handleClickHome = () => {
    setisMenuOpen(false)
    setIsCollapsed(false)
    unCollapse()
    setContent(
      <Home></Home>
    )
  }
  
  
  function handleClick (elemento) {
    console.log(`hidden: ${hidden}`)
    setHidden(true)
    switch (elemento) {
      case "Formación":
        setAbout(<Skills></Skills>);
        break;
      case "Experiencia":
        setAbout(<Experience></Experience>);
        break;
      case "Objetivos":
        setAbout(<Goals></Goals>);
        break;
      default:
        setAbout("")
    }
  }

  const handleClickAbout = () => {
    setisMenuOpen(false)
    setIsCollapsed(true)
    setHidden(false)
    collapse()
    setContent(
      <section className="about">
        <button hidden={hidden} onClick={()=>handleClick("Formación")}>Formación</button>
        <button hidden={hidden} onClick={()=>handleClick("Experiencia")}>Experiencia</button>
        <button hidden={hidden} onClick={()=>handleClick("Objetivos")}>Objetivos</button>
        {hidden? about : null}
      </section>
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

  const toggleMenu = () => {
    setisMenuOpen(!isMenuOpen)
  }

  return (
    <main onClick={handleClickBody}>
      <Header isNavCollapsed={isNavCollapsed} updateContent={updateContent}></Header>
      <div className="main-section">
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
          <li onClick={handleClickAbout}>About</li>
          <li onClick={handleClickProjects}>Projects</li>
          <li onClick={handleClickContact}>Contact</li>
        </ul> : 
          <button className="burger-hidden"></button>}
          {content}
          </div>
      </div>
      
    </main>
    
  )
  
}

export default Main;
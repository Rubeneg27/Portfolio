import Home from "./Home";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";

function Hero ({unCollapse, collapse, setContent, content, setIsCollapsed, isCollapsed, isMenuOpen, setisMenuOpen}) { //All states managed by parent component App.js

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
      <About></About>
    )
  }
  const handleClickProjects = () => {
    setisMenuOpen(false)
    setIsCollapsed(true)
    collapse()
    setContent(
      <Projects></Projects>
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
    console.log("Menu open")
  }

  return (
    <div className="Hero">
      {isMenuOpen ? <ul className="dropdown-menu">
        <li onClick={handleClickHome}>Home</li>
        <li onClick={handleClickAbout}>About</li>
        <li onClick={handleClickProjects}>Projects</li>
        <li onClick={handleClickContact}>Contact</li>
      </ul> : <ul className="dropdown-menu-closed"></ul>}
      <ul className={ isCollapsed ? "Nav-collapsed" : "Nav" } >
        {isMenuOpen ? null : (isCollapsed ? <button onClick={toggleMenu} className="burger">H</button> : null)}
        <li className={ isMenuOpen ? "" : (isCollapsed ? "li-collapsed" : "li") } onClick={handleClickHome}>Home</li>
        <li className={ isMenuOpen ? "" : (isCollapsed ? "li-collapsed" : "li") } onClick={handleClickAbout}>About</li>
        <li className={ isMenuOpen ? "" : (isCollapsed ? "li-collapsed" : "li") } onClick={handleClickProjects}>Projects</li>
        <li className={ isMenuOpen ? "" : (isCollapsed ? "li-collapsed" : "li") } onClick={handleClickContact}>Contact</li>
      </ul>
      <div className={isCollapsed? "article-expanded" : "article"}>{content}</div>
      
    </div>
    
  )
  
}

export default Hero;

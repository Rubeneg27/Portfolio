import './Article.css'

import Home from "../Home/Home";
import About from "../About/About";
import Projects from "../Projects/Projects.js";
import Contact from "../Contact/Contact";
import Burger from "../Burger/Burger";
import Header from "../Header/Header";
import { useDevice } from "../Context/DeviceContext.js";


function Article ({content, isCollapsed, handleClick, isMenuOpen, toggleMenu, handleCloseGame, isGameClosed, handleCollapse, showButtons, setShowButtons}) {

  const { isMobile } = useDevice();
  
  return (
    <div className={isCollapsed? "article-expanded" : "article"}>
    <Header></Header>
    <Burger isCollapsed={isCollapsed} isMenuOpen={isMenuOpen} handleClick={handleClick} toggleMenu={toggleMenu}></Burger>
    {content === "Home"? <Home></Home> : null}
    {content === "Projects"? <Projects handleCloseGame={handleCloseGame} isGameClosed={isGameClosed} handleCollapse={handleCollapse}></Projects> : null}
    {content === "Contact"? <Contact></Contact> : null}
    {content === "About"? <About showButtons={showButtons} setShowButtons={setShowButtons}></About> : null}
  </div>
  )
}

export default Article;
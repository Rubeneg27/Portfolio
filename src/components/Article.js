import Home from "./Home";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import Burger from "./Burger";
import { useDevice } from "./Context/DeviceContext.js";


function Article ({content, isCollapsed, handleClick, isMenuOpen, toggleMenu, handleCloseGame, isGameClosed, handleCollapse, showButtons, setShowButtons}) {

  const { isMobile } = useDevice();
  
  return (
    <div className={isCollapsed? "article-expanded" : "article"}>
    <Burger isCollapsed={isCollapsed} isMenuOpen={isMenuOpen} handleClick={handleClick} toggleMenu={toggleMenu}></Burger>
    {content === "Home"? <Home></Home> : null}
    {content === "Projects"? <Projects handleCloseGame={handleCloseGame} isGameClosed={isGameClosed} handleCollapse={handleCollapse}></Projects> : null}
    {content === "Contact"? <Contact></Contact> : null}
    {content === "About"? <About showButtons={showButtons} setShowButtons={setShowButtons}></About> : null}
  </div>
  )
}

export default Article;
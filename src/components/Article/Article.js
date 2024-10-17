import './Article.css'
import Home from "../Home/Home";
import About from "../About/About";
import Projects from "../Projects/Projects.js";
import Contact from "../Contact/Contact";
import Header from "../Header/Header";
import techIcons from "../../Assets/techIcons.js"
import socialIcons from "../../Assets/socialIcons.js"
import { useDevice } from "../Context/DeviceContext.js";


function Article ({content, isCollapsed, handleCloseGame, isGameClosed, handleCollapse, showButtons, setShowButtons}) {

  const { isMobile } = useDevice();
  
  return (
    <div className={isCollapsed? "article-expanded" : isMobile? "article-mobile" : "article"}>
    <Header icons={techIcons}></Header>
    {content === "Home"? <Home></Home> : null}
    {content === "Projects"? <Projects handleCloseGame={handleCloseGame} isGameClosed={isGameClosed} handleCollapse={handleCollapse}></Projects> : null}
    {content === "Contact"? <Contact></Contact> : null}
    {content === "About"? <About showButtons={showButtons} setShowButtons={setShowButtons}></About> : null}
    <Header icons={socialIcons}></Header>
  </div>
  )
}

export default Article;
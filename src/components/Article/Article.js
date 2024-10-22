import './Article.css'
import Home from "../Home/Home";
import About from "../About/About";
import Projects from "../Projects/Projects.js";
import Contact from "../Contact/Contact";
import Header from "../Header/Header";
import ImgGallery from "../ImgGallery/ImgGallery.js"
import techIcons from "../../Assets/techIcons.js"
import socialIcons from "../../Assets/socialIcons.js"
import { useDevice } from "../Context/DeviceContext.js";


function Article ({handleIsGameClosed, content, isCollapsed, isGameClosed, handleCollapse, showButtons, setShowButtons}) {

  const { isMobile } = useDevice();
  
  return (
    <div className={isCollapsed? "article-expanded" : isMobile? "article-mobile" : "article"}>
    <Header  icons={socialIcons}></Header>
      {content === "Home"? <Home></Home> : null}
      {content === "GamingHub"? <Projects handleIsGameClosed={handleIsGameClosed} isGameClosed={isGameClosed} handleCollapse={handleCollapse}></Projects> : null}
      {content === "ImgGallery"? <ImgGallery handleIsGameClosed={handleIsGameClosed} handleCollapse={handleCollapse}></ImgGallery> : null}
      {content === "Contact"? <Contact></Contact> : null}
      {content === "About"? <About showButtons={showButtons} setShowButtons={setShowButtons}></About> : null}
      {isMobile ? null : isCollapsed ? null : <Header flexDirection = 'row-reverse' icons={techIcons}></Header>}
  </div>
  )
}

export default Article;
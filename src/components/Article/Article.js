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


function Article ({content, isCollapsed, handleCloseGame, isGameClosed, handleCollapse, showButtons, setShowButtons}) {

  const { isMobile } = useDevice();
  
  return (
    <div className={isCollapsed? "article-expanded" : isMobile? "article-mobile" : "article"}>
    <Header  icons={socialIcons}></Header>
      <Home content={content}></Home>
      <Projects content={content} handleCloseGame={handleCloseGame} isGameClosed={isGameClosed} handleCollapse={handleCollapse}></Projects>
      {content === "ImgGallery"? <ImgGallery handleCloseGame={handleCloseGame} handleCollapse={handleCollapse}></ImgGallery> : null}
      {content === "Contact"? <Contact></Contact> : null}
      <About content={content} showButtons={showButtons} setShowButtons={setShowButtons}></About>
      {isMobile ? null : isCollapsed ? null : <Header flexDirection = 'row-reverse' icons={techIcons}></Header>}
  </div>
  )
}

export default Article;
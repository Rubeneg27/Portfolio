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

  const contentMap = {
    "Home": <Home />,
    "GamingHub": <Projects handleIsGameClosed={handleIsGameClosed} isGameClosed={isGameClosed} handleCollapse={handleCollapse} />,
    "ImgGallery": <ImgGallery handleIsGameClosed={handleIsGameClosed} handleCollapse={handleCollapse} />,
    "Contact": <Contact />,
    "About": <About showButtons={showButtons} setShowButtons={setShowButtons} />
  };
  
  return (
    <div className={isCollapsed? "article-expanded" : isMobile? "article-mobile" : "article"}>
    <Header  icons={socialIcons}></Header>
    {contentMap[content] || null}
    {isMobile ? null : isCollapsed ? null : <Header flexDirection = 'row-reverse' icons={techIcons}></Header>}
  </div>
  )
}

export default Article;
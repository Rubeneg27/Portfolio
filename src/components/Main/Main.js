import './Main.css'
import Nav from '../Nav/Nav.js';
import Burger from '../Burger/Burger.js'
import Article from "../Article/Article.js";
import { useDevice } from "../Context/DeviceContext.js";

import { useEffect, useState } from "react";

function Main() {

  const { isMobile } = useDevice();

  //Agrupar aquí todos los estados
  const [pageStatus, setPageStatus] = useState ({
  isGameClosed:true,
  path:"",
  showButtons:true,
  isCollapsed:false,
  isMenuOpen:false,
  content:"Home",
  })

  const [isGameClosed, setIsGameClosed] = useState(true)
  const [showButtons, setShowButtons] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isNavHidden, setIsNavHidden] = useState(false)
  const [content, setContent] = useState(
    "Home"
  )

  ///Se llamará al hacer click en los botones del Nav y el DropdownMenu.///
  ///PARÁMETROS///
  ///element: recibirá y pasará a updateContent el content a renderizar///
  const HandleClick = (element, showButton, willCollaps) => {
    setIsGameClosed(true)
    setShowButtons(showButton)
    setContent(element)
    setIsCollapsed(willCollaps)
  };

  ///Renderizará el contenido correspondiente en el primer renderizado del compomente.///
  useEffect(() => {
    setContent(content)
    setIsCollapsed(isCollapsed)
    if (isMobile) {
      setIsNavHidden(true)
    }
  }, [content, isCollapsed, isMobile])

  return (
    <main className={isMobile ? "mainMobile" : isCollapsed ? "main-expanded" : "main"}>
      <div className={isMobile? "mainSectionMobile" : isCollapsed ? "main-section-expanded" : "main-section"} >
        
        {isMobile ? 
        <Burger
        handleClick={()=>{setIsNavHidden(!isNavHidden)}}
        ></Burger> : 
        null
        }
        <Nav 
        isNavHidden={isNavHidden}
        NavHandleClick={HandleClick}
        />
        <Article 
        handleIsGameClosed={setIsGameClosed}
        content={content} 
        isCollapsed={isCollapsed} 
        isGameClosed={isGameClosed} 
        handleCollapse={setIsCollapsed} 
        showButtons={showButtons}
        setShowButtons={setShowButtons}></Article>
      </div>
    </main>
  )
  
}

export default Main;
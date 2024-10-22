import './Main.css'
import Nav from '../Nav/Nav.js';
import Burger from '../Burger/Burger.js'
import Article from "../Article/Article.js";
import { useDevice } from "../Context/DeviceContext.js";

import { useEffect, useState } from "react";

function Main() {

  const { isMobile } = useDevice();

  //Agrupar aquí todos los estados
  // const [pageStatus, setPageStatus] = useState ({
  //   isGameClosed:true,
  //   path:"",
  //   showButtons:true,
  //   isCollapsed:false,
  //   isMenuOpen:false,
  //   content:"Home",
  // })

  const [isGameClosed, setIsGameClosed] = useState(true)
  const [path, setPath] = useState("")
  const [showButtons, setShowButtons] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isNavHidden, setIsNavHidden] = useState(false)
  const [isMenuOpen, setisMenuOpen] = useState(false)
  const [content, setContent] = useState(
    "Home"
  )

  ///Define el estado del booleano isGameClosed para cerrar o no los juegos de "Projects"
  function handleCloseGame () {
    setIsGameClosed(true)
  }

  function InitGame() {
    setIsGameClosed(false)
  }

  //Muestra el navegador versión mobile
  const HandleClickBurger = () => {
    setIsNavHidden(!isNavHidden);
    console.log(isNavHidden);
  }

  ///Cerrará el juego en ejecución y marcará que contenido se deberá renderizar posteriormente en el efecto///
  ///PARAMETROS///
  ///e = recibirá el contenido que se tiene que renderizar///
  const updateContent = (e) => {
    setIsGameClosed(true)
    setPath(e)
  }
  
  ///Asegura que content cambie después que setIsGameClosed se ejecute y los juegos en projects puedan terminar los procesos en ejecución///
  useEffect(() => {
    setIsCollapsed(false)
    setisMenuOpen(false)
    setContent(path)
  },[path])

  ///Cerrará el menú drop-down al hacer click en el cuerpo del documento.///
  const handleClickBody = () => {
    if (isMenuOpen) {
      setisMenuOpen(false)
    }
  }

  ////Maneja el colapso del Nav.///
  ///PARÁMETROS///
  ///e: recibirá y pasará el estado booleano a isCollapsed.///
  const handleCollapse = (e) => {
    setisMenuOpen(false)
    setIsCollapsed(e)
  }

    ///Se llamará al hacer click en los botones del Nav y el DropdownMenu.///
  ///PARÁMETROS///
  ///element: recibirá y pasará a updateContent el content a renderizar///
  const HandleClick = (element, showButton, willCollaps) => {
    setIsGameClosed(true)
    setShowButtons(showButton)
    setContent(element)
    setisMenuOpen(false)
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

  /*
  ///Comprobará que el juego se cierra correctamente en este componente.///
  useEffect(() => {
    console.log(isGameClosed)
  }, [isGameClosed])
  */

  return (
    <main className={isMobile ? "mainMobile" : isCollapsed ? "main-expanded" : "main"} onClick={handleClickBody}>
      <div className={isMobile? "mainSectionMobile" : isCollapsed ? "main-section-expanded" : "main-section"} >
        
        {isMobile ? 
        <Burger
        handleClick={HandleClickBurger}
        ></Burger> : 
        null
        }
        <Nav 
        isNavHidden={isNavHidden}
        NavHandleClick={HandleClick}
        />
        <Article 
        content={content} 
        isCollapsed={isCollapsed}
        isMenuOpen={isMenuOpen} 
        handleCloseGame={handleCloseGame} 
        isGameClosed={isGameClosed} 
        handleCollapse={handleCollapse} 
        showButtons={showButtons}
        initGame={InitGame}
        setShowButtons={setShowButtons}></Article>
      </div>
    </main>
  )
  
}

export default Main;
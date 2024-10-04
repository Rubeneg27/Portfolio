import './Main.css'

import Header from '../Header/Header.js';
import Nav from '../Nav/Nav.js';
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
  const [isMenuOpen, setisMenuOpen] = useState(false)
  const [content, setContent] = useState(
    "Home"
  )

  ///Define el estado del booleano isGameClosed para cerrar o no los juegos de "Projects"
  function handleCloseGame (e) {
    setIsGameClosed(e)
  }

  ///Se llamará al hacer click en los botones del Nav y el DropdownMenu.///
  ///PARÁMETROS///
  ///e: recibirá y pasará a updateContent el content a renderizar.///
  const handleClick = (e, showButton) => {
    setShowButtons(showButton)
    updateContent(e)
    setisMenuOpen(false)
    setIsCollapsed(false)
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

  ///Cambiará el estado booleano isMenuOpen.///
  const toggleMenu = () => {
    setisMenuOpen(!isMenuOpen)
  }

  ///Renderizará el contenido correspondiente en el primer renderizado del compomente.///
  useEffect(() => {
    setContent(content)
  }, [content])

  /*
  ///Comprobará que el juego se cierra correctamente en este componente.///
  useEffect(() => {
    console.log(isGameClosed)
  }, [isGameClosed])
  */
 
  return (
    <main className={isMobile ? "mainMobile" : "main"} onClick={handleClickBody}>
      <div className={isMobile? "mainSectionMobile" : "main-section"} >
        <iframe></iframe>
        <Nav 
        isCollapsed={isCollapsed}
        handleClickHome={()=>{handleClick("Home", false)}} 
        handleClickAbout={()=>{handleClick("About", true)}} 
        handleClickProjects={()=>{handleClick("Projects", false)}} 
        handleClickContact={()=>{handleClick("Contact", false)}}
        />
        <Article 
        content={content} 
        isCollapsed={isCollapsed} 
        handleClick={handleClick} 
        isMenuOpen={isMenuOpen} 
        toggleMenu={toggleMenu} 
        handleCloseGame={handleCloseGame} 
        isGameClosed={isGameClosed} 
        handleCollapse={handleCollapse} 
        showButtons={showButtons} 
        setShowButtons={setShowButtons}></Article>
      </div>
    </main>
  )
  
}

export default Main;
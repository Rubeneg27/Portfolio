import Home from "./Home";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import Burger from "./Burger";

import { useEffect, useState } from "react";

function Article ({isCollapsed, handleClick}) {

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

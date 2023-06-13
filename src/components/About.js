import Skills from "./About/Skills"
import Experience from "./About/Experience"
import Goals from "./About/Goals"
import { useState } from "react";

function About ({backHome, updateHome}) {
  const [content, setContent] = useState("");
  const [clicked, setClicked] = useState(false)
  
  function handleClick (elemento) {
    switch (elemento) {
      case "Formación":
        updateHome(false)
        setContent(<Skills></Skills>);
        setClicked(true)
        break;
      case "Experiencia":
        updateHome(false)
        setContent(<Experience></Experience>);
        setClicked(true)
        break;
      case "Objetivos":
        updateHome(false)
        setContent(<Goals></Goals>);
        setClicked(true)
        break;
      case "back":
        updateHome(false)
        setContent("")
        setClicked(false)
        break;
      default:
        setContent("")
    }
  }

  return (
    
    <section className="about">
      {backHome? "true" : "false"}
      <button hidden={backHome? false : clicked? true : false} onClick={()=>handleClick("Formación")}>Formación</button>
      <button hidden={backHome? false : clicked? true : false} onClick={()=>handleClick("Experiencia")}>Experiencia</button>
      <button hidden={backHome? false : clicked? true : false} onClick={()=>handleClick("Objetivos")}>Objetivos</button>
      {backHome? null : content}
    </section>
  )
  
}

export default About;
import Skills from "./About/Skills"
import Experience from "./About/Experience"
import Goals from "./About/Goals"
import { useEffect, useState } from "react";

const About = ({ hidden, handleAbout }) => {
  const [content, setContent] = useState("");

  function handleClick (elemento) {
    console.log(`hidden About: ${hidden}`)
    handleAbout()
    switch (elemento) {
      case "Formación":
        setContent(<Skills></Skills>);
        break;
      case "Experiencia":
        setContent(<Experience></Experience>);
        break;
      case "Objetivos":
        setContent(<Goals></Goals>);
        break;
      default:
        setContent("")
    }
  }

  return (
    <section className="about">
      <button hidden={hidden} onClick={()=>handleClick("Formación")}>Formación</button>
      <button hidden={hidden} onClick={()=>handleClick("Experiencia")}>Experiencia</button>
      <button hidden={hidden} onClick={()=>handleClick("Objetivos")}>Objetivos</button>
      {hidden? content : null}
    </section>
  )
  
}

export default About;
import Skills from "./About/Skills"
import Experience from "./About/Experience"
import Goals from "./About/Goals"
import { useEffect, useState } from "react";

const About = ({ hidden, handleAbout }) => {
  const [content, setContent] = useState("");
  const [isHidden, setIsHidden] = useState("")
  useEffect(() => {
    setContent(content)
    setIsHidden(hidden)
  },[content, hidden])
  
  function handleClick (elemento) {
    console.log(`hidden: ${hidden}`)
    handleAbout(true)
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
      <button hidden={isHidden} onClick={()=>handleClick("Formación")}>Formación</button>
      <button hidden={isHidden} onClick={()=>handleClick("Experiencia")}>Experiencia</button>
      <button hidden={isHidden} onClick={()=>handleClick("Objetivos")}>Objetivos</button>
      {isHidden? content : null}
    </section>
  )
  
}

export default About;
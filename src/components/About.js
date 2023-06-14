import Skills from "./About/Skills"
import Experience from "./About/Experience"
import Goals from "./About/Goals"
import { useEffect, useState } from "react";

function About ({clicked}) {
  const [content, setContent] = useState("");
  const [hide, setHide] = useState(true)
  console.log(`hide:${hide}`)
  useEffect(()=> {
    setHide(clicked)
  }, [clicked])

  function handleClick (elemento) {
    switch (elemento) {
      case "Formación":
        setHide(true)
        setContent(<Skills></Skills>);
        
        break;
      case "Experiencia":
        setHide(true)
        setContent(<Experience></Experience>);

        break;
      case "Objetivos":
        setHide(true)
        setContent(<Goals></Goals>);
        break;
      default:
        setContent("")
    }
  }

  return (
    <section className="about">
      <button hidden={hide} onClick={()=>handleClick("Formación")}>Formación</button>
      <button hidden={hide} onClick={()=>handleClick("Experiencia")}>Experiencia</button>
      <button hidden={hide} onClick={()=>handleClick("Objetivos")}>Objetivos</button>
      {hide? content : null}
    </section>
  )
  
}

export default About;
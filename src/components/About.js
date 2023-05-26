import Skills from "./About/Skills"
import Experience from "./About/Experience"
import Goals from "./About/Goals"
import { useState } from "react";

function About () {
  const [about, setAbout] = useState("");

  function handleClick (elemento) {
    switch (elemento) {
      case "Formación":
        setAbout(<Skills></Skills>);
        break;
      case "Experiencia":
        setAbout(<Experience></Experience>);
        break;
      case "Objetivos":
        setAbout(<Goals></Goals>);
        break;
      default:
        setAbout("")
    }
  }

  return (
    
    <section className="about">
      <button onClick={()=>handleClick("Formación")}>Formación</button>
      <button onClick={()=>handleClick("Experiencia")}>Experiencia</button>
      <button onClick={()=>handleClick("Objetivos")}>Objetivos</button>
      {about}
    </section>
  )
  
}

export default About;
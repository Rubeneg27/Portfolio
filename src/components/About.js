import Skills from "./About/Skills"
import Experience from "./About/Experience"
import { useState } from "react";

const About = ({ hidden, handleButtons }) => {
  const [content, setContent] = useState("");

  function handleClick (elemento) {
    handleButtons()
    switch (elemento) {
      case "Formación":
        setContent(<Skills></Skills>);
        break;
      case "Experiencia":
        setContent(<Experience></Experience>);
        break;
      default:
        setContent("")
    }
  }

  return (
    <section className="about">
          {hidden ? null : 
            <section className="button-container">
              <button  onClick={()=>handleClick("Formación")}>Formación</button>
              <button  onClick={()=>handleClick("Experiencia")}>Experiencia</button>
            </section>}
          {hidden? content : null}
    </section>
  )
  
}

export default About;
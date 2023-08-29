import Skills from "./About/Skills"
import Experience from "./About/Experience"
import { useState } from "react";

const About = ({ hidden, handleButtons }) => {
  const [content, setContent] = useState("");
  const [buttonPressed, setButtonPressed] = useState("")

  function handleClick (elemento) {
    handleButtons()
    switch (elemento) {
      case "Formación":
        setContent(<Skills></Skills>);
        setButtonPressed("skills")
        break;
      case "Experiencia":
        setContent(<Experience></Experience>);
        setButtonPressed("exp")
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
          <button hidden={hidden?  false : true} className="skills-exp">{buttonPressed==="skills"? "Experiencie >" : buttonPressed==="exp"? "Skills >" : ""}</button>
    </section>
  )
  
}

export default About;
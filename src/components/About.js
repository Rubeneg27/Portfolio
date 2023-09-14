import Skills from "./About/Skills"
import Experience from "./About/Experience"
import { useEffect, useState } from "react";

const About = ({ hidden, handleButtons }) => {
  const [content, setContent] = useState("");
  const [buttonPressed, setButtonPressed] = useState("")

  useEffect(() => {
    console.log("hidden")
  }, [hidden])

  function handleClick (e) {
    handleButtons()
    switch (e) {
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
          <div>
            <section className="button-container">
              <button  onClick={()=>handleClick("Formación")}>Training</button>
              <div className="resume">Un resumen de mi formación académica</div>
            </section>
            <section className="button-container">
              <button  onClick={()=>handleClick("Experiencia")}>Experience</button>
              <div className="resume">Resumen de mi experiencia profesional</div>
            </section>
          </div>
            }
          {hidden? content : null}
          <button 
          hidden={hidden?  false : true} 
          className={buttonPressed==="skills"? "toExpButton >" : buttonPressed==="exp"? "toSkillsButton >" : ""}
          onClick={buttonPressed==="skills"? ()=>handleClick("Experiencia") : buttonPressed==="exp"? ()=>handleClick("Formación") : ""}
          >
            {buttonPressed==="skills"? "Experiencie >" : buttonPressed==="exp"? "Skills >" : ""}
          </button>
    </section>
  )
  
}

export default About;
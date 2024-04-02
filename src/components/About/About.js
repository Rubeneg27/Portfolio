import Skills from "./Skills.js"
import Experience from "./Experience.js"
import { useEffect, useState } from "react";
import { useDevice } from "../Context/DeviceContext.js";

const About = ({showButtons, setShowButtons}) => {

  const { isMobile } = useDevice();

  const [content, setContent] = useState("");
  const [buttonPressed, setButtonPressed] = useState("")
  const [hidden, setHidden] = useState(false)

  useEffect(()=> {
    if (showButtons) {
      setHidden(false)
      console.log(showButtons)
    } else {
      setHidden(true)
    }
  }, [showButtons])

  function handleClick (e) {
    setHidden(true)
    setShowButtons(false)
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
    <section className={isMobile ? "aboutMobile" : "about"} >
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
import Skills from "./Skills.js"
import Experience from "./Experience.js"
import './css/About.css'
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
              <section className="button-container" onClick={()=>handleClick("Formación")}>
                <button>Training</button>
                <div className="resume dashCard">Achademic background<br></br>Certificates<br></br>Skills<br></br>Softskills</div>
              </section>
              <section className="button-container" onClick={()=>handleClick("Experiencia")}>
                <button>Experience</button>
                <div className="resume dashCard">Profesional experiencie</div>
              </section>
            </div>
          }
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            {hidden? content : null}
            <button 
            hidden={hidden?  false : true} 
            className="custombtn"
            onClick={buttonPressed==="skills"? ()=>handleClick("Experiencia") : buttonPressed==="exp"? ()=>handleClick("Formación") : ""}
            >
              {buttonPressed==="skills"? ">" : buttonPressed==="exp"? ">" : ""}
            </button>
          </div>

    </section>
  )
  
}

export default About;
import Skills from "./Skills.js"
import Experience from "./Experience.js"
import './css/About.css'
import { useEffect, useState } from "react";
import { useDevice } from "../Context/DeviceContext.js";

const About = ({showButtons, setShowButtons, content}) => {

  const { isMobile } = useDevice();

  const [projectContent, setProjectContent] = useState("");
  const [buttonPressed, setButtonPressed] = useState("")
  const [hidden, setHidden] = useState(false)
  const [pressed, setPressed] = useState(false);

  useEffect(()=>{setPressed(!showButtons)}, [showButtons])

  function handleClick (e) {
    setPressed(true)
    setHidden(true)
    setShowButtons(false)
    switch (e) {
      case "Formación":
        setProjectContent(<Skills></Skills>);
        setButtonPressed("skills")
        break;
      case "Experiencia":
        setProjectContent(<Experience></Experience>);
        setButtonPressed("exp")
        break;
      default:
        setProjectContent("")
    }
  }

  return (
    <section className={isMobile ? "aboutMobile" : showButtons && content === "About" ? "about" : content === "About" ? "about-height-100" : "height-0"} >
          {pressed ? null : 
            <div className="button-groups" style={content==="About" ? {
              height:'auto'} : {display:'none'}}>
              <section className="button-container" >
                {pressed ? null : <button onClick={()=>handleClick("Formación")}>Training</button>}
                <div style={{padding: '0 1vw'}} className={content === "About" ? "resume dashCard" : "height-0"}>
                  <p className="popUpText">Achademic background</p>
                  <p className="popUpText">Certificates</p>
                  <p className="popUpText">Skills and Softskills</p>
                </div>
              </section>
              <section className="button-container" >
                {pressed ? null : <button onClick={()=>handleClick("Experiencia")}>Experience</button>}
                <div style={{padding: '0 1vw'}} className="resume dashCard">
                  <p className="popUpText">Professional background</p>
                  <p className="popUpText">Personal projects</p>
                </div>
              </section>
            </div>
          }
          <div style={isMobile ? null : { display: 'flex', justifyContent: 'space-between'}}>
            {hidden? projectContent : null}
            <button 
            hidden={hidden?  false : true} 
            className= {isMobile ? "custombtn-mobile" : "custombtn"}
            onClick={buttonPressed==="skills"? ()=>handleClick("Experiencia") : buttonPressed==="exp"? ()=>handleClick("Formación") : ""}
            >
              {buttonPressed==="skills"? ">" : buttonPressed==="exp"? ">" : ""}
            </button>
          </div>

    </section>
  )
  
}

export default About;
import Skills from "./Skills.js"
import Experience from "./Experience.js"
import './css/About.css'
import { useEffect, useState, useRef } from "react";
import { useDevice } from "../Context/DeviceContext.js";

const About = ({showButtons, setShowButtons}) => {

  const { isMobile } = useDevice();

  const [content, setContent] = useState("");
  const [buttonPressed, setButtonPressed] = useState("")
  const [hidden, setHidden] = useState(false)
  const [pressed, setPressed] = useState(false);

  // Refs para los componentes hijos
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);


  useEffect(()=> {
    if (showButtons) {
      setHidden(false)
      console.log(showButtons)
    } else {
      setHidden(true)
    }
  }, [showButtons])


  useEffect(()=>{setPressed(!showButtons)}, [showButtons])

  function handleClick(e) {
    setPressed(true)
    setHidden(true);
    setShowButtons(false);
    switch (e) {
        case "Formación":
            setContent(<Skills ref={skillsRef}/>);
            setButtonPressed("skills");
            break;
        case "Experiencia":
            setContent(<Experience ref={experienceRef}/>);
            setButtonPressed("exp");
            break;
        default:
            setContent("");
    }
  }

  const handleScrollDown = () => {
    if (buttonPressed === "skills" && skillsRef.current) {
        skillsRef.current.scrollBy({ top: 300, behavior: 'smooth' });
    } else if (buttonPressed === "exp" && experienceRef.current) {
        experienceRef.current.scrollBy({ top: 300, behavior: 'smooth' });
    }
  };

  const handleScrollTop = () => {
    if (buttonPressed === "skills" && skillsRef.current) {
        skillsRef.current.scrollBy({ top: -300, behavior: 'smooth' });
    } else if (buttonPressed === "exp" && experienceRef.current) {
        experienceRef.current.scrollBy({ top: -300, behavior: 'smooth' });
    }
  };

  return (
    <section className={isMobile ? "aboutMobile" : showButtons? "about" : "about-height-100"} >
          {hidden ? null : 
            <div>
              <section className="button-container" onClick={()=>handleClick("Formación")}>
                <button>Training</button>
                <div style={{padding: '0 1vw'}} className="resume dashCard">
                  <p className="popUpText">Achademic background</p>
                  <p className="popUpText">Certificates</p>
                  <p className="popUpText">Skills and Softskills</p>
                </div>
              </section>
              <section className="button-container" onClick={()=>handleClick("Experiencia")}>
                <button>Experience</button>
                <div style={{padding: '0 1vw'}} className="resume dashCard">
                  <p className="popUpText">Professional background</p>
                  <p className="popUpText">Personal projects</p>
                </div>
              </section>
            </div>
          }
          <div style={isMobile ? null : { display: 'flex', justifyContent: 'space-between'}}>
            {hidden? content : null}
            {isMobile ?  <button 
              hidden={hidden?  false : true} 
              className= {isMobile ? "custombtn-mobile" : "custombtn"}
              onClick={buttonPressed==="skills"? ()=>handleClick("Experiencia") : buttonPressed==="exp"? ()=>handleClick("Formación") : ""}
              >
                {buttonPressed==="skills"? ">" : buttonPressed==="exp"? ">" : ""}
              </button> :
              <div className="about-content-buttons-container">
              <button className="go-up-button" onClick={handleScrollTop}></button>
              <button 
              hidden={hidden?  false : true} 
              className= {isMobile ? "custombtn-mobile" : "custombtn"}
              onClick={buttonPressed==="skills"? ()=>handleClick("Experiencia") : buttonPressed==="exp"? ()=>handleClick("Formación") : ""}
              >
                {buttonPressed==="skills"? ">" : buttonPressed==="exp"? ">" : ""}
              </button>
              <button className="go-down-button" onClick={handleScrollDown}></button>
            </div>
            }
          </div>

    </section>
  )
  
}

export default About;
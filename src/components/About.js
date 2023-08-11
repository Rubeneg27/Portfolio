import Skills from "./About/Skills"
import Experience from "./About/Experience"
import { useState } from "react";

const About = ({ hidden, handleAbout }) => {
  const [content, setContent] = useState("");
  const [pressed, setPressed] = useState(false);

  function handleClick (elemento) {
    setPressed(true)
    handleAbout()
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
          {pressed ? null : 
            <section className="button-container">
              <button hidden={hidden} onClick={()=>handleClick("Formación")}>Formación</button>
              <button hidden={hidden} onClick={()=>handleClick("Experiencia")}>Experiencia</button>
            </section>}
            {hidden? content : null}
        </section>
  )
  
}

export default About;
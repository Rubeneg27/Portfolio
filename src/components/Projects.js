import Platformer from "./Projects/Platformer.js"
import { useState } from "react";

function Projects () {

  const [project, setProject] = useState("");
  const [pressed, setPressed] = useState(false);

  function handleClick (elemento) {
    setPressed(true)
    switch(elemento) {
      case "Platformer":
        setProject(<Platformer></Platformer>)
        break;
      default:
        setProject("")
    }
  }
    return (
        <section className="projects">
          {pressed ? null : (<button onClick={()=>handleClick("Platformer")}>Platformer</button>)}
          {project}
        </section>
        
    )
}

export default Projects;
import Platformer from "./Projects/Platformer.js"
import { useState } from "react";

function Projects () {

  const [project, setProject] = useState("");
  function handleClick (elemento) {
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
          <button onClick={()=>handleClick("Platformer")}>Platformer</button>
          {project}
        </section>
        
    )
}

export default Projects;
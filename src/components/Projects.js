import Platformer from "./Projects/Platformer.js"
import ShootEmUp from "./Projects/ShootEmUp/ShootEmUp.js";
/*import TestFPS from "./Projects/Testing.js";*/
import { useState } from "react";

function Projects ({handleCollapse}) {

  const [project, setProject] = useState("");
  const [pressed, setPressed] = useState(false);

  function handleClick (elemento) {
    setPressed(true)
    handleCollapse(true)
    switch(elemento) {
      case "Platformer":
        setProject(<Platformer handleQuitGame={handleQuitGame}></Platformer>)
        break;
        case "ShootEmUp":
          setProject(<ShootEmUp handleQuitGame={handleQuitGame}></ShootEmUp>)
          break;
      default:
        setProject("")
    }
  }

  function handleQuitGame () {
    setProject("")
    setPressed(false)
    handleCollapse(false)
  }

    return (
        <section className="projects">
          {pressed ? null : 
            <div>
              <section className="button-container">
              {pressed ? null : (<button onClick={()=>handleClick("Platformer")}>Platformer</button>)}
              <div className="resume"></div>
            </section>
            <section className="button-container">
              {pressed ? null : (<button onClick={()=>handleClick("ShootEmUp")}>ShootEmUp</button>)}
              <div className="resume"></div>
            </section>
            </div>
            
            
            }
          {project}
        </section>
        
    )
}

export default Projects;
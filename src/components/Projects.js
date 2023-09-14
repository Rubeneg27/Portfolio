import Platformer from "./Projects/Platformer.js"
import ShootEmUp from "./Projects/ShootEmUp/ShootEmUp.js";
/*import TestFPS from "./Projects/Testing.js";*/
import { useState, useEffect } from "react";

function Projects ({handleCollapse, isGameClosed, handleCloseGame}) {

  const [project, setProject] = useState("");
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    console.log(isGameClosed)
  }, [isGameClosed])

  function handleClick (elemento) {
    setPressed(true)
    handleCollapse(true)
    switch(elemento) {
      case "Platformer":
        setProject("platformer")
        break;
        case "ShootEmUp":
          setProject("shootemup")
          break;
      default:
        setProject("")
    }
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
          {project === "shootemup" ? <ShootEmUp setProject={setProject} setPressed={setPressed} handleCollapse={handleCollapse} handleCloseGame={handleCloseGame} isGameClosed={isGameClosed}></ShootEmUp> : null}
          {project === "platformer" ? <Platformer handleCloseGame={handleCloseGame} isGameClosed={isGameClosed}></Platformer> : null}
        </section>
        
    )
}

export default Projects;
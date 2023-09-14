import Platformer from "./Projects/Platformer.js"
import ShootEmUp from "./Projects/ShootEmUp/ShootEmUp.js";
/*import TestFPS from "./Projects/Testing.js";*/
import { useState, useEffect } from "react";

function Projects ({handleCollapse, testBool, handleTestBool}) {

  const [project, setProject] = useState("");
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    console.log(testBool)
  }, [testBool])

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
          {project === "shootemup" ? <ShootEmUp handleTestBool={handleTestBool} testBool={testBool} handleQuitGame={handleQuitGame}></ShootEmUp> : null}
          {project === "platformer" ? <Platformer testBool={testBool} handleQuitGame={handleQuitGame}></Platformer> : null}
        </section>
        
    )
}

export default Projects;
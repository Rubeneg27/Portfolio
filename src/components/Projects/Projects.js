import { useState } from "react";
import './css/Projects.css'
import Platformer from "./Platformer.js"
import ShootEmUp from "./ShootEmUp/ShootEmUp.js";


function Projects ({handleCollapse, isGameClosed, handleCloseGame}) {

  const [project, setProject] = useState("");
  const [pressed, setPressed] = useState(false);

  const BOUNCE_GAME_URL = "/UnityWebGL/Bounce Invasors - WebGL/index.html";


  function handleClick (elemento) {
    setPressed(true)
    handleCollapse(true)
    switch(elemento) {
      case "Platformer":
        setProject(elemento)
        break;
      case "ShootEmUp":
        setProject(elemento)
        break;
      case "BounceInvasors":
        setProject(elemento)
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
            <section className="button-container">
              {pressed ? null : (<button onClick={()=>handleClick("BounceInvasors")}>UNITY-Bounce Invasors</button>)}
              <div className="resume"></div>
            </section>
            </div>
            }
          {project === "shootemup" ? <ShootEmUp setProject={setProject} setPressed={setPressed} handleCollapse={handleCollapse} handleCloseGame={handleCloseGame} isGameClosed={isGameClosed}></ShootEmUp> : null}
          {project === "platformer" ? 
          <Platformer setProject={setProject} setPressed={setPressed} handleCollapse={handleCollapse} handleCloseGame={handleCloseGame} isGameClosed={isGameClosed}></Platformer> : null}
          {project === "BounceInvasors" ? 
            <iframe title="Unity Game"
            src={BOUNCE_GAME_URL}
            width="100%"
            height="100%"
            allowFullScreen>
            </iframe> : null
          }
        </section>
        
    )
}

export default Projects;
import { useState } from "react";
import './css/Projects.css'
import Platformer from "./Platformer.js"
import ShootEmUp from "./ShootEmUp/ShootEmUp.js";
import { Unity, useUnityContext } from "react-unity-webgl";


function Projects ({handleCollapse, isGameClosed, handleCloseGame}) {

  const [project, setProject] = useState("");
  const [pressed, setPressed] = useState(false);

  


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
          case "BounceInvasors":
        setProject("BounceInvasors")
      break;
      default:
        setProject("")
    }
  }

  const { unityProvider } = useUnityContext({
    loaderUrl: "https://Rubeneg27.github.io/Portfolio/UnityWebGL/Bounce Invasors - WebGL/Build/Bounce Invasors - WebGL.loader.js",
    dataUrl: "https://Rubeneg27.github.io/Portfolio/UnityWebGL/Bounce Invasors - WebGL/Build/Bounce Invasors - WebGL.data",
    frameworkUrl: "https://Rubeneg27.github.io/Portfolio/UnityWebGL/Bounce Invasors - WebGL/Build/Bounce Invasors - WebGL.framework.js",
    codeUrl: "https://Rubeneg27.github.io/Portfolio/UnityWebGL/Bounce Invasors - WebGL/Build/Bounce Invasors - WebGL.wasm",
    streamingAssetsUrl: "https://Rubeneg27.github.io/Portfolio/UnityWebGL/Bounce Invasors - WebGL/StreamingAssets"
  });

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
            <Unity className="bounceInvasors" unityProvider={unityProvider}></Unity> : null
          }
        </section>
        
    )
}

export default Projects;
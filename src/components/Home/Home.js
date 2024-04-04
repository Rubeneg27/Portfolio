import img from "../../Assets/Perfil.png"
import './Home.css'
import { useDevice } from "../Context/DeviceContext.js";

function Home () {

  const { isMobile } = useDevice();

  return (
    <section className={isMobile? "HomeMobile" : "Home"} >

      <div className="Home-text">
        <p className="popUpText">Hello!</p>
        <p>My name is</p>
        <p className="popUpText">Rubén Espinosa González</p>
        <p>Passionate about graphic design, technology and videogames.</p>
        <p>On my personal webpage, you can learn more about my skills, explore my projects, and get in touch with me.</p>
        <p className="popUpText">I hope you enjoy your visit!</p>
      </div>
      <div className="image-container">
        <img src={img} alt="foto de perfil de Rubén Espinosa con el monte fuji en el fondo"/>
      </div>
    </section>
    
  )
}

export default Home;
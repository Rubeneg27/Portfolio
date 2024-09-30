import img from "../../Assets/Perfil.png"
import {FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import './Home.css'
import { useDevice } from "../Context/DeviceContext.js";

function Home () {

  const { isMobile } = useDevice();

  return (
    <section className={isMobile? "HomeMobile" : "Home"} >

      <div className="Home-text">
        <div className="dashCard">
          <p className="popUpText">Hello!</p>
          <p>My name is</p>
          <p className="popUpText">Rubén Espinosa González</p>
          <p>Passionate about graphic design, technology and videogames.<br></br></p>
          <p>On my personal webpage, you can learn more about my skills, explore my projects, and get in touch with me.</p>
        </div>
        <div className="dashCard">
          <p className="popUpText">I hope you enjoy your visit!</p>
        </div>
      </div>
{/*       
      <div className="Home-photo-media dashCard" >
        <div className="image-container ">
          <img src={img} alt="foto de perfil de Rubén Espinosa con el monte fuji en el fondo"/>
        </div>
        <div className="mediaContainer">
          <a className="dashCard" href="https://github.com/Rubeneg27/" style={{maxWidth: 'fit-content' }}>
            <div style={{display: 'flex'}} >
              <FaGithub className="logo" />
                <span style={{alignSelf: 'center', marginLeft: '1vw', maxWidth: 'fit-content'}}>
                </span>
            </div>
          </a>
          <a className="dashCard" href="https://www.linkedin.com/in/rub%C3%A9n-espinosa-gonz%C3%A1lez/" style={{maxWidth: 'fit-content' }}>
            <div style={{display: 'flex'}}>
              <FaLinkedin className="logo" />
                <span style={{alignSelf: 'center', marginLeft: '1vw', maxWidth: 'fit-content' }}>
    
                </span>
            </div>
          </a>
          <a className="dashCard" href="rubeneg27@gmail.com" style={{maxWidth: 'fit-content' }}>
            <div style={{display: 'flex'}}>
              <FaEnvelope className="logo" />
                <span style={{alignSelf: 'center', marginLeft: '1vw', maxWidth: 'fit-content'}}>

                </span>
            </div>
          </a>
        </div>
      </div> */}

    </section>
    
  )
}

export default Home;
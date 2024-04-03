import { useState } from "react";
import './css/Skills.css'
import courseraCertificate from "../../Assets/Coursera-Certificado.png"
import { useDevice } from "../Context/DeviceContext.js";

function Skills() {

    const { isMobile } = useDevice();

    const [showCertificateImg, setShowCertificateImg] = useState(false);

    ///Handle the display of img in .skills///
    ///Parameters:///
    ///e: will recieve true o false depding of display=true and display=false///
    function handleCertificateImg (e) {
        setShowCertificateImg(e)
    }

    return (
        <section className={isMobile ? "skillsMobile" : "skills"} >
            <a hidden={showCertificateImg ? false : true} href="https://www.coursera.org/account/accomplishments/professional-cert/N6SAE74TJBAN" target="blank"> </a>
            <div className={showCertificateImg ? "CertificateImg" : "CertificateImg_hidden"} >
                {<img  alt="certificado coursera de front end developer" src={courseraCertificate}></img>}
            </div>
            <div className="skills-a">
                <div>
                    <h2>Skills</h2>
                    <p>HTML5</p>
                    <p>CSS, SASS</p>
                    <p>Javascript, Typescript</p>
                    <p>C#</p>
                    <p>Python</p>
                    <p>React</p>
                    <p>Angular</p>
                    <p>Git, GitHub</p>            
                    <h2>Academic Background</h2>
                    <p>Bootcamp: Front-End developer</p>
                    <p>Certification: <span className="CertificateLink" onClick={()=>handleCertificateImg(true)}>Meta Front-end Developer</span>.</p>
				    <p>Graduated in Chemistry from the University of Seville</p>
                    <h2>Languages</h2>
                    <p>English</p>
                    <p>Certification: B1.</p>
                    <p>Speaking Level: Conversational.</p>
                </div>           
            </div>
            <div className="skills-a">
                <div>
                    <h2>Soft skills</h2>
                    <p>Consistent and solution-oriented.</p>
                    <p>Accustomed to teamwork.</p>
                    <p>Always ready to learn, acknowledge my mistakes, and learn from them.</p>
                    <p>I approach challenges with patience and perseverance.</p>
                </div>
            </div>
            {showCertificateImg? <div className="imgClose" onClick={()=>handleCertificateImg(false)}></div> : null}                    
		</section>
    )
}

export default Skills;
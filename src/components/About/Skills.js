import { useEffect, useState } from "react";
import courseraCertificate from "../../Assets/Coursera-Certificado.png"

function Skills() {

    const [showCertificateImg, setShowCertificateImg] = useState(false);

    function handleCertificateImg () {
        setShowCertificateImg(!showCertificateImg)
    }

    useEffect(()=>{
        setShowCertificateImg(showCertificateImg)
    }, [showCertificateImg])
    
    return (
        <section className="skills">
            <div className="skills-a">
                <div>
                    <h2>Academic Background</h2>
				    <p>Graduated in Chemistry from the University of Seville</p>
                </div>
                <div>
                    <h2>Skills</h2>
				    <p>Certification: <span className="CertificateLink" onClick={handleCertificateImg}>Meta Front-end Developer</span>.</p>
                    <p>Programming Languages: Javascript, C# and HTML.</p> 
                    <p>Libraries: React, Angular.</p>
                    {<img hidden={showCertificateImg ? false : true} className="CertificateImg" src={courseraCertificate} alt="certificado coursera de front end developer"></img>}
                </div>
                <div>
                    <h2>Languages</h2>
                    <p>English</p>
                    <p>Certification: B1.</p>
                    <p>Speaking Level: Conversational.</p>
                </div>            
                </div>
            <div className="skills-b">
                <div className="div-a">
                    <h2>Soft skills</h2>
                    <p>Consistent and solution-oriented.</p>
                    <p>Accustomed to teamwork.</p>
                    <p>Always ready to learn, acknowledge my mistakes, and learn from them.</p>
                    <p>I approach challenges with patience and perseverance.</p>
                </div>
            </div>              
		</section>
    )
}

export default Skills;
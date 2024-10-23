import { useRef, useImperativeHandle, forwardRef, useState } from "react";
import './css/Skills.css';
import courseraCertificate from "../../Assets/Coursera-Certificado.png";
import { useDevice } from "../Context/DeviceContext.js";

const Skills = forwardRef(({ isHidden }, ref) => {
    const [showCertificateImg, setShowCertificateImg] = useState(false);
    const { isMobile } = useDevice();
    const skillsRef = useRef(null);

    // Permitir al padre controlar el scroll
    useImperativeHandle(ref, () => ({
        scrollBy: (scrollOptions) => {
            if (skillsRef.current) {
                skillsRef.current.scrollBy(scrollOptions);
            }
        }
    }));

    function handleCertificateImg(e) {
        setShowCertificateImg(e);
    }

    return (
        <section ref={skillsRef} className={isMobile ? "skillsMobile" : isHidden ? "skills-hidden" : "skills"}>
            <a hidden={!showCertificateImg} href="https://www.coursera.org/account/accomplishments/professional-cert/N6SAE74TJBAN" target="blank"></a>
            <div className={showCertificateImg ? "CertificateImg" : "CertificateImg_hidden"}>
                {<img alt="certificado coursera de front end developer" src={courseraCertificate}></img>}
            </div>
            <div className='popUpText'>
                <div className="dashCard">ACADEMIC BACKGROUND</div>
                <div className="dashCard">
                    <p className='popUpText'>Bootcamp- Angular Front-End Developer</p>
                    <p>University of La Rioja/Qualentum (Grupo Proeduca)</p>
                    <p className='popUpText'>Certification: <span className="customLink" onClick={() => handleCertificateImg(true)}>Front-end Developer</span>.</p>
                    <p>Meta - Coursera</p>
                    <p className='popUpText'>Graduated in Chemistry</p>
                    <p>University of Seville</p>
                </div>
            </div>
            <div className='popUpText'>
                <div className="dashCard">LANGUAGES</div>
                <div className="dashCard">
                    <h3 className='popUpText'>English</h3>
                    <p>Certification: B1.</p>
                    <p>Speaking Level: Conversational.</p>
                </div>
                <div className="dashCard">
                    <h3 className='popUpText'>Spanish</h3>
                    <p>Native</p>
                </div>
            </div>
            <div className='popUpText'>
                <div className="dashCard">TECH STACK</div>
                <div className="dashCard">
                    <p>HTML5, CSS</p>
                    <p>Javascript, Typescript, C#, Python</p>
                    <p>React, Angular</p>
                    <p>Git, GitHub</p>
                    <p>Unity, Photoshop, Blender, Adobe Substance Painter</p>
                </div>
            </div>
            {showCertificateImg ? <div className="imgClose" onClick={() => handleCertificateImg(false)}></div> : null}
        </section>
    );
});

export default Skills;

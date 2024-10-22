import { useState, useRef, useEffect } from "react";
import './css/Skills.css';
import courseraCertificate from "../../Assets/Coursera-Certificado.png";
import { useDevice } from "../Context/DeviceContext.js";

function Skills({ isHidden }) {
    const { isMobile } = useDevice();
    const [showCertificateImg, setShowCertificateImg] = useState(false);
    const [showUpButton, setShowUpButton] = useState(false);
    const [showDownButton, setShowDownButton] = useState(false);

    const skillsRef = useRef(null);

    const handleScrollDown = () => {
        if (skillsRef.current) {
            skillsRef.current.scrollBy({ top: 300, behavior: 'smooth' });
        }
    };

    const handleScrollTop = () => {
        if (skillsRef.current) {
            skillsRef.current.scrollBy({ top: -300, behavior: 'smooth' });
        }
    };

    function handleCertificateImg(e) {
        setShowCertificateImg(e);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (skillsRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = skillsRef.current;
                setShowUpButton(scrollTop > 0); // Muestra el botón de "ir arriba" si no está en la parte superior
                setShowDownButton(scrollTop + clientHeight < scrollHeight); // Muestra el botón de "ir abajo" si no está en la parte inferior
            }
        };

        const refCurrent = skillsRef.current;
        if (refCurrent) {
            refCurrent.addEventListener('scroll', handleScroll);
            handleScroll(); // Llama a la función inicialmente para establecer el estado de los botones
        }

        return () => {
            if (refCurrent) {
                refCurrent.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <section ref={skillsRef} className={isMobile ? "skillsMobile" : isHidden ? "skills-hidden" : "skills"}>
            {showUpButton && <button className="go-up-button" onClick={handleScrollTop}></button>}
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
            {showDownButton && <button className="go-down-button" onClick={handleScrollDown}></button>}
        </section>
    );
}

export default Skills;

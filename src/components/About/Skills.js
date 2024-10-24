import { useRef, useImperativeHandle, forwardRef, useState } from "react";
import './css/Skills.css';
import courseraCertificate from "../../Assets/Coursera-Certificado.png";
import { useDevice } from "../Context/DeviceContext.js";

const Skills = forwardRef(({}, ref) => {
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

    const academicBackground = [
        {
            title: "Bootcamp- Angular Front-End Developer",
            institution: "University of La Rioja/Qualentum (Grupo Proeduca)"
        },
        {
            title: "Certification: Front-end Developer",
            institution: "Meta - Coursera",
            certificateLink: "https://www.coursera.org/account/accomplishments/professional-cert/N6SAE74TJBAN"
        },
        {
            title: "Graduated in Chemistry",
            institution: "University of Seville"
        }
    ];

    const languages = [
        {
            language: "English",
            certification: "Certification: B1.",
            speakingLevel: "Speaking Level: Conversational."
        },
        {
            language: "Spanish",
            certification: "Native"
        }
    ];

    const techStack = [
        "HTML5, CSS",
        "Javascript, Typescript, C#, Python",
        "React, Angular",
        "Git, GitHub",
        "Unity, Photoshop, Blender, Adobe Substance Painter"
    ];

    const certificates = [
        {
            title: "Coursera-frontend",
            link: "https://www.coursera.org/account/accomplishments/professional-cert/N6SAE74TJBAN",
        }  
    ]

    return (
        <section ref={skillsRef} className={isMobile ? "skillsMobile" : "skills"}>
            {certificates.map((certtificate, index) => (<a hidden={!showCertificateImg} href={certtificate.link} target="blank"></a> ))}
            <div className={showCertificateImg ? "CertificateImg" : "CertificateImg_hidden"}>
                {<img alt="certificado coursera de front end developer" src={courseraCertificate}></img>}
            </div>
            <div className='popUpText'>
                <div className="dashCard">ACADEMIC BACKGROUND</div>
                <div className="dashCard">
                    {academicBackground.map((item, index) => (
                        <div key={index}>
                            <p className='popUpText'>{item.title}</p>
                            <p>{item.institution}</p>
                            {item.certificateLink && (
                                   <span className="customLink" onClick={() => handleCertificateImg(true)}>Certificate</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className='popUpText'>
                <div className="dashCard">LANGUAGES</div>
                <div className="dashCard">
                    {languages.map((lang, index) => (
                        <div key={index}>
                            <h3 className='popUpText'>{lang.language}</h3>
                            <p>{lang.certification}</p>
                            {lang.speakingLevel && <p>{lang.speakingLevel}</p>}
                        </div>
                    ))}
                </div>
            </div>
            <div className='popUpText'>
                <div className="dashCard">TECH STACK</div>
                <div className="dashCard">
                    <ul>
                        {techStack.map((tech, index) => (
                                <li key={index}>{tech}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {showCertificateImg ? <div className="imgClose" onClick={() => handleCertificateImg(false)}></div> : null}
        </section>
    );
});

export default Skills;

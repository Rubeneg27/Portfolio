import './css/Experience.css';
import { useRef, useImperativeHandle, forwardRef } from "react";

const Experience = forwardRef(({}, ref) => {
    // Ref para el contenedor de experiencia
    const experienceRef = useRef(null);

    // Permitir al padre controlar el scroll
    useImperativeHandle(ref, () => ({
        scrollBy: (scrollOptions) => {
            if (experienceRef.current) {
                experienceRef.current.scrollBy(scrollOptions);
            }
        }
    }));

    const professional_experiencies = [
        {
            date: "2022 - Present",
            position: "Unity Game Developer",
            company: "Freelance",
            responsabilities: [
                "Design and implementation of game mechanics and systems.",
                "Programming in C# for Unity-based projects.",
                "3D modeling of assets for environments and characters.",
                "Texturing and optimization of 3D models for performance."
            ]
        },
        {
            date: "2016 - Present",
            position: "Chemist in Analytical Development and Analysis Department",
            company: "Destilaciones Bordas S.A",
            responsabilities: [
                "Qualitative and quantitative chemical analysis using gas chromatography and other analytical techniques.",
                "Development of formulas for fragrances and perfumes using various raw materials and essential oils.",
                "Comprehensive analysis of essential oils and raw materials.",
                "Collaboration in the implementation of new analysis procedures.",
                "Instrumental technical support to other departments.",
                "Laboratory technician in quality control. Analysis of physicochemical parameters."
            ]
        }
    ];

    return (
        <section 
            ref={experienceRef} // Añade la referencia al contenedor principal
            className="experience"
        >
            {professional_experiencies.map((experience, index) => (
                <div key={index} className='popUpText'>
                    <div className="dashCard">{experience.date}</div>
                    <div className="dashCard">
                        <h3 className='popUpText'>POSITION</h3>
                        <p>{experience.position}</p>
                        <h3 className='popUpText'>COMPANY</h3>
                        <p>{experience.company}</p>
                        <h3 className='popUpText'>RESPONSABILITIES</h3>
                        <ul>
                            {experience.responsabilities.map((responsibility, idx) => (
                                <li key={idx}>{responsibility}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </section>
    )
});

export default Experience;

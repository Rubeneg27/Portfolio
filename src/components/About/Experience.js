import './css/Experience.css';
import { useRef, useState, useImperativeHandle, forwardRef } from "react";

const Experience = forwardRef(({ isHidden }, ref) => {
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

    return (
        <section 
            ref={experienceRef} // Añade la referencia al contenedor principal
            className={isHidden ? "experience-hidden" : "experience"}
        >
            <div className='popUpText'>
                <div className="dashCard">2022 - Present</div>
                <div className="dashCard">
                    <h3 className='popUpText'>POSITION</h3>
                    <p>Unity Game Developer</p>
                    <h3 className='popUpText'>COMPANY</h3>
                    <p>Freelance</p>
                    
                    <h3 className='popUpText'>RESPONSABILITIES</h3>
                    <p>
                        Design and implementation of game mechanics and systems.<br></br>
                        Programming in C# for Unity-based projects.<br></br>
                        3D modeling of assets for environments and characters.<br></br>
                        Texturing and optimization of 3D models for performance.<br></br>
                    </p>
                </div>
            </div>
            <div className='popUpText'>
                <div className="dashCard">2016 - Present</div>
                <div className="dashCard">
                    <h3 className='popUpText'>POSITION</h3>
                    <p>Chemist in Analytical Development and Analysis Department</p>
                    <h3 className='popUpText'>COMPANY</h3>
                    <p>Destilaciones Bordas S.A</p>
                    
                    <h3 className='popUpText'>RESPONSABILITIES</h3>
                    <p>
                        Qualitative and quantitative chemical analysis using gas chromatography and other analytical techniques.<br></br>
                        Development of formulas for fragrances and perfumes using various raw materials and essential oils.<br></br>
                        Comprehensive analysis of essential oils and raw materials.<br></br>
                        Collaboration in the implementation of new analysis procedures.<br></br>
                        Instrumental technical support to other departments.<br></br>
                        Laboratory technician in quality control. Analysis of physicochemical parameters.<br></br>
                    </p>
                </div>
            </div>
        </section>
    )
});

export default Experience;

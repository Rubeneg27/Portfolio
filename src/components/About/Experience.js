import './css/Experience.css';
import { useRef, useState, useEffect } from "react";

function Experience({ isHidden }) {
    // Ref para el contenedor de experiencia
    const experienceRef = useRef(null);
    const [showUpButton, setShowUpButton] = useState(false);
    const [showDownButton, setShowDownButton] = useState(false);

    const handleScrollDown = () => {
        if (experienceRef.current) {
            experienceRef.current.scrollBy({ top: 300, behavior: 'smooth' });
        }
    };

    const handleScrollTop = () => {
        if (experienceRef.current) {
            experienceRef.current.scrollBy({ top: -300, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (experienceRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = experienceRef.current;
                setShowUpButton(scrollTop > 0); // Muestra el botón de "ir arriba" si no está en la parte superior
                setShowDownButton(scrollTop + clientHeight < scrollHeight); // Muestra el botón de "ir abajo" si no está en la parte inferior
            }
        };

        const refCurrent = experienceRef.current;
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
        <section 
            ref={experienceRef} // Añade la referencia al contenedor principal
            className={isHidden ? "experience-hidden" : "experience"}
        >
            {showUpButton && <button className="go-up-button" onClick={handleScrollTop}></button>}
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
            {showDownButton && <button className="go-down-button" onClick={handleScrollDown}></button>}
        </section>
    )
}

export default Experience;

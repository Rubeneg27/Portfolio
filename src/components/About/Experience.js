import './css/Experience.css'

function Experience({isHidden}) {
    return (
        <section className={isHidden? "experience-hidden" : "experience"}>
            <div className="dashCard">
                <h3 className='popUpText'>Company</h3>
    	        <p>Destilaciones Bordas S.A</p>
                <h3 className='popUpText'>Position</h3>
                <p>Chemist in Analytical Development and Analysis Department (2016 - Present)</p>
                <h3 className='popUpText'>Responsibilities</h3>
                <p>
                    Qualitative and quantitative chemical analysis using gas chromatography and other analytical techniques.<br></br>
                    Development of formulas for fragrances and perfumes using various raw materials and essential oils.<br></br>
                    Comprehensive analysis of essential oils and raw materials.<br></br>
                    Collaboration in the implementation of new analysis procedures.<br></br>
                    Instrumental technical support to other departments.<br></br>
                    Laboratory technician in quality control. Analysis of physicochemical parameters.<br></br>
                </p>
            </div>
        </section>

    )
}

export default Experience;
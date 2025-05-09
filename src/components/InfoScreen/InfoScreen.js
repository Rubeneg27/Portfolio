import './InfoScreen.css'

function InfoScreen() {
  const chName = "Rubén Espinosa González"
  const chClass = "Fronten Developer"
  const techStack = "Javascript, HTML, CSS, React, Angular, C#"
  const lang = "Spanish, English"
  let chAge = 32

  return (
    <div className='info-screen'>

      <div className='dash-card-container'>

        <div className='dashCard'>
          <span>
            <h4><span>Level: </span>{chAge}</h4>
            <h3>Class: <span>{chClass}</span></h3>
            <h2>{chName}</h2>
          </span>
          <img alt="Character portrait"></img>
        </div> 
      </div>
      <h3>Lore</h3>
      <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
      <div className='ch-stats-container'>
        <div className="col">
          <h3>Achademic background</h3>
          <p>Degree in Computer Engineering</p>
          <p>Degree in Chemistry</p>
          <h3>Languages</h3>
          <span>English</span>
          <span>Spanish</span>
        </div>
        <div className="col">
          <h3>Achademic background</h3>
          <p>Degree in Computer Engineering</p>
          <p>Degree in Chemistry</p>
          <h3>Languages</h3>
          <span>English</span>
          <span>Spanish</span>
        </div>
      </div>
    </div>
  )
}

export default InfoScreen;
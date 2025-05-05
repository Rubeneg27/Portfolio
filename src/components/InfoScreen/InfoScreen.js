import './InfoScreen.css'

function InfoScreen() {
  const chName = "Rubén Espinosa González"
  const chClass = "Fronten Developer"
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
    </div>
  )
}

export default InfoScreen;
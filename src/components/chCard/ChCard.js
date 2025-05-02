import './chCard.css'

function ChCard() {
  const chName = "Rubén Espinosa González"
  const chClass = "Fronten Developer"
  let chAge = 32

  return (
    <div>
      <h2>{chName}</h2>
      <h4><span>Level: </span>{chAge}</h4>
      <h3>Class: <span>{chClass}</span></h3>
      <img alt="Character portrait"></img>
    </div>
  )
}

export default ChCard;
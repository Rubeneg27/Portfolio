import img from "../Assets/Perfil.png"

function Home () {
  return (
    <section className="Home">
      <div className="Home-text">
        <p className="p-1">Hello!</p>
        <p className="p-2">My name is</p>
        <p className="p-3">Rubén Espinosa González</p>
        <p className="p-2">Passionate about graphic design and technology.</p>
        <p className="p-2">On my personal webpage, you can learn more about my skills, explore my projects, and get in touch with me.</p>
        <p className="p-1B">I hope you enjoy your visit!</p>
        </div>
      <img src={img} alt="foto de perfil de Rubén Espinosa con el monte fuji en el fondo"></img>
    </section>
    
  )
}

export default Home;
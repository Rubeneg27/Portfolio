import './App.css';
import Nav from './components/Nav'

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <article>
        <section>Rubén Espinosa González</section>
        <section>Formado en HTML, CSS, Javascript y React</section>
      </article>
      <article>
        <section>
          <h2>Más sobre mí</h2>
          <span>
            Amante de la tecnología y el diseño gráfico. Graduado en Química en el año 2011 y trabajando de ello hasta el día de hoy. 
            Aunque toda mi vida he sido una persona creativa, decidí dedicar mis esfuerzos académicos al ámbito de las ciencias experimentales. 
            El interés por la tecnología es algo que también me ha acompañado desde que tengo uso de razón, motivo por el cual he acabado
            interesándome por la programación. Siempre pensé que este tipo de trabajo no era para mí, que programar sería aburrido o demasiado difcícil. 
            No fue hasta que di el paso y empecé a aprender Javascript que descubrí una pasión oculta por las líneas de código y una vía para desarrollar 
            y reencontrarme con mi creatividad.
            </span>
        </section>
        <section>
          <h2>Mis proyectos</h2>
          <span>Algunos de los proyectos que he realizado durante mi formación en desarrollo web y aplicaciones.</span>
          <article>Proyecto 1</article>
          <article>Proyecto 2</article>
          <article>Proyecto 3</article>
        </section>
      </article>
      <article>
        <h2>Escríbeme</h2>
        <article>Tu nombre</article>
        <article>Tu correo</article>
        <article>Mensaje</article>
      </article>
    </div>
  );
}

export default App;

import './index.css';
import Nav from './components/Nav'
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <div className='Hero'>
      <Nav></Nav>
      <article>
            Amante de la tecnología y el diseño gráfico. Graduado en Química en el año 2011 y trabajando de ello hasta el día de hoy. 
            Aunque toda mi vida he sido una persona creativa, decidí dedicar mis esfuerzos académicos al ámbito de las ciencias experimentales. 
            El interés por la tecnología es algo que también me ha acompañado desde que tengo uso de razón, motivo por el cual he acabado
            interesándome por la programación. Siempre pensé que este tipo de trabajo no era para mí, que programar sería aburrido o demasiado difcícil. 
            No fue hasta que di el paso y empecé a aprender Javascript que descubrí una pasión oculta por las líneas de código y una vía para desarrollar 
            y reencontrarme con mi creatividad.

      </article>
      </div>
      
    </div>
  );
}

export default App;

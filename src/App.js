import './index.css';
import Nav from './components/Nav'
import Header from './components/Header';
import { useState } from "react";

function App() {

  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const handleNavCollapseChange = () => {
    setIsNavCollapsed(!isNavCollapsed);
  }

  return (
    <div className="App">
      <Header></Header>
      <div className="Hero">
      <Nav onCollapseChange={handleNavCollapseChange}></Nav>
      <article className={isNavCollapsed? "article-expanded" : "article"}>
        <p>HOME<br></br> Presentación breve y fotografía</p>
        <p>ABOUT - CV<br></br> 
        - Química ( 20xx - 20xx) en Universidad de Sevilla<br></br>
        - Bordas (2016 - actual)<br></br>Funciones en Bordas:<br></br>Desarrollo analítico... etc</p>
        <p>ABOUT - IT<br></br>
        Formación:<br></br>
        Javascript<br></br>
        CSS, HTML<br></br>
        React
        </p>
      </article>
      </div>
      
    </div>
  );
}

export default App;

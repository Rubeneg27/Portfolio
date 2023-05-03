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
            Presentación breve y fotografía
      </article>
      </div>
      
    </div>
  );
}

export default App;

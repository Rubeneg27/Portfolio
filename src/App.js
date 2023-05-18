import './index.css';
import Nav from './components/Nav'
import Header from './components/Header';
import Section from './components/Section';
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
      <Section isNavCollapsed={isNavCollapsed}></Section>
      </div>
    </div>
  );
}

export default App;

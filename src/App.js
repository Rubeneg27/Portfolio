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
      <Header isNavCollapsed={isNavCollapsed}></Header>
        <Nav onCollapseChange={handleNavCollapseChange}></Nav>
    </div>
  );
}

export default App;

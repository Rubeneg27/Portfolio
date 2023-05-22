import './index.css';
import Hero from './components/Hero'
import Header from './components/Header';
import { useState } from "react";

function App() {

  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const handleNavCollapseChange = () => {
    setIsNavCollapsed(true);
  }
  

  return (
    <div className="App">
      <Header isNavCollapsed={isNavCollapsed}></Header>
      <Hero onCollapseChange={handleNavCollapseChange}></Hero>
    </div>
  );
}

export default App;

import './index.css';
import Hero from './components/Hero'
import Header from './components/Header';
import Home from './components/Home'
import { useState } from "react";

function App() {

  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false)
  const handleNavCollapseChange = () => {
    setIsNavCollapsed(!isNavCollapsed);
  }
  const [content, setContent] = useState(
    <Home></Home>
  )
  const updateContent = () => {
    setContent(<Home></Home>)
    setIsCollapsed(false)
    setIsNavCollapsed(false)
  }
  

  return (
    <div className="App">
      <Header isNavCollapsed={isNavCollapsed} updateContent={updateContent}></Header>
      <Hero onCollapseChange={handleNavCollapseChange} setContent={setContent} content={content} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}></Hero>
    </div>
  );
}

export default App;

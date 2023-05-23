import './index.css';
import Hero from './components/Hero'
import Header from './components/Header';
import Home from './components/Home'
import { useState } from "react";

function App() {

  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMenuOpen, setisMenuOpen] = useState(false)
  const [content, setContent] = useState(
    <Home></Home>
  )
  const handleNavCollapseChange = () => { //Handle collapse on hero's section
    setIsNavCollapsed(!isNavCollapsed);
  }
  
  const updateContent = () => { //Allows Hero's states to be managed from Header in order to propely collapse or uncollapse components
    setContent(<Home></Home>) // update heros's section content to "Home" when clicking on "Ruben's site" in the Header component
    setIsCollapsed(false)
    setIsNavCollapsed(false)
    setisMenuOpen(false)
  }
  

  return (
    <div className="App">
      <Header isNavCollapsed={isNavCollapsed} updateContent={updateContent}></Header>
      <Hero 
      onCollapseChange={handleNavCollapseChange} 
      setContent={setContent} 
      content={content} 
      isCollapsed={isCollapsed} 
      setIsCollapsed={setIsCollapsed}
      isMenuOpen={isMenuOpen}
      setisMenuOpen={setisMenuOpen}
      ></Hero>
    </div>
  );
}

export default App;

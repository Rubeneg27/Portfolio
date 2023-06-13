import Home from "./Home";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";

function Nav () {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMenuOpen, setisMenuOpen] = useState(false)
  const [backHome, setBackHome] = useState(false)
  const [content, setContent] = useState(
    <Home></Home>
  )
  const collapse = () => { //Collapses hero's section
    setIsNavCollapsed(true);
  }
  const unCollapse = () => { //Uncollapses hero's section
    setIsNavCollapsed(false)
  }
  
  const updateContent = () => { //Allows Hero's states to be managed from Header in order to propely collapse or uncollapse components
    setContent(<Home></Home>) // update heros's section content to "Home" when clicking on "Ruben's site" in the Header component
    setIsCollapsed(false)
    setIsNavCollapsed(false)
    setisMenuOpen(false)
  }
  
  const handleClickBody = () => {
    if (isMenuOpen) {
      setisMenuOpen(false)
    }
  }
  

  const updateHome = (value) => {
    setBackHome(value)
  }

  const handleClickHome = () => {
    setisMenuOpen(false)
    setIsCollapsed(false)
    unCollapse()
    setContent(
      <Home></Home>
    )
  }
  const handleClickAbout = () => {
    setisMenuOpen(false)
    setIsCollapsed(true)
    collapse()
    setContent(
      <About backHome={backHome} updateHome={updateHome}></About>
    )
  }
  const handleClickProjects = () => {
    setisMenuOpen(false)
    setIsCollapsed(true)
    collapse()
    setContent(
      <Projects ></Projects>
    )
  }
  const handleClickContact = () => {
    unCollapse()
    setisMenuOpen(false)
    setIsCollapsed(false)
    setContent(
      <Contact></Contact>
    )
  }
  
  return (
    <div>
      <ul className={ isCollapsed ? "Nav-collapsed" : "Nav" } >
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={handleClickHome}>Home</li>
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={handleClickAbout}>About</li>
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={handleClickProjects}>Projects</li>
        <li className={ isCollapsed ? "li-collapsed" : "li"} onClick={handleClickContact}>Contact</li>
      </ul>
      
      
    </div>
  )
}

export default Nav;
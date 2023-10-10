import './index.css';
import { DeviceProvider, useDevice } from "./components/Context/DeviceContext.js";
import Main from './components/Main.js'

function App() {
  //const { isMobile } = useDevice()

  return (
    <DeviceProvider>
      <div className="App">
        <Main />
      </div>
    </DeviceProvider>
  );
}

export default App;
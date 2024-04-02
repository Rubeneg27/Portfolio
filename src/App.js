import './styles/css/index.css';
import { DeviceProvider } from "./components/Context/DeviceContext.js";
import Main from './components/Main/Main.js'

function App() {
  return (
    <DeviceProvider>
      <div className="App">
        <Main />
      </div>
    </DeviceProvider>
  );
}

export default App;
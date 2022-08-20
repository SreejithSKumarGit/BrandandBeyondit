
import './App.css';
import { Home } from './Pages/Home Page/Home';
import {Route,Routes} from "react-router-dom";
import { Panel } from './Pages/Panel/Panel';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/panel' element={<Panel/>}/>
    </Routes>
  );
}

export default App;

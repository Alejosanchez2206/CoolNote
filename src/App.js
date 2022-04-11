import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Inicio from './Principal'
import './App.css';
import Login from './Login/Login';

function App() {
  const users = localStorage.getItem('token');
  return (
   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/Inicio" element={<Inicio />}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;

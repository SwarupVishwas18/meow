import './App.css'
import CardContainer from './components/CardContainer';
import HomeHeader from './components/HomeHeader'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import Details from './Details';
import ActorDetails from './ActorDetails';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kanban" element={<Home />} />
        <Route path="/details/:cat/:id" element={<Details />} />
        <Route path="/actor/:id" element={<ActorDetails />} />
      </Routes>
    </BrowserRouter >
  )
}

export default App;

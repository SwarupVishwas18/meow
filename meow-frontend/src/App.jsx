import { useState } from 'react';
import './App.css'
import CardContainer from './components/CardContainer';
import HomeHeader from './components/HomeHeader'


function App() {

  const [homeIds, setHomeIds] = useState([244786, 299534, 288331, 202555, 24989])
  const [mediaTypes, setMediaTypes] = useState(["movie", "movie", "tv", "tv", "tv"])
  const [containerTitle, setContainerTitle] = useState("To Watch : ")


  return (
    <>
      <HomeHeader setHomeIds={setHomeIds} setMediaTypes={setMediaTypes} setContainerTitle={setContainerTitle} />
      <CardContainer title={containerTitle} homeIds={homeIds} mediaTypes={mediaTypes} />
    </>
  )
}

export default App;

import { useState } from 'react';
import CardContainer from './components/CardContainer';
import HomeHeader from './components/HomeHeader'


function Home() {

    const [homeIds, setHomeIds] = useState([244786, 299536, 202555, 94605, 1124, 79525, 60574, 30984])
    const [mediaTypes, setMediaTypes] = useState(["movie", "movie", "tv", "tv", "movie", "tv", "tv", "tv"])
    const [containerTitle, setContainerTitle] = useState("To Watch : ")


    return (
        <>
            <HomeHeader setHomeIds={setHomeIds} setMediaTypes={setMediaTypes} setContainerTitle={setContainerTitle} />
            <CardContainer title={containerTitle} homeIds={homeIds} mediaTypes={mediaTypes} />
        </>
    )
}

export default Home;
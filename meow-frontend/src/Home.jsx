import { useEffect, useState } from 'react';
import CardContainer from './components/CardContainer';
import HomeHeader from './components/HomeHeader'
import axios from 'axios';


function Home() {


    const [homeIds, setHomeIds] = useState([244786, 299536, 202555, 94605, 1124, 79525, 60574, 30984])
    const [mediaTypes, setMediaTypes] = useState(["movie", "movie", "tv", "tv", "movie", "tv", "tv", "tv"])

    useEffect(() => {
        axios.request(import.meta.env.VITE_BACKEND_URL + "getByStatus/0")
            .then((res) => {
                console.log(res);

                const localHomeIds = res.data.map((movie) => movie.id)
                setHomeIds(localHomeIds);

                const localMediaTypes = res.data.map((movie) => movie.cat)
                setMediaTypes(localMediaTypes)
            })
    }, [])

    const [containerTitle, setContainerTitle] = useState("To Watch : ")


    return (
        <>
            <HomeHeader setHomeIds={setHomeIds} setMediaTypes={setMediaTypes} setContainerTitle={setContainerTitle} />
            <CardContainer title={containerTitle} homeIds={homeIds} mediaTypes={mediaTypes} />
        </>
    )
}

export default Home;
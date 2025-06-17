import { useEffect, useState } from 'react';
import CardContainer from './components/CardContainer';
import HomeHeader from './components/HomeHeader'
import axios from 'axios';


function Home() {


    const [movies, setMovies] = useState([])
    useEffect(() => {
        axios.request(import.meta.env.VITE_BACKEND_URL + "getAll")
            .then((res) => {
                console.log(res);


                var moviesLocal = []
                res.data.forEach(m => {
                    const mLocal = {
                        id: m.id,
                        cat: m.cat,
                        status: m.status
                    }

                    moviesLocal.push(mLocal)
                });

                setMovies(moviesLocal);

            })
    }, [])

    useEffect(() => {
        console.log(movies);

    }, [movies])

    const [containerTitle, setContainerTitle] = useState("Your List :")


    return (
        <>
            <HomeHeader setMovies={setMovies} setContainerTitle={setContainerTitle} />
            <CardContainer title={containerTitle} movies={movies} />
        </>
    )
}

export default Home;
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import not_found from './assets/404.png'
import Card from "./components/Card";
import { useNavigate } from "react-router-dom"

function ActorDetails() {

    const { id } = useParams();
    const [castData, setCastData] = useState({});
    const [displayMovies, setDisplayMovies] = useState([])

    let navigate = useNavigate();


    const options = {
        method: 'GET',
        url: import.meta.env.VITE_PROXY_API_URL + "/person/" + id,
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + import.meta.env.VITE_API_KEY
        }
    };

    const movieOptions = {
        method: 'GET',
        url: import.meta.env.VITE_PROXY_API_URL + "/person/" + id + "/combined_credits",
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + import.meta.env.VITE_API_KEY
        }
    };

    useEffect(() => {
        axios.request(options)
            .then((res) => {
                const cast = {
                    name: res.data.name,
                    profilePic: res.data.profile_path != null ? "https://image.tmdb.org/t/p/original/" + res.data.profile_path : not_found
                }
                setCastData(cast)
                console.log(cast);

            })


        axios.request(movieOptions)
            .then((res) => {
                var creditMovies = [];
                for (let index = 0; index < res.data.cast.length; index++) {
                    var creditMovie = res.data.cast[index]


                    var localMovie = {
                        id: creditMovie.id,
                        type: creditMovie.media_type
                    }
                    creditMovies.push(localMovie)

                    if (creditMovies.length == 10) {
                        break;
                    }
                };

                setDisplayMovies(creditMovies)
            })
    }, [])
    return (
        <div className="act-dt-page">

            <div className="act-detail-header" style={{
                // backgroundImage: `radial-gradient(circle,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(230, 220, 85, 1) 98%, rgba(237, 221, 83, 1) 100%);`
                backgroundImage: `linear-gradient(to right, #161b21 25%,rgba(22, 27, 33, 0.9) 50%, rgba(22, 27, 33, 0.82) 70% , rgba(22, 27, 33, 0.42) 100%), url(${castData.profilePic})`,
                backgroundPosition: `center`
            }}>
            </div>
            <div className="act-detail-content">
                <div className="act-ls">
                    <h1 className="movie-name">{castData.name}</h1>
                    <div className="btns">
                        <a href="/">
                            <button>
                                Home
                            </button>
                        </a>

                        <button onClick={() => navigate(-1)}>
                            Go Back
                        </button>

                    </div>
                </div>
                <div className="act-movies-grid">
                    <div className="card-container">
                        {displayMovies.map((id, index) => (
                            <a href={"/details/" + displayMovies[index].type + "/" + displayMovies[index].id}>
                                <Card key={id} id={displayMovies[index].id} type={displayMovies[index].type} />

                            </a>
                        ))}
                    </div>
                </div>
            </div>


            {/* <section>
                
            </section> */}

        </div>
    )
}

export default ActorDetails;
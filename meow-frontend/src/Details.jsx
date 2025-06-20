import { useParams } from 'react-router';
import not_found from './assets/404.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
import FormModal from './components/Modal';
import ActorCard from './components/ActorCard';
import Card from './components/Card';

function Details() {

    const { cat, id } = useParams();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isMovieStored, setIsMovieStored] = useState(false)
    const [castData, setCastData] = useState([])
    const [similarData, setSimilarData] = useState([])
    const [status, setStatus] = useState(-1);
    const [movie, setMovie] = useState({})
    const allStatuses = ["No Status", "To Watch", "Watching", "Completed"]

    const type = cat
    if (type == "movie") {
        var url = import.meta.env.VITE_PROXY_API_URL + '/movie/' + id + '?language=en-US'
        var credit_url = import.meta.env.VITE_PROXY_API_URL + '/movie/' + id + '/credits'
        var similar_url = import.meta.env.VITE_PROXY_API_URL + '/movie/' + id + '/credits'
    } else if (type == "tv") {
        var url = import.meta.env.VITE_PROXY_API_URL + "/tv/" + id + "?language=en-US"
        var credit_url = import.meta.env.VITE_PROXY_API_URL + "/tv/" + id + "/aggregate_credits"
        var similar_url = import.meta.env.VITE_PROXY_API_URL + "/tv/" + id + "/similar"
    }

    let [movieData, setMovieData] = useState({
        name: "",
        img: "",
        tagline: "",
        date: "",
        rating: "",
        summary: "",

    })



    const options = {
        method: 'GET',
        url: url,
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + import.meta.env.VITE_API_KEY
        }
    };

    const credit_options = {
        method: 'GET',
        url: credit_url,
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + import.meta.env.VITE_API_KEY
        }
    };

    const similar_options = {
        method: 'GET',
        url: similar_url,
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + import.meta.env.VITE_API_KEY
        }
    };

    console.log("these are options for URL: ");

    console.log(options);



    useEffect(() => {
        axios
            .request(options)
            .then(res => {
                console.log(res.data)
                var imgPath = res.data.poster_path != null ? "https://image.tmdb.org/t/p/original/" + res.data.poster_path : not_found
                if (type == "movie") {
                    setMovieData({
                        name: res.data.title,
                        img: imgPath,
                        date: res.data.release_date,
                        tagline: res.data.tagline,
                        summary: res.data.overview,
                        rating: res.data.vote_average
                    })
                } else if (type == "tv") {
                    setMovieData({
                        name: res.data.original_name,
                        img: imgPath,
                        date: res.data.first_air_date,
                        tagline: res.data.tagline,
                        summary: res.data.overview,
                        rating: res.data.vote_average
                    })
                }



            })
            .catch(err => {
                console.error(err)

            });

        axios.request(import.meta.env.VITE_BACKEND_URL + "get/" + id + "?cat=" + cat)
            .then((res) => {
                if (res.data.length > 0) {
                    setStatus(res.data.status);
                    setMovie(res.data)
                    setIsMovieStored(true)
                }

            })

        axios.request(credit_options)
            .then((data) => {
                console.log("hey this is credits")
                console.log(data);
                var casts = []

                // data.data.cast.forEach(cast => {
                for (let index = 0; index < data.data.cast.length; index++) {
                    var cast = data.data.cast[index]
                    var localCast = {
                        name: cast.name,
                        img: cast.profile_path,
                        id: cast.id
                    }

                    if (type == "movie") {
                        localCast.role = cast.character
                    } else {
                        localCast.role = cast.roles[0].character
                    }
                    casts.push(localCast)

                    if (casts.length == 10) {
                        break;
                    }
                };

                setCastData(casts);
                console.log("Cast Data");

                console.log(castData);

            })

        axios.request(similar_options)
            .then((data) => {
                console.log("hey this is Similar")
                console.log(similar_url);

                console.log(data);
                var similarMovies = []

                // data.data.cast.forEach(cast => {
                for (let index = 0; index < data.data.results.length; index++) {
                    var similarMovie = data.data.results[index]


                    var localMovie = {
                        id: similarMovie.id,
                        type: type
                    }
                    similarMovies.push(localMovie)

                    if (similarMovies.length == 10) {
                        break;
                    }
                };

                setSimilarData(similarMovies)
                console.log("Similar Data");

                console.log(similarData);

            })
    }, [])


    return (
        <div className="dt-page">

            <div className="detail-header" style={{
                // backgroundImage: `radial-gradient(circle,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(230, 220, 85, 1) 98%, rgba(237, 221, 83, 1) 100%);`
                backgroundImage: `linear-gradient(to right, #161b21 25%,rgba(22, 27, 33, 0.9) 50%, rgba(22, 27, 33, 0.82) 70% , rgba(22, 27, 33, 0.42) 100%), url(${movieData.img})`
            }}>
                <div className="ls">

                    <h1 className="movie-name">{movieData.name}</h1>
                    <h3 className="tagline-name">{movieData.tagline}</h3>
                    <div className="other-details">
                        <div className="release-year"> Release Year : {movieData.date} </div>
                        <div>|</div>
                        <div className="imdb-rating"> Voting Avg Rating : {movieData.rating}</div>

                    </div>

                    <div className="short-summary">
                        {movieData.summary}
                    </div>

                    <div className="watch-btn">
                        <button onClick={() => { setIsModalVisible(true) }}>{allStatuses[status + 1]}</button>
                        <a href="/"><button>Go Home</button></a>
                    </div>
                </div>

                <div className="rs">
                    <img className='detail-img' src={movieData.img} alt="" />
                </div>

                {isModalVisible && <FormModal movieId={id} isMovieStored={isMovieStored} movie={movie} setIsModalVisible={setIsModalVisible} cat={cat} />}
            </div>
            <section>
                <h1>Cast</h1>
                <div className="actor-container">
                    {castData.map((cast, index) => {
                        return (
                            <a href={"/actor/" + cast.id}>
                                <ActorCard cast={cast} key={index} />
                            </a>)
                    })}
                </div>
            </section>

            <section>
                <h1>Similar to {movieData.name}</h1>
                <div className="card-container">
                    {similarData.map((id, index) => (
                        <a href={"/details/" + similarData[index].type + "/" + similarData[index].id}>
                            <Card key={id} id={similarData[index].id} type={similarData[index].type} />

                        </a>
                    ))}
                </div>
            </section>

        </div>
    )
}

export default Details;
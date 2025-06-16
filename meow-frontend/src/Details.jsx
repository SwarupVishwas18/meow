import { useParams } from 'react-router';
import not_found from './assets/404.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
import FormModal from './components/Modal';

function Details() {

    const { cat, id } = useParams();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isMovieStored, setIsMovieStored] = useState(false)
    const [status, setStatus] = useState(-1);
    const [movie, setMovie] = useState({})
    const allStatuses = ["No Status", "To Watch", "Watching", "Completed"]

    const type = cat
    if (type == "movie") {
        var url = import.meta.env.VITE_PROXY_API_URL + '/movie/' + id + '?language=en-US'
    } else if (type == "tv") {
        var url = import.meta.env.VITE_PROXY_API_URL + "/tv/" + id + "?language=en-US"
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

        axios.request(import.meta.env.VITE_BACKEND_URL + "get/" + id)
            .then((res) => {
                setStatus(res.data.status);
                setMovie(res.data)
                setIsMovieStored(true)
            })
    }, [])


    return (
        <div className="detail-page" >
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
                    <a href="/"><button>Go Back</button></a>
                </div>
            </div>

            <div className="rs">
                <img className='detail-img' src={movieData.img} alt="" />
            </div>

            {isModalVisible && <FormModal movieId={id} isMovieStored={isMovieStored} movie={movie} setIsModalVisible={setIsModalVisible} />}
        </div>
    )
}

export default Details;
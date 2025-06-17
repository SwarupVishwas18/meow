import { useEffect, useState } from "react";
import axios from "axios";
import not_found from '../assets/404.png'
function Card({ id, type }) {



    let [movieData, setMovieData] = useState({
        name: "",
        img: "",
        date: "",
    })



    console.log("these are options for URL: ");




    useEffect(() => {
        if (type == "movie") {
            var url = import.meta.env.VITE_PROXY_API_URL + '/movie/' + id + '?language=en-US'
        } else if (type == "tv") {
            var url = import.meta.env.VITE_PROXY_API_URL + "/tv/" + id + "?language=en-US"
        }

        const options = {
            method: 'GET',
            url: url,
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + import.meta.env.VITE_API_KEY
            }
        };
        console.log(options);
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
                    })
                } else if (type == "tv") {
                    setMovieData({
                        name: res.data.original_name,
                        img: imgPath,
                        date: res.data.first_air_date,
                    })
                }



            })
            .catch(err => {
                console.error(err)

            })
    }, [type, id])

    return (

        movieData.name && (<div className="card" style={{
            backgroundImage: `url(${movieData.img})`,

        }}>
            <div className="card-data">
                <h2>
                    {movieData.name}
                </h2>
                <p>Release Date: {movieData.date}</p>
            </div>

        </div>)
    );
}

export default Card;
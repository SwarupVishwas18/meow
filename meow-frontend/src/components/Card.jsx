import { useEffect } from "react";
import axios from "axios";
function Card({ id }) {

    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/' + id + '?language=en-US',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + import.meta.env.VITE_API_KEY
        }
    };



    useEffect(() => {
        axios
            .request(options)
            .then(res => console.log(res.data))
            .catch(err => console.error(err));
    }, [])

    return (
        <div className="card">
            <h2>Card Component</h2>
            <p>Movie ID: {id}</p>
        </div>
    );
}

export default Card;
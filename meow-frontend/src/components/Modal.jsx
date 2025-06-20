import axios from "axios";
import { useState } from "react";

function FormModal({ movieId, isMovieStored, movie, setIsModalVisible, cat }) {

    // const [updatedMovie, setUpdatedMovie] = useState(movie);
    const [status, setStatus] = useState(movie.status);
    const [url, setUrl] = useState(movie.url);
    const [count, setCount] = useState(movie.count || 0);
    const [error, setError] = useState("")

    const handleChangeSelect = (event) => {
        setStatus(event.target.value)
    }

    const handleChangeUrl = (event) => {
        setUrl(event.target.value)
    }

    const handleChangeCount = (event) => {
        setCount(event.target.value)
    }

    const handleSubmit = () => {
        if (parseInt(status) == -1) {
            setError("Hey you missed updating status")
            return;
        }
        if (count == "") {
            if (parseInt(status) == 0) {
                setCount(0)
            } else {
                setCount(1)
            }
        } else if (parseInt(count) == parseInt(movie.count)) {
            setCount(count + 1)
        }



        if (isMovieStored) {

            const payload = {
                id: movie.id,
                tmdbId: movieId,
                count: count,
                url: url,
                status: status,
                cat: cat
            }


            axios.post(import.meta.env.VITE_BACKEND_URL + "update/" + movie.id, payload, {
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(
                (res) => {
                    setIsModalVisible(false)
                    console.log(res);

                }
            )
        } else {

            const payload = {
                tmdbId: movieId,
                count: count,
                url: url,
                status: status,
                cat: cat
            }

            axios.post(import.meta.env.VITE_BACKEND_URL + "save", payload).then(
                (res) => {
                    setIsModalVisible(false)
                    console.log(res);
                }
            )
        }
    }

    return (
        <div className="form-modal">
            <div className="error">{error}</div>
            <div className="form-container">

                <div className="input-div">
                    <label htmlFor="movie-status">Movie Status : </label>
                    <select value={status} name="movie-status" onChange={handleChangeSelect} id="movie-status">
                        <option value="-1">No Status</option>
                        <option value="0">To Watch</option>
                        <option value="1">Watching</option>
                        <option value="2">Watched</option>
                    </select>
                </div>
                <div className="input-div">
                    <label htmlFor="recommender">
                        Watch Count :
                    </label>
                    <input type="number" value={count} onChange={handleChangeCount} name="recommender" id="recommender" />
                </div>
                <div className="input-div">
                    <label htmlFor="company">
                        URL/Filepath
                    </label>
                    <input type="text" value={url || ''} name="company" onChange={handleChangeUrl} id="company" />
                </div>
                <div className="watch-btn">
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={() => { setIsModalVisible(false) }}>Cancel</button>
                </div>
            </div>

        </div>
    )
}

export default FormModal;
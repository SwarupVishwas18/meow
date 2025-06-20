import axios from "axios";
import { useState } from "react";

function FormModal({ movieId, isMovieStored, movie, setIsModalVisible, cat }) {

    // const [updatedMovie, setUpdatedMovie] = useState(movie);
    const [status, setStatus] = useState(movie.status);
    const [recomm, setRecomm] = useState(movie.recommendedBy);
    const [company, setCompany] = useState(movie.watchingWith);
    const [error, setError] = useState("")

    const handleChangeSelect = (event) => {
        setStatus(event.target.value)
    }

    const handleChangeRecomm = (event) => {
        setRecomm(event.target.value)
    }

    const handleChangeCompany = (event) => {
        setCompany(event.target.value)
    }

    const handleSubmit = () => {
        if (status == -1) {
            setError("Hey you missed updating status")
            return;
        }
        if (recomm == "") {
            setRecomm("Self")
        }
        if (company == "") {
            setCompany("Self")
        }

        const payload = {
            tmdbId: movieId,
            watchingWith: company,
            recommendedBy: recomm,
            status: status,
            cat: cat
        }


        if (isMovieStored) {

            axios.post(import.meta.env.VITE_BACKEND_URL + "update/" + movieId, payload, {
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
                        Recommended By
                    </label>
                    <input type="text" value={recomm} onChange={handleChangeRecomm} name="recommender" id="recommender" />
                </div>
                <div className="input-div">
                    <label htmlFor="company">
                        Watching With?
                    </label>
                    <input type="text" value={company} name="company" onChange={handleChangeCompany} id="company" />
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
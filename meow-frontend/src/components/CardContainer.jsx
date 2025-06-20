import { useEffect, useState } from "react";
import Card from "./Card"
import SelectComponent from "./SelectComponent";

function CardContainer({ title, movies }) {
    const [statusFilter, setStatusFilter] = useState(0)
    const [displayMovies, setDisplayMovies] = useState([])
    useEffect(() => {
        if (title == "Your List :") {
            setDisplayMovies(() => {
                return (movies.filter(movie => parseInt(movie.status) == statusFilter))
            })
        } else {
            setDisplayMovies(movies)
        }

        console.log(movies);





    }, [statusFilter, movies, title])

    useEffect(() => {
        console.log(displayMovies);

    }, [displayMovies])
    return (
        <section className="card-section">
            <div className="container-title">
                <h1>{title}</h1>
                {/* TODO: Add statusFilter mechanism */}
                {title == "Your List :" && <SelectComponent statusFilter={statusFilter} setStatusFilter={setStatusFilter} />}
            </div>
            <div className="card-container">
                {/* <Card id={244786} type="movie" />
                  <Card id={299534} type="movie" />
                  <Card id={288331} type="tv" />
                  <Card id={202555} type="tv" />
                  <Card id={24989} type="tv" /> */}
                {displayMovies.map((id, index) => (
                    <a href={"/details/" + displayMovies[index].cat + "/" + displayMovies[index].tmdbId}>
                        <Card key={id} id={displayMovies[index].tmdbId} type={displayMovies[index].cat} />
                    </a>
                ))}
            </div>
        </section>

    )
}

export default CardContainer;
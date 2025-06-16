import Card from "./Card"
import SelectComponent from "./SelectComponent";

function CardContainer({ title, movies }) {



    return (
        <section className="card-section">
            <div className="container-title">
                <h1>{title}</h1>
                {/* TODO: Add statusFilter mechanism */}
                {title == "Your List :" && <SelectComponent />}
            </div>
            <div className="card-container">
                {/* <Card id={244786} type="movie" />
                  <Card id={299534} type="movie" />
                  <Card id={288331} type="tv" />
                  <Card id={202555} type="tv" />
                  <Card id={24989} type="tv" /> */}
                {movies.map((id, index) => (
                    <a href={"/details/" + movies[index].cat + "/" + movies[index].id}>
                        <Card key={id} id={movies[index].id} type={movies[index].cat} />

                    </a>
                ))}
            </div>
        </section>

    )
}

export default CardContainer;
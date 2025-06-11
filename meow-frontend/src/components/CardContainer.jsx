import Card from "./Card"

function CardContainer({ title, homeIds, mediaTypes }) {
    return (
        <section className="card-section">
            <h1>{title}</h1>
            <div className="card-container">
                {/* <Card id={244786} type="movie" />
                  <Card id={299534} type="movie" />
                  <Card id={288331} type="tv" />
                  <Card id={202555} type="tv" />
                  <Card id={24989} type="tv" /> */}
                {homeIds.map((id, index) => (
                    <Card key={id} id={id} type={mediaTypes[index]} />
                ))}
            </div>
        </section>

    )
}

export default CardContainer;
import { useEffect } from "react";

function ActorCard({ cast }) {

    useEffect(() => {
        console.log("hey I am in Actor");
        console.log(cast.name);
    }, [])

    console.log(cast)

    return (
        <div className="img-card" style={{
            backgroundImage: `url(${"https://image.tmdb.org/t/p/original/" + cast.img})`,

        }}>
            <div className="card-data">
                <h2>{cast.name || "no name"}</h2>
                <div>{cast.role}</div>
            </div>
        </div>
    )
}

export default ActorCard;
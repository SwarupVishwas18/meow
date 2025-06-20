import axios from 'axios'
import { useEffect } from 'react'
import ReactPlayer from 'react-player'
import { useNavigate, useParams } from 'react-router'

function VideoPlayer() {

    const { id } = useParams()
    const navigate = useNavigate()



    return (

        <div className="video-bg">
            <div className="video-container">
                <ReactPlayer url={`http://localhost:8080/video/${encodeURIComponent(id)}`} controls />
                <div className="btns">
                    <button onClick={() => navigate(-1)}>Go Back</button>
                    <a href="/"><button>Home</button></a>
                </div>
            </div>

        </div>
    )
}

export default VideoPlayer
import axios from 'axios';
import logo from '../assets/logo.png'
import Navbar from './Navbar';
import { useEffect, useState } from 'react';

function HomeHeader({ setHomeIds, setMediaTypes, setContainerTitle }) {
    const [searchTitle, setSearchTitle] = useState('');

    const handleChange = (event) => {
        setSearchTitle(event.target.value);
    };

    const handleSubmit = (event) => {
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/search/multi',
            params: { query: searchTitle, include_adult: 'false', language: 'en-US', page: '1' },
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + import.meta.env.VITE_API_KEY
            }
        };
        axios
            .request(options)
            .then(res => {
                var results = res.data.results;
                const homeIds = [];
                const mediaTypes = [];
                results.forEach(result => {

                    // if (result.media_type == "movie") {
                    //     homeIds.push(result.id);
                    //     mediaTypes.push(result.media_type);
                    // } else if (result.media_type == "tv") {
                    //     homeIds.push(result.id);
                    //     mediaTypes.push(result.media_type);
                    // }

                    if (result.media_type == 'movie' || result.media_type == 'tv') {
                        homeIds.push(result.id);
                        mediaTypes.push(result.media_type);
                    }
                    setHomeIds(homeIds);
                    setMediaTypes(mediaTypes);
                    setContainerTitle("Search Results for  " + searchTitle + " : ")
                });
            })
            .catch(err => console.error(err));
    }


    return (
        <div className="home-header">
            <Navbar />
            <div className="header-content">
                <div className="logo-img"><img src={logo} alt="logo" /></div>
                <div className="search-form"><input type="text" value={searchTitle} onChange={handleChange} /><button onClick={handleSubmit}>Search</button></div>
            </div>
        </div>
    )
}

export default HomeHeader;
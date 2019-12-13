import React, { useState, useEffect } from "react";
import axios from "axios";

function MovieForm({ match, history, location }) {

    const [movieInfo, setMovieInfo] = useState(
        {
            id: null,
            title: "",
            director: "",
            metascore: "",
            stars: []
        }
    );

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${match.params.id}`)
            .then(res => setMovieInfo(res.data))
            .catch(err => console.log(err));
    }, [match.params.id])

    const changeHandler = (e) => {

        let value = e.target.value;

        if (e.target.name === "stars") {
            value = value.split(",");
        }

        setMovieInfo({
            ...movieInfo,
            [e.target.name]: value
        });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${match.params.id}`, movieInfo)
            .then(res => {
                setMovieInfo({
                    id: null,
                    title: "",
                    director: "",
                    metascore: "",
                    stars: []
                });
                history.push('/');
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="form-container">
            <h1>Update Movie</h1>
            <form className="update-form" onSubmit={submitHandler}>
                <input
                    type="text"
                    name="title"
                    value={movieInfo.title}
                    onChange={changeHandler}
                    placeholder="Title"
                />
                <input
                    type="text"
                    name="director"
                    value={movieInfo.director}
                    onChange={changeHandler}
                    placeholder="Director"
                />
                <input
                    type="number"
                    name="metascore"
                    value={movieInfo.metascore}
                    onChange={changeHandler}
                    placeholder="Metastore"
                />
                <input
                    type="text"
                    name="stars"
                    value={movieInfo.stars.toString()}
                    onChange={changeHandler}
                    placeholder="Stars (comma separated)"
                />
                <button className="update-btn">Update Movie</button>
            </form>
        </div>
    );
}

export default MovieForm;
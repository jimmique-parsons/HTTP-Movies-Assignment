import React, { useState } from "react";
import axios from "axios";

function MovieForm(props) {

    const [movieInfo, setMovieInfo] = useState(
        {
            title: "",
            director: "",
            metascore: 0,
            stars: []
        }
    );

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
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
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
                <button>Update Movie</button>
            </form>
        </div>
    );
}

export default MovieForm;
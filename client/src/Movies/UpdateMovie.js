import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialState = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialState);
    const { id } = useParams();
    const { push } = useHistory();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => setMovie(res.data))
            .catch(err =>
                console.error(
                    'nb: UpdateMovie.js: useEffect: err: ',
                    err.message,
                    err.response
                )
            )
    }, [id])

    const handleChange = e => {
        e.persist();
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
        console.log('nb: UpdateMovie.js: handleChange: movie: ', movie);
    }

    const handleSubmit = ev => {
        ev.preventDefault();
        // make a PUT request to edit the item
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                const newMovies = props.movies.map(mov => {
                    if (mov.id === movie.id) {
                        return movie;
                    }
                    return mov;
                })
                setMovie(newMovies)
                push(`/movie-list/${movie.id}`)
                // <Redirect to='/' />
            })
            .catch(err =>
                console.log(
                    'nb: UpdateMovie.js: handleSubmit: err: ',
                    err.message,
                    err.response
                )
            )
    }

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    onChange={handleChange}
                    placeholder='Title'
                    value={movie.title}
                />
                <input
                    type='text'
                    name='director'
                    onChange={handleChange}
                    placeholder='Director'
                    value={movie.director}
                />
                <input
                    type='number'
                    name='metascore'
                    onChange={handleChange}
                    placeholder='Metascore'
                    value={movie.metascore}
                />
                <input
                    type='array'
                    name='stars'
                    onChange={handleChange}
                    placeholder='Stars'
                    value={movie.stars}
                />
                <button>Update Movie</button>
            </form>
        </div>
    )

}

export default UpdateMovie;
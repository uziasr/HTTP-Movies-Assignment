import React, {useState} from 'react';
import axios from 'axios'
import styled from 'styled-components'

const Div = styled.div`

form{
    display:flex;
flex-direction:column;
align-content: center;
align-items: center;
    input{
        width:40%;
        margin: 1% auto;
        padding: 10px;
        font-size: 24px;
    }
}
`
//rsc
const UpdateMovie = (props) => {
    console.log('whats in here', props)
    const [movie, updateMovie] = useState({
        id:props.match.params.id,
        title:'',
        director: '',
        metascore: '',
        stars:[]
    })
    

    const handleChanges = e =>{
        console.log(props)
        if (e.target.name==='stars'){
            console.log('stars!!')
            updateMovie({
                ...movie,
                stars:([...movie.stars,(e.target.value)])
            }) 
        }
        updateMovie({
            ...movie,
            [e.target.name]:e.target.value
        })
    }
    console.log(movie)
    const updateChange = (e) =>{
        const stars = Array.isArray(movie.stars) ? movie.stars: movie.stars.split(' ')
        // console.log(stars)
        const updatedMovie = {
            ...movie,
            stars:stars
        }
        e.preventDefault()
        console.log(Array.isArray(stars))
        const id = props.match.params.id
        console.log('helelel')
        axios
      .put(`http://localhost:5000/api/movies/${id}`, updatedMovie)
      .then(res => {console.log(res)
        props.history.push('/')
        // this.setState({ movies: res.data })
    })
      .catch(err => console.log(err.response));
        console.log(props)

}

    return (
        <Div>
            <form>
                <input type='text' name='title' onChange={handleChanges} placeholder={props.movies ? props.movies.title:'title'}/>
                <input type='text' name='director' onChange={handleChanges} placeholder={props.movies?props.movies.director:'director'}/>
                <input type='text' name='metascore' onChange={handleChanges} placeholder={props.movies?props.movies.metascore:'metascore'}/>
                <input type='array' name='stars' onChange={handleChanges} placeholder={props.movies? props.movies.stars: 'stars' }/>
                <button onClick={updateChange}>Update!</button>
            </form>
        </Div>
    );
};

export default UpdateMovie;
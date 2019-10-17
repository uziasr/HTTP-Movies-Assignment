import React, {useState} from 'react';
import axios from 'axios'

//rsc
const UpdateMovie = (props) => {
    const [movie, updateMovie] = useState({
        id:props.match.params.id,
        title:'',
        director: '',
        metascore: '',
        stars:[]
    })

    const handleChanges = e =>{
        if (e.target.name==='stars'){
            console.log('stars!!')
            updateMovie({
                ...movie,
                stars:[...movie.stars,(e.target.value)]
            }) 
        }
        updateMovie({
            ...movie,
            [e.target.name]:e.target.value
        })
    }
    console.log(movie)
    const updateChange = (e) =>
    {
        updateMovie({
            ...movie,
            stars:[movie.stars]
        })
        console.log(movie)
        e.preventDefault()
        if (movie.stars.length===1){
        const id = props.match.params.id
        axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {console.log(res)
        this.setState({ movies: res.data })})
      .catch(err => console.log(err.response));}
    }


    return (
        <div>
            <form>
                <input type='text' name='title' onChange={handleChanges}/>
                <input type='text' name='director' onChange={handleChanges}/>
                <input type='text' name='metascore' onChange={handleChanges}/>
                <input type='array' name='stars' onChange={handleChanges}/>
                <button onClick={updateChange}>Update!</button>
            </form>
        </div>
    );
};

export default UpdateMovie;
import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  deleteMovie = () =>{
    const id = (this.props.match.params.id)
    console.log(id)
    axios
    .delete(`http://localhost:5000/api/movies/${id}`)
    .then(res=>{
      console.log(res)
      // this.setState({
      //   movie:[...this.state.movie,res]
      // })
      this.props.history.push('/')
    })
    .catch(err=>console.log(err))
  }

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  editMovie = () =>{
    const id = (this.props.match.params.id)
    this.props.history.push(`/update-movie/${id}`)
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <button onClick={this.editMovie}>Edit</button>
        <button onClick={this.deleteMovie}>Delete</button>
      </div>
    );
  }
}

import React from 'react';
import axios from 'axios';
import Movie from "./Movie";
import "./App.css";


class App extends React.Component{
  state ={
    isLoading: true,
    movie_list: []
  };

  getMovies = async ()=>{
    const {
      data:{
        data:{
          movies
        }
      }
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    //console.log(movies);
    this.setState({movie_list: movies, isLoading: false});
  };

  componentDidMount(){
    this.getMovies();
  };

  render(){
    const {isLoading, movie_list} = this.state;
    return (
    <div>
      <section className="container">
        {isLoading ? 
        (
          <div className="loader">
            <span className="loader_text">Loading...</span>
          </div>
        ):(
          <div className="movies">
                    {movie_list.map(movie =>{
                      return <Movie id={movie.id} year={movie.year} title={movie.title} summary={movie.summary} poster={movie.medium_cover_image} genres={movie.genres}/>}
                    )}
          </div>
        )} 
      </section>

    </div>
    );
  }
}

export default App;

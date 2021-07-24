import React from 'react';
import axios from 'axios';
import Movie from "./Movie";


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
    //const movies = await axios.get("https://yts-proxy.nomadcoders1.now.sh/list_movies.json");
    //console.log(movies);
    this.setState({movie_list: movies, isLoading: false});
  };

  componentDidMount(){
    this.getMovies();
  };

  render(){
    const {isLoading, movie_list} = this.state;
    return (
    <div>{isLoading ? 
      "Loading...": 
      movie_list.map(movie =>{
        console.log(movie); 
        return <Movie id={movie.id} year={movie.year} title={movie.title} sumary={movie.sumary} poster={movie.medium_cover_image}/>
        }
        )
      }
    </div>
    );
  }
}

export default App;

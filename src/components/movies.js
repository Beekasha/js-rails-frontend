class Movies {
    constructor() {
        this.movies = []
        this.adapter = new MoviesAdapter()
        this.omdbAdapter = new OmdbAdapter()
        this.initBindingsAndEventListeners()
        this.fetchAndLoadMovies()
        // this.afterFetchBindingsAndEventListeners()
        // this.clickedMovie = {}
        this.currentMovieId;

    }

    // let clickedMovie = {};

    initBindingsAndEventListeners() {
        this.moviesContainer = document.querySelector('#movies-container')
        this.movieForm = document.querySelector('#new-movie-form')
        this.movieSearch = document.querySelector('#new-movie-search')


        this.movieForm.addEventListener('submit', this.searchForMovie.bind(this))
    }

    fetchAndLoadMovies() {
        console.log("you hit the fetAndLoadMovies method")
        this.adapter.getMovies().then(movies => {
            movies.forEach(movie => this.movies.push(new Movie(movie)))
        })
        .then(() => {
            this.render()
        })
        .then(() => {
            this.afterFetchBindingsAndEventListeners()
        })
    }

    afterFetchBindingsAndEventListeners() {
       
        console.log("hitting the afterFetch")
        let posters = document.querySelectorAll('.rendered-posters')  // select all posters
     

        // listening for click on all posters
        posters.forEach(poster => {
            poster.addEventListener("click", (event) => {

                this.removeAllPosters(),
                fetch(`http://localhost:3000/movies/${event.target.id}`)
                .then(resp => resp.json())
                .then(data =>  this.renderSelectedMovie(data))
            })



            // let movie_id = poster.path[0].id
            // console.log(movie_id)
        })
    }

    renderSelectedMovie = (movie) =>
    {
        let main = document.querySelector("body");
        main.innerHTML = `
        <div>
            <h1> ${movie.title} (${movie.year}) </h1>
            <img src="${movie.poster}"/>
            <p>Rated: ${movie.rated}</p>
            <p>Runtime: ${movie.runtime}</p><br>
            <p>Director: ${movie.director}</p>
            <p>Actors: ${movie.actors}</p>
            <p>Plot: ${movie.plot}</p>
        </div>`
    }

    removeAllPosters() {
  
   
        let container = document.querySelector('.container') //select all data on main page
        container.parentNode.removeChild(container) // removes all posters from page
        console.log("posters removed")
        console.log(this)

        let header_text = document.querySelector('#header-text')
        header_text.innerHTML = `New Header`

        // let header = document.createElement("h1")
        // let header_text = document.createTextNode("new header")
        // document.body.insertBefore(header)




        // console.log(this.id)

        // Movies.prototype.fetchSingularMovieFromRailsApi(movieId).bind(this)
        // let movieClicked = new myMovie(movieId)
        // console.log(movieClicked.movieId)

        // movieClicked.adapter.getMovie(movieClicked.movieId)
        // .then(movie => {
        //     console.log(movie)
        //     console.log(this)
        //     // this.renderNewHtml(movie)
        // })
        
    }
    

    // renderNewHtml(movie) {
    //     console.log(movie.title)
    // }

    // fetchSingularMovieFromRailsApi(movieId) {
       
    //     console.log("fetchSingularMovie called")
    //     console.log(movieId)
    //     console.log(this)
    //     console.log(Movies.this)

    //     this.adapter.getMovie(movieId)
    //     .then(movie => {
    //         console.log(movie.title)
    //     })

    // }


    searchForMovie(e) {
        const value = this.movieSearch.value

        // wrapped in this if statement to prevent empty calls from being persisted
        if (value != "") {
            e.preventDefault()
            console.log("searchForMovie was called")
            
            console.log("should make call to OMDB API")

            
            

            
            let searchedMovie;
            this.omdbAdapter.getMovie(value)
            .then(movie => searchedMovie = movie)
            .then(() => this.saveMovieToApi(searchedMovie))
        } else {
            e.preventDefault()
            console.log("movie search is empty")
        }

    }

    saveMovieToApi(searchedMovie) {
        // select the correct keys
        let formattedMovieObj = this.makeMovieReadyForApiPost(searchedMovie)

        console.log("put the post request in here")
        console.log(formattedMovieObj.title)

        //call the fetch post in here from the adapter
        this.adapter.postMovieFetchRequest(formattedMovieObj)

    }

    makeMovieReadyForApiPost(searchedMovie) {
        console.log("makemovieready")
        let newMovie = {}
        newMovie.poster = searchedMovie.Poster
        newMovie.title = searchedMovie.Title
        newMovie.year = searchedMovie.Year
        newMovie.rated = searchedMovie.Rated
        newMovie.runtime = searchedMovie.Runtime
        newMovie.director = searchedMovie.Director
        newMovie.plot = searchedMovie.Plot
        newMovie.response = searchedMovie.Response
        newMovie.actors = searchedMovie.Actors
        console.log(newMovie)
        return newMovie
    }




    render() {
        // referencing moviesContainer in the initBindingsAndEventListeners method
        this.moviesContainer.innerHTML = this.movies.map(movie => movie.renderLi()).join('')
    }

    renderSingle() { //building this for the show page

    }
}
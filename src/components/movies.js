class Movies {
    constructor() {
        this.movies = []
        this.adapter = new MoviesAdapter()
        this.omdbAdapter = new OmdbAdapter()
        this.initBindingsAndEventListeners()
        this.fetchAndLoadMovies()
    }

    initBindingsAndEventListeners() {
        this.moviesContainer = document.querySelector('#movies-container')
        this.movieForm = document.querySelector('#new-movie-form')
        this.movieSearch = document.querySelector('#new-movie-search')
        // this.movieForm.addEventListener('submit', this.createMovie)

        // this.movieForm.addEventListener('submit', this.searchForMovie)
        // this.movieForm.addEventListener('submit', Movie.fetchAndLoadMovies)
        this.movieForm.addEventListener('submit', this.searchForMovie.bind(this))
        

    }

    searchForMovie(e) {
        e.preventDefault()
        console.log("searchForMovie was called")
        
        console.log("should make call to OMDB API")
        console.log(this)

        // Movie.testFunc()
        const value = this.movieSearch.value
        let searchedMovie;
        this.omdbAdapter.getMovie(value)
        .then(movie => searchedMovie = movie)
        .then(() => this.saveMovieToApi(searchedMovie))
        // let searchedMovie = movie
        // console.log(searchedMovie)
        // this.adapter.getMovie().then(movie => this.fetchedMovies.push(new Movie(movie)))

        // this.adapter.getMovie().then(movie => Movies.movies.push(new Movie(movie)))
        // .then(() => {
        //     this.render() // should rerender after pushing to the main Movies array
        // })
    }

    saveMovieToApi(searchedMovie) {
        // select the correct keys
        let formattedMovieObj = this.makeMovieReadyForApiPost(searchedMovie)

        console.log("put the post request in here")
        console.log(formattedMovieObj.title)
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

    // createMovie(e) {
    //     e.preventDefault() //default is having the page refresh on a form submit
    //     console.log("movie is being created")
    // }




    fetchAndLoadMovies() {
        console.log("you hit the fetAndLoadMovies method")
        this.adapter.getMovies().then(movies => {
            movies.forEach(movie => this.movies.push(new Movie(movie)))
        })
        .then(() => {
            this.render()
        })
    }

    render() {
        // referencing moviesContainer in the initBindingsAndEventListeners method
        this.moviesContainer.innerHTML = this.movies.map(movie => movie.renderLi()).join('')
    }
}
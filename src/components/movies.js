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


        this.movieForm.addEventListener('submit', this.searchForMovie.bind(this))
        



        

    }

    afterFetchBindingsAndEventListeners() {
        // select all posters
        let posters = document.querySelectorAll('.rendered-posters')

        // listening for click on all posters
        posters.forEach(poster => {
            poster.addEventListener("click", this.clickedPoster)
        })
        

    }

    clickedPoster(poster) {
        console.log("you've clicked on a poster")
    }


    searchForMovie(e) {
        const value = this.movieSearch.value

        // wrapped in this if statement to prevent empty calls from being persisted
        if (value != "") {
            e.preventDefault()
            console.log("searchForMovie was called")
            
            console.log("should make call to OMDB API")
            console.log(this)

            
            

            
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

    render() {
        // referencing moviesContainer in the initBindingsAndEventListeners method
        this.moviesContainer.innerHTML = this.movies.map(movie => movie.renderLi()).join('')
    }
}
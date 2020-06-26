class Movies {
    constructor() {
        this.movies = []
        this.adapter = new MoviesAdapter()
        this.initBindingsAndEventListeners()
        this.fetchAndLoadMovies()
    }

    initBindingsAndEventListeners() {
        this.moviesContainer = document.querySelector('#movies-container')
        this.movieForm = document.querySelector('#new-movie-form')
        // this.movieForm.addEventListener('submit', this.createMovie)

        // this.movieForm.addEventListener('submit', this.fetchOmdbApi)
        // this.movieForm.addEventListener('submit', Movie.fetchAndLoadMovies)
        this.movieForm.addEventListener('submit', Movie.fetchOmdbApi)
        

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
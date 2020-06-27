class Movie {
    constructor(movieJSON) {
        this.id = movieJSON.id // remove bc we're pulling from a 3rd party api??
        this.poster = movieJSON.poster
        this.title = movieJSON.title
        this.year = movieJSON.year
        this.rated = movieJSON.rated
        this.runtime = movieJSON.runtime
        this.director = movieJSON.director
        this.plot = movieJSON.plot
        this.response = movieJSON.response
        this.actors = movieJSON.actors
        this.fetchedMovies = []
        this.adapter = new OmdbAdapter()


        this.initBindingsAndEventListeners()

    }

    initBindingsAndEventListeners() {
        // this.moviesContainer = document.querySelector('#movies-container')
        // this.movieForm = document.querySelector('#new-movie-form')
        // this.movieForm.addEventListener('submit', this.createMovie)

        // this.movieForm.addEventListener('submit', this.fetchOmdbApi)
        // this.movieForm.addEventListener('submit', Movie.fetchAndLoadMovies)
        // this.movieForm.addEventListener('submit', this.fetchOmdbApi.bind(this))
        

    }

    renderLi() {
        return `<li><img src="${this.poster}" id=${this.id}></li>`
    }

    // fetchOmdbApi(e) {
    //     e.preventDefault()
    //     console.log("fetchOmdbApi was called")
        
    //     console.log("should make call to OMDB API")

    //     // Movie.testFunc()
    //     console.log(this)
    //     // this.adapter.getMovie().then(movie => this.fetchedMovies.push(new Movie(movie)))

    //     // this.adapter.getMovie().then(movie => Movies.movies.push(new Movie(movie)))
    //     // .then(() => {
    //     //     this.render() // should rerender after pushing to the main Movies array
    //     // })
    // }

    testFunc() {
        console.log(this.adapter)
        // console.log('test')
    }

    // fetchOmdbApi(e) {
    //     e.preventDefault()
    //     console.log("fetchOmdbApi was called")
        
    //     console.log("should make call to OMDB API")
    //     console.log(this)
    //     this.adapter.getMovie().then(movie => Movies.movies.push(new Movie(movie)))
    //     .then(() => {
    //         this.render()
    //     })

    // }
}
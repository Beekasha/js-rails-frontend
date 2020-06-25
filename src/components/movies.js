class Movies {
    constructor() {
        this.movies = []
        this.adapter = new MoviesAdapter()
        // this.bindEventListeners()
        this.fetchAndLoadMovies()
    }


    fetchAndLoadMovies() {
        console.log("you hit the fetAndLoadMovies method")
        this.adapter.getMovies().then(movies => {
            movies.forEach(movie => this.movies.push(new Movie(movie)))
            console.log(this.movies)
        })
        .then(() => {
            this.render()
        })
    }

    render() {
        console.log("rendering")
        const moviesPostersArray = this.movies.map(movie => `<li>${movie.poster}</li>`)
        console.log(moviesPostersArray)
        const moviesContainer = document.querySelector('#movies-container')
        // moviesContainer.innerHTML = `${}`
        // console.log('my posters are', this.movies)
    }
}
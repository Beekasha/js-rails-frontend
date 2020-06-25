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
        // console.log("rendering")
        // const moviesPostersString = this.movies.map(movie => `<li>${movie.poster}</li>`).join('')
        // console.log(moviesPostersString)
        const moviesContainer = document.querySelector('#movies-container')
        moviesContainer.innerHTML = this.movies.map(movie => `<li>${movie.poster}</li>`).join('')
        // console.log('my posters are', this.movies)
    }
}
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
            movies.forEach(movie => this.movies.push(movie))
        })
        .then(() => {
            this.render()
        })
    }

    render() {
        console.log("rendering")
        const moviesContainer = document.querySelector('#movies-container')
        moviesContainer.innerHTML = "posters should go here"
        console.log('my posters are', this.movies)
    }
}
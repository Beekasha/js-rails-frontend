class Movies {
    constructor() {
        this.movies = []
        this.adapter = new MoviesAdapter()
        this.initBindingsAndEventListeners()
        this.fetchAndLoadMovies()
    }

    initBindingsAndEventListeners() {
        this.moviesContainer = document.querySelector('#movies-container')
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
        // referencing moviesContainer in the initBindingsAndEventListeners method
        this.moviesContainer.innerHTML = this.movies.map(movie => movie.renderLi()).join('')
    }
}
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
            console.log(movies)
        })
    }
}
class MoviesAdapter {
    constructor() {
        this.baseUrl = 'http://localhost:3000/movies'
    }

    getMovies() {
        return fetch(this.baseUrl).then(res => res.json())
    }
}

// adapter = new MoviesAdapter()

// const movies = adapter.getMovies()
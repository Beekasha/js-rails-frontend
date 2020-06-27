class MoviesAdapter {
    constructor() {
        this.baseUrl = 'http://localhost:3000/movies'
    }

    getMovies() {
        return fetch(this.baseUrl).then(res => res.json())
    }

    // saveMovie(searchedMovie) {
    //     return fetch(this.baseUrl).then(res => res.json())
    // }
}


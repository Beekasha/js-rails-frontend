class MoviesAdapter {
    constructor() {
        this.baseUrl = 'localhost:3000/movies'
    }
}

getmovies() {
    return fetch(this.baseUrl).then(res => res.json())
}
class OmdbAdapter {
    constructor() {
        this.baseUrl = 'http://www.omdbapi.com/?apikey=9fa6058b&t=batman' //will change the search value
    }

    getMovie() {
        return fetch(this.baseUrl).then(res => res.json())
    }
}
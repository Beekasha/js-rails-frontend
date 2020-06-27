class OmdbAdapter {
    constructor() {
        this.baseUrl = 'http://www.omdbapi.com/?apikey=9fa6058b&t=batman' //will change the search value
    }

    getMovie(search) {
        console.log(`OmdbAdapter getMovie function called with value: ${search}`)
        return fetch(this.baseUrl).then(res => res.json())
    }
}
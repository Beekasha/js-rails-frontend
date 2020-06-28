class Movie {
    constructor(movieJSON) {
        this.id = movieJSON.id // remove bc we're pulling from a 3rd party api??
        this.poster = movieJSON.poster
        this.title = movieJSON.title
        this.year = movieJSON.year
        this.rated = movieJSON.rated
        this.runtime = movieJSON.runtime
        this.director = movieJSON.director
        this.plot = movieJSON.plot
        this.response = movieJSON.response
        this.actors = movieJSON.actors
        this.fetchedMovies = []
        this.adapter = new OmdbAdapter()
    }



    renderLi() {
        return `<img src="${this.poster}" id=${this.id} vspace="10" hspace="10" class="rendered-posters">`
    }


    testFunc() {
        console.log(this.adapter)
        // console.log('test')
    }


}
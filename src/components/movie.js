class Movie {
    constructor(movieJSON) {
        this.id = movieJSON.id
        this.poster = movieJSON.poster
        this.title = movieJSON.title
        this.year = movieJSON.year
        this.rated = movieJSON.rated
        this.runtime = movieJSON.runtime
        this.director = movieJSON.director
        this.plot = movieJSON.plot
        this.response = movieJSON.response
        this.actors = movieJSON.actors
    }

    renderLi() {
        return `<li><img src="${this.poster}" id=${this.id}></li>`
    }
}
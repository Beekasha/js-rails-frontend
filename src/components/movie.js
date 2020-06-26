class Movie {
    constructor(movieJSON) {
        this.id = movieJSON.id
        this.poster = movieJSON.poster
    }

    renderLi() {
        return `<li><img src="${this.poster}" id=${this.id}></li>`
    }
}
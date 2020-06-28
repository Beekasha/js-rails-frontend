class MoviesAdapter {
    constructor() {
        this.baseUrl = 'http://localhost:3000/movies'
    }

    getMovies() {
        return fetch(this.baseUrl).then(res => res.json())
    }

    postMovieFetchRequest(formattedMovieObj) {
        fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedMovieObj)
        })
        .then(res => res.json())
        .then(data => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
        })
        .then(() => location.reload()) //so we can render the new poster on the page now from our database

    }
}


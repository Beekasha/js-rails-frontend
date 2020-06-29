class MoviesAdapter {
    constructor() {
        this.baseUrl = 'http://localhost:3000/movies'
        this.reviewUrl = 'http://localhost:3000/reviews'
    }

    getMovies() {
        return fetch(this.baseUrl).then(res => res.json())
    }

    getMovie(movieId) {
        console.log(`${this.baseUrl}/${movieId}`)
        return fetch(`${this.baseUrl}/${movieId}`).then(res => res.json())
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

    deleteMovie(id) {
        console.log("hitting delete movie func")
        console.log(id)
        fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
        })
        .then(() => location.reload())
    }

    postReviewFetchRequest(newReviewObj) {
        fetch(this.reviewUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReviewObj)
        })
        .then(res => res.json())
        .then(data => {
            console.log('Success:', data);

          })
          .catch((error) => {
            console.error('Error:', error);
        })
        .then(() => location.reload())
    }
}


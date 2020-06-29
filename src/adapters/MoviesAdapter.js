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

            //data.id is available here, so call the postReviewFetchRequest here
            // this.postReviewFetchRequest(data.id)
          })
          .catch((error) => {
            console.error('Error:', error);
        })
        .then(() => location.reload()) //so we can render the new poster on the page now from our database

    }

    // postReviewFetchRequest(id) {
    //     let newReview = {}
    //     newReview.movie_id = id
    //     newReview.body = ""
    //     fetch(this.reviewUrl, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(newReview)
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log('Success:', data);
    //         debugger
    //     })
    //       .catch((error) => {
    //         console.error('Error:', error);
    //     })
    // }
}


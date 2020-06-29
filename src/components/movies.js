class Movies {
    constructor() {
        this.movies = []
        this.adapter = new MoviesAdapter()
        this.omdbAdapter = new OmdbAdapter()
        this.initBindingsAndEventListeners()
        this.fetchAndLoadMovies()

    }

 

    initBindingsAndEventListeners() {
        this.moviesContainer = document.querySelector('#movies-container')
        this.movieForm = document.querySelector('#new-movie-form')
        this.movieSearch = document.querySelector('#new-movie-search')


        this.movieForm.addEventListener('submit', this.searchForMovie.bind(this))
    }

    fetchAndLoadMovies() {
        console.log("you hit the fetAndLoadMovies method")
        this.adapter.getMovies().then(movies => {
            movies.forEach(movie => this.movies.push(new Movie(movie)))
        })
        .then(() => {
            this.render()
        })
        .then(() => {
            this.afterFetchBindingsAndEventListeners()
        })
    }

    afterFetchBindingsAndEventListeners() {
       
        console.log("hitting the afterFetch")
        let posters = document.querySelectorAll('.rendered-posters')  // select all posters
     

        // listening for click on all posters
        posters.forEach(poster => {
            poster.addEventListener("click", (event) => {

                this.removeAllPosters(),
                fetch(`http://localhost:3000/movies/${event.target.id}`)
                .then(resp => resp.json())
                .then(data =>  this.renderSelectedMoviePage(data))
            })

            poster.addEventListener("contextmenu", (event) => {
                // console.log("")
                this.adapter.deleteMovie(event.target.id)
            })

        })
    }

    renderSelectedMoviePage = (movie) =>
    {
        let main = document.querySelector("body");
        main.innerHTML = 
        `
        <div>
            <h1> ${movie.title} (${movie.year}) </h1>
            <img src="${movie.poster}" id="${movie.id}"/>
            <p>Rated: ${movie.rated}</p>
            <p>Runtime: ${movie.runtime}</p><br>
            <p>Director: ${movie.director}</p>
            <p>Actors: ${movie.actors}</p>
            <p>Plot: ${movie.plot}</p>
            <p>
                Reviews: 
                <ul id="reviews-list">
                </ul>
            </p>
            <div id="new-review-container">
            <form id="new-review-form">
                <input type="text" name="review-body" id="new-review-body">
                <input type="submit" value="Save review">
            </form><br>
            </div>
            
            <button type="button" onclick="location.reload()">Back to Watchlist</button>
        </div>
        `
        console.log("under this should be my array of Li")


        this.fetchReviewsByMovieId(movie.id)

        let new_review_form = document.querySelector('#new-review-form')
        console.log(new_review_form)
        new_review_form.addEventListener('submit', this.saveNewReview.bind(this))

    }

    saveNewReview(e) {
        e.preventDefault()
        let img = document.querySelector('img')
        let movie_id = img.id
        console.log("saveNewReview hit")
        console.log(movie_id)

        let review_body = document.querySelector('#new-review-body')
        if (review_body.value === "") {
            console.log("shit is empty bruh")
        } else {
            //fetch to save review with movie_id
            let new_review_obj = {}
            new_review_obj.movie_id = movie_id
            new_review_obj.body = review_body.value
            console.log(new_review_obj)

            this.adapter.postReviewFetchRequest(new_review_obj)
        }

    }

    fetchReviewsByMovieId(movie_id) {
        console.log("hitting fetchReviews")

        fetch(`http://localhost:3000/reviews/${movie_id}`)
        .then(resp => resp.json())
        // .then(data => console.log(data)) //movies pulled from api do not have reviews
        .then(data => data.map(review => review.body))
        .then(reviews => this.createReviewLi(reviews))
    }

    createReviewLi(reviews_array) {
        console.log("yoooo")
        console.log(reviews_array)

        let reviews_list = reviews_array.map(review => `<li>${review}</li>`)
        
        let list = document.querySelector('#reviews-list')
        console.log(reviews_list)
        console.log(list)
        // document.getElementById("reviews-list").innerHTML = reviews_list;
        if ((reviews_list.length === 0) || (reviews_list === undefined))  {
            list.innerHTML = "(you have no reviews saved)"
        } else {
            list.innerHTML = reviews_list.join('')
        }
        
    }



    removeAllPosters() {
        let container = document.querySelector('.container') //select all data on main page
        container.parentNode.removeChild(container) // removes all posters from page
        console.log("posters removed")
        
    }


    searchForMovie(e) {
        const value = this.movieSearch.value

        // wrapped in this if statement to prevent empty calls from being persisted
        if (value != "") {
            e.preventDefault()
            console.log("searchForMovie was called")
            
            console.log("should make call to OMDB API")
            let searchedMovie;
            this.omdbAdapter.getMovie(value)
            .then(movie => searchedMovie = movie)
            .then(() => this.saveMovieToApi(searchedMovie))
        } else {
            e.preventDefault()
            console.log("movie search is empty")
        }

    }

    saveMovieToApi(searchedMovie) {
        // select the correct keys
        let formattedMovieObj = this.makeMovieReadyForApiPost(searchedMovie)

        console.log("put the post request in here")
        console.log(formattedMovieObj.title)

        //call the fetch post in here from the adapter
        this.adapter.postMovieFetchRequest(formattedMovieObj)
 

        //needs something to add a review obj w an empty array

    }

    makeMovieReadyForApiPost(searchedMovie) {
        console.log("makemovieready")
        let newMovie = {}
        newMovie.poster = searchedMovie.Poster
        newMovie.title = searchedMovie.Title
        newMovie.year = searchedMovie.Year
        newMovie.rated = searchedMovie.Rated
        newMovie.runtime = searchedMovie.Runtime
        newMovie.director = searchedMovie.Director
        newMovie.plot = searchedMovie.Plot
        newMovie.response = searchedMovie.Response
        newMovie.actors = searchedMovie.Actors
        console.log(newMovie)
        return newMovie

    }




    render() {
        // referencing moviesContainer in the initBindingsAndEventListeners method
        this.moviesContainer.innerHTML = this.movies.map(movie => movie.renderLi()).join('')
    }

    renderSingle() { //building this for the show page

    }
}
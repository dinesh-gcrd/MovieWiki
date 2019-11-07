jQuery(function($){
	var $searchField = $("#search"),
		$spinner = $(
			'<div class="rect1"></div>'+
			'<div class="rect2"></div>'+
			'<div class="rect3"></div>'+
			'<div class="rect4"></div>'+
			'<div class="rect5"></div>'+
			'</div>'),
		omdbMovieURL = "http://www.omdbapi.com/?apikey=83b03d8e&s=";   //Initializing omdb url appending with API key My API KEY is 83b03d8e and we have to pass data to variable s
	$('form').submit(function(e){
		e.preventDefault(); 
		var movieSearch = $searchField.val(),                                        // taking the user input value
		omdbMovieRequest = omdbMovieURL + encodeURIComponent(movieSearch),            // appending to the url
		moviesHTML = "",
		img = "";
		function displayMovies(data) {                                                 // handling the responses
			if(data.Response === "True"){
				$.each(data.Search, function(i, movies){
					img = '<a href="http://www.imdb.com/title/'+movies.imdbID+
						'/"><img class="movie-poster" src="'+ movies.Poster +'"></a>';                    
					if(movies.Poster === "N/A"){
						img = '<a href="http://www.imdb.com/title/'+movies.imdbID+
							'/"><i class="material-icons poster-placeholder">crop_original</i></a>';               // for positive responses
					}                                                                                         //linked with IMDB site so, the selected movies details will be shown through imdb

					moviesHTML += '<li><div class="poster-wrap">';
					moviesHTML += img +
						'</div><span class="movie-title">' + movies.Title +
						'</span><span class="movie-year">' + movies.Year +
						'</span></li>'

				});
			}
			else{
				if(data.Error === "Movie not found!"){
					setMoviesOnError("No movies found that match: "+movieSearch+".");
				}
				else if(data.Error === "Something went wrong."){
					setMoviesOnError("An error occurred in processing your request, please try again.");              // for negative responses 
				}																									// error handling
				else{
					setMoviesOnError("Something unexpected occurred, please try again.");
				}
			}
			$('#movies').html(moviesHTML);
		}

		$.getJSON(omdbMovieRequest, displayMovies).fail(															// ajax request
			function(jqXHR){
			setMoviesOnError("An error occurred while connecting with the movie Server, please try to search again.");
			$('#movies').html(moviesHTML);

		}); 
		function setMoviesOnError(str){
			moviesHTML = " <li class='no-movies centered'>" +
				"<i class='material-icons icon-help'>help_outline</i>"+ str +"</li>";
		}

	}); 
}); 
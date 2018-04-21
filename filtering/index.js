(function($) {
  const API_KEY = "KzDpN6ONGfNFb4NgPoBPAHwpZvkck4gK";
  const CORS = "https://cors-anywhere.herokuapp.com";

  $.ajax({
    url: `${CORS}/https://api.internationalshowtimes.com/v4/cities`,
    crossDomain: true,
    type: "GET",
    data: {
      query: "San Jose",
      counties: "US"
    },
    headers: {
      "X-API-Key": API_KEY
    }
  }).then(response => {
    const city = response.cities[0].id;

    $.ajax({
      url: `${CORS}/https://api.internationalshowtimes.com/v4/showtimes`,
      crossDomain: true,
      type: "GET",
      data: {
        append: "movies,cinemas",
        fields: "id,cinema_id,movie_id,start_at",
        cinema_fields: "id,name",
        movie_fields: "id,title,poster_image_thumbnail",
        city_ids: city,
        counties: "US"
      },
      headers: {
        "X-API-Key": API_KEY
      }
    }).done(response => {
      const { cinemas, movies, showtimes } = response;

      // Create main data container for all theaters that within the vicinity of user's specified location
      const theaters = [];

      // Create a theater object to contain all information related to the theater (e.g. id, name, movies @ theater, showtimes for each movie)
      const theater = {};

      /**
       * Build out our data container by looping through all the information we're giving from API. This variable will be a multidimensional array of theaters.
       *
       * * We already know that our data container will be empty so there is no need to check if a theater exists in it same goes for list of available movies.
       *
       * * * Step 1
       * * Loop through the API's returned list of 'cinemas' to build initial data container.
       * * Each available cinema that the API returns to us will occupy a single object with specific data of our choosing. (e.g. id, name, movies)
       * * The `movies` property attached to this object will be array. (i.e. theater.movies = []; )
       *
       * @return array - list of theaters with specific data
       */
      const ts = cinemas.map(cinema => {
        const theater = {};

        theater["name"] = cinema.name;
        theater["id"] = cinema.id;

        /**
         * * * Step 2
         * * Loop through the API's returned list of 'movies' to build out a theaters array of available movies
         * * Each available movie that the API returns to us will occupy a single object with specific data of our choosing. (e.g. id, name, showtimes)
         * * The `showtimes` property attached to this object will be array. (i.e. theater.movies.showtimes = []; )
         *
         * @return array - list of movie objects with specific data
         */
        theater["movies"] = movies.map(movie => {
          const m = {};
          m["id"] = movie.id;
          m["name"] = movie.title;
          m["thumbnail"] = movie.poster_image_thumbnail;

          /**
           * * * Step 3 - FINAL
           * * Loop through the API's returned list of 'showtimes'
           * * We only want the showtimes for the current movie element that we are currently on and only if the showtime is available at the current theater
           *
           * @return array - list of showtime objects that satisfy a specific condition
           */
          m["showtimes"] = showtimes.filter(showtime => {
            return (
              showtime.movie_id === movie.id && showtime.cinema_id === cinema.id
            );
          });

          return m;
        });

        return theater;
      });

      console.log(showtimes);
      const $container = $(".container-fluid");

      $.each(ts, function(index, object) {
        const theaterContainer = $("<div>");
        theaterContainer.addClass("row");
        const theaterName = $("<h1>");
        theaterName.addClass("font-weight-bold");
        theaterName.text(object.name);

        const moviesContainer = $("<ul>");
        moviesContainer.addClass("list-group w-100 p-3");

        $.each(object.movies, function(index, movie) {
          if (movie.showtimes.length === 0) {
            return;
          }

          const $movie = $("<li>"); // container for individual movies (we want to keep li elements as containers to preserve ul indentation)
          $movie.addClass("list-group-item");
          $movie.css({
            display: "flex",
            flexWrap: "wrap"
          });

          const movieName = $("<h4>");
          movieName.text(movie.name);
          movieName.css({ flexBasis: "100%" });

          const movieThumbnail = $("<img>");
          movieThumbnail.attr("src", movie.thumbnail);
          movieThumbnail.css({
            width: "150px",
            height: "auto",
            maxWidth: "100%"
          });

          $movie.append(movieName);
          $movie.append(movieThumbnail);

          const showtimesContainer = $("<ul>");
          showtimesContainer.addClass("list-group ml-5");
          showtimesContainer.css({ flex: "1" });

          $.each(movie.showtimes, function(index, showtime) {
            const time = $("<li>");
            time.addClass("list-group-item");
            time.text(
              moment(showtime.start_at).format("dddd, MMMM Do YYYY, h:mm a")
            );

            showtimesContainer.append(time);

            return index < 4; // remove this line to get rid of limit OR modify the number
          });

          $movie.append(showtimesContainer);
          moviesContainer.append($movie);
        });

        theaterContainer.append(theaterName);
        theaterContainer.append(moviesContainer);
        $container.append(theaterContainer);
      });
    });
  });
})(jQuery);

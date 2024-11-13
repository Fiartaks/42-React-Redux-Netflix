import axios from "axios";
import { useEffect, useState } from "react";
import { baseImgURL, options } from "../constant"; // mevcut sabit dosyalar
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from 'react-router-dom';

const MovieList = ({ genre }) => {
  const [movies, setMovies] = useState([]);
  const [trailers, setTrailers] = useState({});

  useEffect(() => {
    if (genre && genre.id) {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}`,
          options
        )
        .then((res) => setMovies(res.data.results))
        .catch((error) => console.error("Error fetching movies: ", error));
    }
  }, [genre]);

  const fetchTrailer = async (movieId) => {
    if (!trailers[movieId]) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          options
        );
        const youtubeTrailer = response.data.results.find(
          (video) => video.site === 'YouTube' && video.type === 'Trailer'
        );
        setTrailers((prev) => ({
          ...prev,
          [movieId]: youtubeTrailer ? youtubeTrailer.key : null
        }));
      } catch (error) {
        console.error("Error fetching trailer: ", error);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-3">{genre?.name}</h1>

      <Splide options={{
        gap: '10px',
        autoWidth: true,
        pagination: false,
      }}>
        {movies && movies.map((movie) => (
          <SplideSlide key={movie.id}>
            <div
              className="movie-wrapper"
              onMouseEnter={() => fetchTrailer(movie.id)}
            >
              <Link to={`/detay/${movie.id}`}>
                <img
                  className="movie"
                  src={baseImgURL + movie.poster_path}
                  alt={movie.title}
                />
              </Link>
              {trailers[movie.id] && (
                <div className="trailer">
                  <iframe
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${trailers[movie.id]}?autoplay=1&mute=1`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <div className="rating">
                    <span>IMDb : {movie.vote_average}</span>
                  </div>
                </div>
              )}
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default MovieList;
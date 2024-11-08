import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseImgURL, options } from "../constant";
import { millify } from "millify";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { FaFacebook, FaInstagram } from 'react-icons/fa'; 




const DetailPage = () => {
  const [movie, setMovie] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(
        `/movie/${id}?append_to_response=credits,videos,reviews&language=en-US`,
        options
      )
      .then((res) => setMovie(res.data));
  }, []);

  return (
    <div className="row">
      {!movie ? (
        <div className="spinner-border text-primary" role="status"></div>
      ) : (
        <>
          {/*Ust alan */}
          <div className="col-12 banner">
            <img
              className="w-100 h-100 object-fit-cover"
              src={baseImgURL + movie.backdrop_path}
            />

            <div className="banner-bg">
              <span>{movie.title}</span>
            </div>
          </div>

        <div className="container p-4 p-md-5">

          {/* sol taraf */}
          <div className="col-md mt-4">
            <h3>Production Companies</h3>

            <div className="d-flex flex-wrap gap-4">
              {movie.production_companies.map((i) => (
                <div
                  className="bg-white rounded p-2 d-flex align-items-center"
                  key={i}
                >
                  {i.logo_path ? (
                    <img
                      className="object-fit-contain"
                      width={100}
                      height={50}
                      src={baseImgURL + i.logo_path}
                    />
                  ) : (
                    <span className="company">{i.name}</span>
                  )}
                </div>
              ))}
            </div>

            <h3 className="mt-4">Spoken Languages</h3>

            <div className="d-flex flex-wrap gap-4">
              {movie.spoken_languages.map((i) => (
                <div
                  className="bg-white rounded p-2 d-flex align-items-center"
                  key={i}
                >
                  <span className="company">{i.name}</span>
                </div>
              ))}
            </div>

            <h3 className="mt-4">Production Countries</h3>

            <div className="d-flex flex-wrap gap-4">
              {movie.production_countries.map((i) => (
                <div
                  className="bg-white rounded p-2 d-flex align-items-center"
                  key={i}
                >
                  <span className="company">{i.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* sag taraf */}
          <div className="col-md-6 mt-4">
            <p className="lead">{movie.overview}</p>

            <p className="fs-5">
              <span>Budget: </span>
              <span className="text-success">{millify(movie.budget)} $</span>
            </p>

            <p className="fs-5">
              <span>Revenue: </span>
              <span className="text-success">{millify(movie.revenue)} $</span>
            </p>
          </div>

          {/* Oyuncular */}
          <div className="col-12 my-3">
            <h2>Cast</h2>

            <Splide
              options={{
                height: "200px",
                gap: "10px",
                pagination: false,
                autoWidth: true,
              }}
            >
              {movie.credits.cast.map((i) => (
                <SplideSlide key={i}>
                  <div className="actor-card h-100">
                    <img
                      className="movie"
                      src={
                        i.profile_path
                          ? baseImgURL + i.profile_path
                          : "/default.jpg"
                      }
                    />

                    <p>
                      <span>{i.character}</span>
                      <span>{i.name}</span>
                    </p>
                  </div>
                </SplideSlide>
              ))}
            </Splide>
          </div>

          {/* Film videosu */}
          <div className="my-5 ">
            <h1>Trailer</h1>
            <Splide options={{
              height:'50vh'
            }}>
            {movie.videos.results.map((video) => (
              <SplideSlide key={id}>
              <iframe key={id}
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.key}`}
              ></iframe>
              </SplideSlide>
            ))}
            </Splide>
          </div>

          <div className="my-5">
              <h2 >Reviews</h2>
              {movie.reviews.results.length > 0 ? (
                movie.reviews.results.map((review) => (
                  <div key={review.id} className="review-card my-3 p-3 bg-light rounded">
                    <h5 className="text-black">{review.author}</h5>
                    <p className="text-black">{review.content}</p>
                  </div>
                ))
              ) : (
                <p>Henüz yorum bulunmamaktadır.</p>
              )}
            </div>
 

{/* Sosyal Medya Paylaşım Butonları */}
<div className="my-5">
    <h2>Share This Movie</h2>
    <div>
        <button className="btn btn-primary" onClick={() => window.open('https://www.facebook.com/sharer/sharer.php?u=' + window.location.href, '_blank')}>
            <FaFacebook /> Facebook
        </button>
        
        <button className="btn btn-danger" onClick={() => window.open('https://www.instagram.com/?url=' + window.location.href, '_blank')}>
            <FaInstagram /> Instagram
        </button>
    </div>
</div>






          </div>
        </>
      )}
    </div>
  );
};

export default DetailPage;

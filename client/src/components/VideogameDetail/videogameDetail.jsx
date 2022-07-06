import React, { useEffect } from "react";
import Footer from "../Home/footer";
import s from "./videogameDetail.module.scss";
import { useParams } from "react-router-dom";
import { fetchVideogamesDetail } from "../../Redux/thunks/videogameThunks";
import { clearVideogameDetail } from "../../Redux/slices/videogameSlice";
import { useDispatch, useSelector } from "react-redux";

const VideogameDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { videogamesDetail } = useSelector((state) => state.videogames);

  useEffect(() => {
    dispatch(fetchVideogamesDetail(id));
    return () => dispatch(clearVideogameDetail());
  }, [dispatch, id]);

  return (
    <div>
      {videogamesDetail.name ? (
        <div className={s.mainContainer}>
          <div className={s.detailContainer}>
            <section className={s.descriptionContainer}>
              <h2>{videogamesDetail.name}</h2>
              <h4>
                <span>Released: </span>
                {videogamesDetail.released}
              </h4>
              <h4 className={s.rating}>
                <span>Rating: </span>
                {videogamesDetail.rating}
              </h4>
              <span>Description:</span>
              <p
                dangerouslySetInnerHTML={{
                  __html: videogamesDetail.description,
                }}
              />
              <div className={s.genresPlatforms}>
                <ul className={s.genres}>
                  <h4>Genres:</h4>
                  {videogamesDetail.genres?.map((genre) => (
                    <li>{genre.name}</li>
                  ))}
                </ul>
                <ul>
                  <h4>Platforms:</h4>
                  {videogamesDetail.createdInDb
                    ? videogamesDetail.platforms?.map((platform) => (
                        <li>{platform}</li>
                      ))
                    : videogamesDetail.platforms?.map((platform) => (
                        <li>{platform.platform.name}</li>
                      ))}
                </ul>
              </div>
            </section>
            <div className={s.imagecontainer}>
              <img src={videogamesDetail.image} alt={videogamesDetail.name} />
            </div>
          </div>
        </div>
      ) : (
        <div className={s.loaderContainer}>
          <span className={s.loader}></span>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default VideogameDetail;

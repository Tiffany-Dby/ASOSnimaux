import { useEffect } from "react";
import TestimonyCard from "../TestimonyCard/TestimonyCard";
import "./homeTestimonies.scss";
import { useDispatch, useSelector } from "react-redux";
import { getTestimoniesOverviewThunk } from "../../api/testimony.api";
import { setToLocalDate } from "../../utils/date.utils";
import { APP_ROUTES } from "../../constants/route.const";
import { Link } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

const HomeTestimonies = () => {
  const dispatch = useDispatch();

  // Testimony Reducer
  const { testimonies } = useSelector(state => state.testimonyReducer);
  const { overview } = testimonies;

  // Fetching Testimonies overview
  useEffect(() => {
    dispatch(getTestimoniesOverviewThunk());
  }, []);

  return (
    <>
      <section className="testimonies-overview">
        <div className="title-wrapper">
          <h2>Témoignages</h2>
        </div>
        <article className="testimonies__wrapper">
          <h3>Les derniers témoignages</h3>
          <div className="testimonies__slider">
            <ul className="testimonies__slides">
              {overview.map((testimony, index) => (
                <li key={testimony.id} id={`testimonies__slide--${index + 1}`} className="testimonies__slide">
                  <TestimonyCard
                    author={testimony.username}
                    imgUrl={`${APP_ROUTES.API_URL}${testimony.avatar_url}`}
                    date={setToLocalDate(testimony.date)}
                    text={testimony.truncated_content}
                  />
                  <a
                    className="testimonies__link testimonies--previous"
                    href={index === 0 ? `#testimonies__slide--${overview.length}` : `#testimonies__slide--${index}`}></a>
                  <a
                    className="testimonies__link testimonies--next"
                    href={overview.length === index + 1 ? `#testimonies__slide--1` : `#testimonies__slide--${index + 2}`}></a>
                </li>
              ))}
            </ul>
            <Breadcrumbs>
              {overview.map((testimony, index) => (
                <a
                  key={index}
                  className={""}
                  href={`#testimonies__slide--${index + 1}`}></a>
              ))}
            </Breadcrumbs>
          </div>
        </article>
      </section>
    </>
  );
}

export default HomeTestimonies;
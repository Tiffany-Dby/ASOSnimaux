import "./homeTestimonies.scss";
import TestimonyCard from "../TestimonyCard/TestimonyCard";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTestimoniesOverviewThunk } from "../../api/testimony.api";
import { setToLocalDate } from "../../utils/date.utils";
import { APP_ROUTES } from "../../constants/route.const";

const HomeTestimonies = () => {
  const dispatch = useDispatch();
  const testimoniesRef = useRef(null);

  // Testimony Reducer
  const { testimonies } = useSelector(state => state.testimonyReducer);
  const { overview } = testimonies;

  // Overview -> Index of current testimony displayed
  const [currentIndex, setCurrentIndex] = useState(0);


  // Fetching Testimonies overview
  useEffect(() => {
    dispatch(getTestimoniesOverviewThunk());
  }, []);

  // *************** Testimonies Overview Slider ***************
  // Get slide width
  const getSlideWidth = () => {
    const slideWidth = testimoniesRef.current.getBoundingClientRect().width;
    return slideWidth;
  }

  // Go to previous slide based on slide width
  const handlePrevious = e => {
    e.preventDefault();
    const slideWidth = getSlideWidth();

    // Check if it's the first slide
    if (testimoniesRef.current.scrollLeft === 0) {
      // Go to last slide and update currentIndex
      testimoniesRef.current.scrollLeft = slideWidth * (overview.length - 1);
      setCurrentIndex(overview.length - 1)
    } else {
      // Go to previous slide and update currentIndex
      testimoniesRef.current.scrollLeft += -slideWidth;
      setCurrentIndex(currentIndex - 1)
    }
  }

  // Go to next slide
  const handleNext = e => {
    e.preventDefault();
    const slideWidth = getSlideWidth();

    // Check if it's the last slide
    if (testimoniesRef.current.scrollLeft === slideWidth * (overview.length - 1)) {
      // Go to first slide and update currentIndex
      testimoniesRef.current.scrollLeft = 0;
      setCurrentIndex(0)
    } else {
      // Go to next slide and update currentIndex
      testimoniesRef.current.scrollLeft += slideWidth;
      setCurrentIndex(currentIndex + 1)
    }
  }

  // Breadcrumbs -> Slider navigation
  const handleNavigate = (e, index) => {
    e.preventDefault();

    // Get width of slide -> multiply slideWidth with index to set the value of scrollLeft and update currentIndex
    const slideWidth = getSlideWidth();
    testimoniesRef.current.scrollLeft = index * slideWidth;

    setCurrentIndex(index);
  }
  // *************** End Testimonies Overview Slider ***************

  return (
    <>
      <section className="testimonies-overview">
        <div className="title-wrapper">
          <h2>Témoignages</h2>
        </div>
        <article className="testimonies__wrapper">
          <h3>Les derniers témoignages</h3>
          <div className="testimonies__slider">
            <ul className="testimonies__slides" ref={testimoniesRef}>
              {overview.map((testimony, index) => (
                <li key={testimony.id} id={`testimonies__slide--${index + 1}`} className="testimonies__slide">
                  <TestimonyCard
                    author={testimony.username}
                    imgUrl={`${APP_ROUTES.API_URL}${testimony.avatar_url}`}
                    date={setToLocalDate(testimony.date)}
                    text={testimony.truncated_content}
                  />
                  <a
                    onClick={handlePrevious}
                    className="testimonies__link testimonies--previous"
                    href={index === 0 ? `#testimonies__slide--${overview.length}` : `#testimonies__slide--${index}`}></a>
                  <a
                    onClick={handleNext}
                    className="testimonies__link testimonies--next"
                    href={overview.length === index + 1 ? `#testimonies__slide--1` : `#testimonies__slide--${index + 2}`}></a>
                </li>
              ))}
            </ul>
            <Breadcrumbs>
              {overview.map((testimony, index) => (
                <a
                  onClick={(e) => handleNavigate(e, index)}
                  key={index}
                  className={index === currentIndex ? "active" : ""}
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
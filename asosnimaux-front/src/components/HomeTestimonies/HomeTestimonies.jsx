import { useEffect } from "react";
import TestimonyCard from "../TestimonyCard/TestimonyCard";
import "./homeTestimonies.scss";
import { useDispatch, useSelector } from "react-redux";
import { getTestimoniesOverviewThunk } from "../../api/testimony.api";
import { setToLocalDate } from "../../utils/date.utils";

const HomeTestimonies = () => {
  const dispatch = useDispatch();

  // Testimony Reducer
  const { testimonies } = useSelector(state => state.testimonyReducer);
  const { overview } = testimonies;

  // Fetching Testimonies overview
  useEffect(() => {
    dispatch(getTestimoniesOverviewThunk());
    console.log(overview)
  }, []);

  return (
    <>
      <section className="testimonies-overview">
        <div className="testimonies__slider">
          <ul className="testimonies__slides">
            <li className="testimonies__slides__1">
              {overview.map((testimony, index) => (
                <TestimonyCard key={testimony.id} title={testimony.username} date={setToLocalDate(testimony.date)} text={testimony.truncated_content} />
              ))}
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default HomeTestimonies;
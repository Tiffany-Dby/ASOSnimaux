import "./informations.scss";
import Map from "../Map/Map";
import Address from "../Address/Address";
import Contact from "../Contact/Contact";
import Schedules from "../Schedules/Schedules";
import SocialMedia from "../SocialMedia/SocialMedia";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateWindowSize } from "../../redux/reducers/window.reducer";

const Informations = () => {
  const dispatch = useDispatch();

  const { width } = useSelector(state => state.windowReducer);

  useEffect(() => {
    const handleResize = () => dispatch(updateWindowSize({ width: window.innerWidth }));

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <>
      <section className="informations">
        <div className="informations__wrapper">
          <div className="title-wrapper">
            <h2>Informations</h2>
          </div>
          <Map />
          <Address />
          <Contact />
          <Schedules />
          <SocialMedia />
          {width > 1024 &&
            <div className="informations__img">
              <img src="/01854sdf1544847.jpg" alt="Un chien marron qui sourrit la langue pendante" />
            </div>
          }
        </div>
      </section>
    </>
  )
}

export default Informations;
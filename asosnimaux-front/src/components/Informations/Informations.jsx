import Address from "../Address/Address";
import Contact from "../Contact/Contact";
import Map from "../Map/Map";
import Schedules from "../Schedules/Schedules";
import SocialMedia from "../SocialMedia/SocialMedia";
import "./informations.scss";

const Informations = () => {
  return (
    <>
      <section className="informations">
        <div className="title-wrapper">
          <h2>Informations</h2>
        </div>
        <Map />
        <Address />
        <Schedules />
        <Contact />
        <SocialMedia />
      </section>
    </>
  )
}

export default Informations;
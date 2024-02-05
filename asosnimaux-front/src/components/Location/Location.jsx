import "./location.scss";

const Location = () => {
  return (
    <>
      <div className="title-wrapper">
        <h2>Localisation</h2>
      </div>

      <div className="location__content">
        <article className="location__map">
          <h3 className="location__subtitle">Où nous trouver ?</h3>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2828.612725849077!2d-0.5734848228442495!3d44.84981967421971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5528786a29ed39%3A0x4cf77a1537c38a4c!2s8%20Parv.%20des%20Chartrons%2C%2033000%20Bordeaux!5e0!3m2!1sfr!2sfr!4v1706353173749!5m2!1sfr!2sfr" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </article>

        <article className="location__address">
          <h3 className="location__subtitle">Adresse</h3>
          <div className="location__details">
            <p><span>ASOS'NIMAUX</span></p>
            <p>8, Parvis des Chartrons</p>
            <p>33000 Bordeaux</p>
            <p>FRANCE</p>
          </div>
        </article>
      </div>
    </>
  );
}

export default Location;
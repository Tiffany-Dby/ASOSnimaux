import "./contact.scss";

const Contact = () => {
  return (
    <>
      <div className="title-wrapper">
        <h2>Contact</h2>
        <div className="title__decoration"></div>
      </div>

      <div className="contact__details">
        <div>
          <p>Téléphone</p>
          <a href="tel:+0143010203">01.43.01.02.03</a>
        </div>
        <div>
          <p>Email</p>
          <a href="mailto:asosnimaux@contact.fr">asosnimaux@contact.fr</a>
        </div>
      </div>
    </>
  )
}

export default Contact;
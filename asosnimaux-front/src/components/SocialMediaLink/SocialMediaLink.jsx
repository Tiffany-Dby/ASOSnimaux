import "./socialMediaLink.scss";

const SocialMediaLink = () => {
  return (
    <>
      <ul className="social-media-list">
        <li><a href="https://www.facebook.com/"><img src="/facebook.svg" alt="Logo Facebook" /></a></li>
        <li><a href="https://twitter.com/"><img src="/x.svg" alt="Logo X" /></a></li>
        <li><a href="https://www.instagram.com/"><img src="/instagram.svg" alt="Logo Instagram" /></a></li>
        <li><a href="https://www.youtube.com/"><img src="/youtube.svg" alt="Logo Youtube" /></a></li>
        <li><a href="https://www.linkedin.com/"><img src="/linkedin.svg" alt="Logo Linkedin" /></a></li>
      </ul>
    </>
  )
}

export default SocialMediaLink;
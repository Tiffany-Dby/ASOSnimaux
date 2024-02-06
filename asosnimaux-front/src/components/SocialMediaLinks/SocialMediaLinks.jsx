import "./socialMediaLinks.scss";
import { FaLinkedin, FaSquareFacebook, FaSquareInstagram, FaSquareXTwitter, FaSquareYoutube } from "react-icons/fa6";

const SocialMediaLink = () => {
  return (
    <>
      <ul className="socialmedia-list">
        <li><a href="https://www.facebook.com/" target="_blank"><FaSquareFacebook className="icon" /></a></li>
        <li><a href="https://twitter.com/" target="_blank"><FaSquareXTwitter className="icon" /></a></li>
        <li><a href="https://www.instagram.com/" target="_blank"><FaSquareInstagram className="icon" /></a></li>
        <li><a href="https://www.youtube.com/" target="_blank"><FaSquareYoutube className="icon" /></a></li>
        <li><a href="https://www.linkedin.com/" target="_blank"><FaLinkedin className="icon" /></a></li>
      </ul>
    </>
  )
}

export default SocialMediaLink;
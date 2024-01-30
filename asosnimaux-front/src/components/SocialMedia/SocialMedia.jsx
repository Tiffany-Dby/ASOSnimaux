import SocialMediaLink from "../SocialMediaLink/SocialMediaLink";
import "./socialMedia.scss";

const SocialMedia = () => {
  return (
    <>
      <div className="title-wrapper">
        <h2>Réseaux Sociaux</h2>
      </div>

      <div className="socialmedia__details">
        <p>N'hésitez pas à nous suivre !</p>
        <SocialMediaLink socialMediaStyle={"socialmedia__list"} />
      </div>
    </>
  );
}

export default SocialMedia;
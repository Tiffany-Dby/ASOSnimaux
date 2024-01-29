import "./icon.scss";

const Icon = ({ iconStyle, imgUrl, imgAlt, onClick }) => {
  return (
    <>
      <div className={`icon${iconStyle}`}>
        <img src={imgUrl} alt={imgAlt} onClick={() => { }} />
      </div>
    </>
  );
}

export default Icon;
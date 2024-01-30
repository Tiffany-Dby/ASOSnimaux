import "./burger.scss";

const Burger = ({ toggleClass, handleBurger }) => {
  return (
    <>
      <div className={`burger${toggleClass}`} onClick={handleBurger}>
        <span></span>
      </div>
    </>
  );
}

export default Burger;
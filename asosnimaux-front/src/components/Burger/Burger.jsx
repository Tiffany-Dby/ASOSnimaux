import "./burger.scss";

const Burger = ({ handleBurger }) => {
  return (
    <>
      <div className="burger" onClick={handleBurger}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );
}

export default Burger;
import { Fragment } from "react";
import hStyle from "./Header.module.css";
import mealsJepege from "../../assets/meals.jpg";
import HeaderCartBut from "./HeaderCartBut";

const Header = (props) => {
  return (
    <Fragment>
      <header className={hStyle.header}>
        <h1>Californian Warteg</h1>
        <HeaderCartBut onTampilCart={props.onTampilkanCart} />
      </header>
      <div className={hStyle["main-image"]}>
        <img src={mealsJepege} alt="Makanan buat Perutmu!" />
      </div>
    </Fragment>
  );
};

export default Header;

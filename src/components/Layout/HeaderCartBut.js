import CartIcon from "../Cart/CartIcon";
import hcbStyle from "./HeaderCartBut.module.css";
import { useContext, useState, useEffect } from "react";
import CartContext from "../../store/cart-context";

const HeaderCartBut = (props) => {
  const cartCtx = useContext(CartContext);

  const numOfCart = cartCtx.items.reduce((curNum, item) => {
    return curNum + item.jumlah;
  }, 0);

  const [isBump, setIsBump] = useState(false);
  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setIsBump(true);
    const timer = setTimeout(() => {
      setIsBump(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.items]);

  const btnkelas = `${hcbStyle.button} ${isBump ? hcbStyle.bump : ""}`;

  return (
    <button className={btnkelas} onClick={props.onTampilCart}>
      <span className={hcbStyle.icon}>
        <CartIcon />
      </span>
      <span>Keranjangmu</span>
      <span className={hcbStyle.badge}>{numOfCart}</span>
    </button>
  );
};

export default HeaderCartBut;

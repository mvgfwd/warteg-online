import iStyle from "./Item.module.css";
import FormItem from "./FormItem";
import { useContext } from "react";
import CartContext from "../../../store/cart-context";

const Item = (props) => {
  const cartCtx = useContext(CartContext);
  const harga = `Rp${props.harga}`;

  const tambahKeCartHandler = (x) => {
    cartCtx.addBarang({
      key: Math.random(),
      id: props.id,
      name: props.title,
      jumlah: x,
      harga: props.harga,
    });
  };

  return (
    <li className={iStyle.meal}>
      <div>
        <h3>{props.title}</h3>
        <div className={iStyle.description}>{props.keterangan}</div>
        <div className={iStyle.price}>{harga}</div>
      </div>
      <div>
        <FormItem id={props.title} tambahKeCart={tambahKeCartHandler} />
      </div>
    </li>
  );
};

export default Item;

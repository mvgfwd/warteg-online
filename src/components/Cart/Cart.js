import cartStyle from "./Cart.module.css";
import Modal from "../UI/Modal";
// import Card from "../UI/Card";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import CekotForm from "./CekotForm";

const Cart = (props) => {
  //untuk perloadingan pemesanan
  const [mengirimkan, setMengirimkan] = useState(false);
  const [terkirim, setTerkirim] = useState(false);

  const [diorder, setDiorder] = useState(false);
  const cartCtx = useContext(CartContext);
  const hargaBarang = `Rp${cartCtx.jumlah}`;
  const adaItemGa = cartCtx.items.length > 0;

  const orderMen = () => {
    setDiorder(true);
  };

  const cartItemRemoveHdlr = (id) => {
    cartCtx.removeBarang(id);
  };

  const cartItemAddhdlr = (item) => {
    cartCtx.addBarang({ ...item, jumlah: 1 });
  };

  const submitToBackEnd = async (data) => {
    setMengirimkan(true);
    await fetch(
      `https://react-http-req-39280-default-rtdb.asia-southeast1.firebasedatabase.app/jonaresto/order.json`,
      {
        method: "POST",
        body: JSON.stringify({
          yangOrder: data,
          ordernya: cartCtx.items,
        }),
      }
    );
    setMengirimkan(false);
    setTerkirim(true);
    cartCtx.resetCart();
  };

  const cartItems = (
    <ul className={cartStyle[`cart-items`]}>
      {cartCtx.items.map((e) => (
        <CartItem
          key={e.id}
          name={e.name}
          amount={e.jumlah}
          price={e.harga}
          onRemove={cartItemRemoveHdlr.bind(null, e.id)}
          onAdd={cartItemAddhdlr.bind(null, e)}
        />
      ))}{" "}
    </ul>
  );

  const tampakkanButtonCart = (
    <div className={cartStyle.actions}>
      <button className={cartStyle[`button--alt`]} onClick={props.onTutupCart}>
        Close
      </button>
      {adaItemGa && (
        <button className={cartStyle.button} onClick={orderMen}>
          Order
        </button>
      )}
    </div>
  );

  const kontenCart = (
    <div>
      {cartItems}
      <div className={cartStyle.total}>
        <span>Total Amount: </span>
        <span>{hargaBarang}</span>
      </div>
      <div>
        {diorder && (
          <CekotForm onSubForm={submitToBackEnd} kensel={props.onTutupCart} />
        )}
      </div>
      <div>{!diorder && tampakkanButtonCart}</div>
    </div>
  );

  const sedangMengirim = (
    <section>
      <p>Order anda sedang dikirim</p>
    </section>
  );
  const terkirimkan = (
    <section className={cartStyle.actions}>
      <p>Order anda terkirim</p>
      <button onClick={props.onTutupCart}>Close</button>
    </section>
  );

  return (
    <Modal onClose={props.onTutupCart}>
      {!mengirimkan && !terkirim && kontenCart}
      {mengirimkan && !terkirim && sedangMengirim}
      {!mengirimkan && terkirim && terkirimkan}
    </Modal>
  );
};

export default Cart;

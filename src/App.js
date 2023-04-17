import Header from "./components/Layout/Header";
import Foods from "./components/Meals/Foods";
import Cart from "./components/Cart/Cart";
import { useState } from "react";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartShow, setCartShow] = useState(false);

  const tampilkanCart = () => {
    setCartShow(true);
  };
  const hilangkanCart = () => {
    setCartShow(false);
  };

  return (
    <CartProvider>
      {cartShow ? <Cart onTutupCart={hilangkanCart} /> : ""}
      <Header onTampilkanCart={tampilkanCart} />
      <main>
        <Foods />
      </main>
    </CartProvider>
  );
}

export default App;

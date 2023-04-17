import React from "react";

const CartContext = React.createContext({
  items: [],
  jumlah: 0,
  addBarang: (i) => {},
  removeBarang: (id) => {},
  resetCart: () => {},
});

export default CartContext;

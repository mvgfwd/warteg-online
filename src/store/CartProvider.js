import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCart = {
  items: [],
  jumlah: "0",
};

const prosesCart = (state, action) => {
  if (action.type === "ADD") {
    let totalJumlah =
      parseInt(state.jumlah) + action.item.jumlah * action.item.harga; //!THEFUCK?!!

    const existCartItemIdx = state.items.findIndex(
      (e) => e.id === action.item.id
    );
    console.log(`idx`, existCartItemIdx);
    const existCartItem = state.items[existCartItemIdx];
    console.log(`e `, existCartItem);
    let updatedItems;
    // console.log(existCartItemIdx, existCartItem);
    if (existCartItem) {
      const updatedItem = {
        ...existCartItem,
        jumlah: existCartItem.jumlah + action.item.jumlah,
      };
      updatedItems = [...state.items];
      updatedItems[existCartItemIdx] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    // const updatedTotal = totalJumlah + action.item.jumlah * action.item.harga;
    // console.log(
    //   `jlh`,
    //   action.item.jumlah,
    //   `harga`,
    //   action.item.harga,
    //   "state.jlh",
    //   state.jumlah,
    //   `total.jlh`,
    //   totalJumlah,
    //   `updateTot`,
    //   updatedTotal
    // );
    // console.log(`tipe`, typeof parseInt(state.jumlah));
    // console.log(`test`, updatedItems);
    return {
      items: updatedItems,
      jumlah: totalJumlah,
    };
  }

  if (action.type === "REMOVE") {
    const existCartItemIdx = state.items.findIndex((it) => it.id === action.id);
    const existItem = state.items[existCartItemIdx];
    const updateHarga = state.jumlah - existItem.harga;
    let updatedItems;
    console.log("excartitemidx", existCartItemIdx);
    console.log(
      "exitem",
      existItem,
      `updateharga`,
      updateHarga,
      `state.jumlah`,
      state.jumlah,
      `existitem.harga`,
      existItem.harga
    );
    if (existItem.jumlah === 1) {
      updatedItems = state.items.filter((e) => e.id !== action.id);
    } else {
      const updatedItem = { ...existItem, jumlah: existItem.jumlah - 1 };
      updatedItems = [...state.items];
      updatedItems[existCartItemIdx] = updatedItem;
      console.log(`updtd items`, updatedItems);
    }
    console.log(`updtd items2`, updatedItems);
    return {
      items: updatedItems,
      jumlah: updateHarga,
    };
  }

  if (action.type === "RESET") {
    return defaultCart;
  }

  return defaultCart;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(prosesCart, defaultCart);

  const tambahItem = (i) => {
    dispatchCartState({
      type: "ADD",
      item: i,
    });
    console.log(`i`, i);
  };

  const hapusItem = (id) => {
    dispatchCartState({
      type: "REMOVE",
      id: id,
    });
  };

  const resetAfterOrder = () => {
    dispatchCartState({
      type: "RESET",
    });
  };

  const cartContext = {
    items: cartState.items,
    jumlah: cartState.jumlah,
    addBarang: tambahItem,
    removeBarang: hapusItem,
    resetCart: resetAfterOrder,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

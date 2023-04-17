import { useEffect, useState } from "react";

import faStyle from "./FoodsAda.module.css";
import Card from "../UI/Card";
import Item from "./Item/Item";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 50000,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 40000,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 31299,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 45899,
//   },
// ];

const FoodsAda = () => {
  const [meals, setMakanan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const resp = await fetch(
        `https://react-http-req-39280-default-rtdb.asia-southeast1.firebasedatabase.app/jonaresto/meals.json`
      );
      if (!resp.ok) {
        throw new Error(`Gagal menangkap data`);
      }
      const responseData = await resp.json();
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setIsLoading(false);
      setMakanan(loadedMeals);
    };

    fetchMeals().catch((err) => {
      setIsLoading(false);
      setFetchError(err.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p className={faStyle.loadingDuls}>Loading...</p>
      </section>
    );
  }

  if (fetchError) {
    return (
      <section>
        <p className={faStyle.errorCuy}>{fetchError}</p>
      </section>
    );
  }

  const listFood = meals.map((e) => (
    <Item
      id={e.id}
      key={e.id}
      title={e.name}
      keterangan={e.description}
      harga={e.price}
    />
  ));
  return (
    <section className={faStyle.meals}>
      <Card>
        <ul>{listFood}</ul>
      </Card>
    </section>
  );
};
export default FoodsAda;

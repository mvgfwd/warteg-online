import FoodsAda from "./FoodsAda";
import FoodsSumm from "./FoodsSumm";
import { Fragment } from "react";

const Foods = () => {
  return (
    <Fragment>
      <FoodsSumm />
      <FoodsAda />
    </Fragment>
  );
};

export default Foods;

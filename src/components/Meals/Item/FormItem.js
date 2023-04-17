import fStyle from "./FormItem.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";

const FormItem = (props) => {
  const jlhInputRef = useRef();
  const [jlhIsValid, setJlhIsValid] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    const jlh = jlhInputRef.current.value;
    const jlhToNumber = +jlh;
    if (jlh.trim().length === 0 || jlh < 1 || jlh > 5) {
      setJlhIsValid(false);
      return;
    }
    // console.log(jlh, props.id);
    props.tambahKeCart(jlhToNumber);
  };

  return (
    <form className={fStyle.form} onSubmit={submitHandler}>
      <Input
        ref={jlhInputRef}
        label="Jumlah"
        input={{
          id: "total" + props.id,
          type: `number`,
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!jlhIsValid && (
        <p style={{ color: "orange" }}>Enter Valid Amount (1-5)</p>
      )}
    </form>
  );
};

export default FormItem;

import cStyle from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={`${cStyle.card} ${props.className}`}>{props.children}</div>
  );
};

export default Card;

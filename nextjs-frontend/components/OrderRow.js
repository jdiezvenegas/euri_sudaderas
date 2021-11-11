import AppContext from "/context/AppContext";
import { useContext } from "react";

function OrderRow(props) {
  const appContext = useContext(AppContext);
  const { item } = props

  return (
    <li className="order-row-container">
      <h3 className="product-name">{item?.name || "Unknown"}</h3>
      <p className="product-price">{item?.price ?? 0}€</p>
      <p>{item?.design} - {item?.color} - {item?.size}</p>
      <button onClick={() => appContext.addItem(item)}>+</button>
      <button onClick={() => appContext.removeItem(item)}>-</button>
      <p className="product-amount">x{item.quantity}</p>
    </li>
  );
}

export default OrderRow;

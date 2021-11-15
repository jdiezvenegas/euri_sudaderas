import AppContext from "/context/AppContext";
import { useContext } from "react";

function OrderRow(props) {
  const appContext = useContext(AppContext);
  const { item } = props;

  return (
    <li className="order-row-container">
      <div className="amount-container">
        <p className="product-amount">x{item.quantity}</p>
        <div className="buttons">
          <button onClick={() => appContext.addItem(item)}>+</button>
          <button onClick={() => appContext.removeItem(item)}>-</button>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{item?.name || "Unknown"}</h3>
        <p className="product-price">{item?.price ?? 0}€</p>
        <p className="product-options">
          {item?.design} - {item?.color} - {item?.size}
        </p>
      </div>
    </li>
  );
}

export default OrderRow;

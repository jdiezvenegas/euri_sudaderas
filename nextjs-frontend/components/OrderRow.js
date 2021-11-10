function OrderRow(props) {
  return (
    <div className="order-row-container">
      <p className="product-amount">x{props?.amount || 1}</p>
      <div className="product-info">
        <h3 className="product-name">{props?.items[0].name || "Unknown"}</h3>
        <p className="product-price">{props?.items[0]?.price ?? 0}€</p>

        <div className="items">
          {props?.items.map((item, i) => (
            <span key={i}>
              {item.color} - {item.size}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderRow;

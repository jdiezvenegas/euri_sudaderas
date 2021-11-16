import AppContext from "/context/AppContext";
import { useContext, useEffect, useCallback } from "react";

function SuccessfulPayment() {
  const appContext = useContext(AppContext);

  useEffect(() => {
    appContext.emptyCart();
  }, []);

  return (
    <div className="purchase-end-container">
      <h1>Todo listo</h1>
      <p>
        Hemos recibido tu pedido. Revisa nuestro FAQ si tienes cualquier duda.
      </p>
    </div>
  );
}

export default SuccessfulPayment;

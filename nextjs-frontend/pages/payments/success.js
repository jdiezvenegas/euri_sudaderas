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
        😊 Hemos recibido tu pedido. Revisa nuestro FAQ si tienes cualquier duda
        (cuándo llegará tu pedido, por ejemplo). Debería haberte llegado un
        ticket al correo que has usado en el proceso de compra. ¡Guárdalo!
      </p>
    </div>
  );
}

export default SuccessfulPayment;

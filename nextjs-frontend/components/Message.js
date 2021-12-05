import AppContext from "/context/AppContext";
import { useState } from "react";

function Message(props) {
  const [ignore, setIgnore] = useState(false);

  return (
    <div className="message-container">
      <div className="message">
        <p>
          El próximo pedido será el 12 de diciembre. Realiza tu pedido antes del
          12 para recibirlo cuanto antes.
        </p>
        <p>
          Haz click en el modelo para ver todos los colores disponibles. ¡Hay
          más de 25!
        </p>
      </div>
    </div>
  );
}

export default Message;

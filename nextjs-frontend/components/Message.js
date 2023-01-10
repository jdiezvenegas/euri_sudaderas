import AppContext from "/context/AppContext";
import { useState } from "react";

function Message(props) {
  const [ignore, setIgnore] = useState(false);

  return (
    <div className="message-container">
      <div className="message">
        <p>
          En marzo haremos el segundo pedido. ¡Aprovecha y pide la tuya!
        </p>
        <p>
          ¿Alguna consulta? Escríbenos a 608 66 14 13 (Jorge).
        </p>
      </div>
    </div>
  );
}

export default Message;

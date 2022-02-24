import AppContext from "/context/AppContext";
import { useState } from "react";

function Message(props) {
  const [ignore, setIgnore] = useState(false);

  return (
    <div className="message-container">
      <div className="message">
        <p>
          ¡El primer pedido está de camino! Recibirás un correo cuando haya llegado.
        </p>
        <p>
          En <b>marzo</b> haremos el <b>segundo y último</b> pedido del curso. ¡Aprovecha y pide la tuya!
        </p>
        <p>
          Para cualquier consulta, hablar a Pedro: 722 51 56 06
        </p>
      </div>
    </div>
  );
}

export default Message;

import AppContext from "/context/AppContext";
import { useState } from "react";

function Message(props) {
  const [ignore, setIgnore] = useState(false);

  return (
    <div className="message-container">
      <div className="message">
        El próximo pedido será el 12 de diciembre. Realiza tu pedido antes del
        12 para recibirlo cuanto antes.
      </div>
    </div>
  );
}

export default Message;

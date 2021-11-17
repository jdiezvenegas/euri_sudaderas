import { useState } from "react";

function GDPR(props) {
  return (
    <div className="gdpr-logic-container">
      {props.read === true ? (
        <div className="rgpd-container">
          <div className="rgpd">
            <p>
              Le informamos que la siguiente es la información básica de
              protección de datos acorde con el REGLAMENTO (UE) 2016/679 DEL
              PARLAMENTO EUROPEO Y DEL CONSEJO del 27 de abril de 2016 que se
              aplica a los nuevos y antiguos socios de Eurielec ETSIT Madrid.
              Para más información puede ver el documento completo de protección
              de datos en{" "}
              <a href="https://eurielec.etsit.upm.es/RGPD_sudaderas.pdf">
                https://eurielec.etsit.upm.es/RGPD_sudaderas.pdf
              </a>
              .
            </p>

            <p>
              El responsable del tratamiento de sus datos es Eurielec ETSIT
              Madrid. La finalidad del tratamiento de sus datos se define en el
              documento oficial de protección de datos en relación con la venta
              de productos textiles de Eurielec ETSIT Madrid. Los datos que
              recogemos son los siguientes:
            </p>

            <ul>
              <li>
                El tratamiento de tus datos es necesario para la ejecución del
                contrato de compraventa o de prestación de servicios que nos
                vincule contigo
              </li>
              <li>
                Es posible que algunos tratamientos de datos asociados al
                proceso de compra se activen únicamente porque tú lo solicites o
                nos autorices
              </li>
              <li>
                Consideramos que tenemos un interés legítimo para realizar las
                comprobaciones necesarias para detectar y prevenir posibles
                fraudes cuando realizas una compra. Entendemos que el
                tratamiento de estos datos resulta positivo para todas las
                partes que intervienen cuando se produce el pago de una compra y
                en particular para ti, ya que nos permite poner medidas para
                protegerte contra intentos de fraude realizados por terceros.
              </li>
              <li>
                Consideramos que tenemos un interés legítimo para atender las
                solicitudes o consultas que nos plantees a través de los
                diversos medios de contacto existentes. Entendemos que el
                tratamiento de estos datos resulta también beneficioso para ti
                en tanto que nos permite poder atenderte adecuadamente y
                resolver las consultas planteadas.
              </li>
              <li>
                Con fines de facturación y para poner a tu disposición los
                tiques y facturas de las compras que hayas realizado en la
                Plataforma.
              </li>
              <li>Finalidades estadísticas.</li>
              <li>
                Cuando nos contactes, en particular, para la gestión de
                incidencias relacionadas con tu pedido o el producto/ servicio
                adquirido a través de la Plataforma, el tratamiento es necesario
                para la ejecución del contrato de compraventa.
              </li>
              <li>
                Cuando tu consulta esté relacionada con el ejercicio de los
                derechos sobre los que te informamos más abajo, o con
                reclamaciones relacionadas con nuestros productos o servicios,
                lo que nos legitima para tratar tus datos es el cumplimiento de
                obligaciones legales por nuestra parte.
              </li>
            </ul>

            <p>
              El tratamiento de los datos se basa en el artículo 6.1 b) del RGPD
              de la UE: El tratamiento es necesario para la ejecución de un
              contrato de compra venta en el que el interesado es parte. Le
              informamos que no se cederán datos a terceros salvo por orden
              judicial. Puede acceder, rectificar, y cancelar los datos, así
              como otros derechos, en los términos y con las limitaciones que se
              indican en la información adicional en el documento de protección
              de datos de la asociación. Puede consultar la información
              adicional y detallada sobre Protección de Datos en{" "}
              <a href="https://eurielec.etsit.upm.es/RGPD_sudaderas.pdf">
                https://eurielec.etsit.upm.es/RGPD_sudaderas.pdf
              </a>
            </p>
          </div>
        </div>
      ) : null}
      {props.read === false ? (
        <div className="gdpr-please-read" onClick={() => props.setRead(true)}>
          Leer documento de tratamiento de datos.
        </div>
      ) : (
        <label className="gdpr-please-accept">
          <input
            type="checkbox"
            id="gdpr"
            onClick={() => props.setAccepted(!props.accepted)}
          />
          Acepto el tratamiento de mis datos conforme al documento leído
          anteriormente.
        </label>
      )}
    </div>
  );
}

export default GDPR;

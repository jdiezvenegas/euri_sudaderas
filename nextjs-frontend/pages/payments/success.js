import AppContext from "/context/AppContext";
import { useContext } from "react";

export default function SuccessfulPayment(props) {
    const appContext = useContext(AppContext);
    appContext.emptyCart()

    return (
        <div>
            <h1>Success!!</h1>
        </div>
    )
}
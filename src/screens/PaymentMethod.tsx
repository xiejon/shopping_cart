import React from "react";
import styles from "../styles/PaymentMethod.module.css"
import { useStore } from "../contexts/StoreContext";
import { useNavigate } from "react-router-dom";

const PaymentMethod = () => {
    const {setPaymentMethod, paymentMethod, shippingAddress} = useStore()
    const navigate = useNavigate()

    const [paymentType, setPaymentType] = React.useState(paymentMethod || "Stripe")

    React.useEffect(() => {
        if (!shippingAddress.street) {
            navigate('/shipping')
        }
    })
   

    const submitHandler = (e: any) => {
        e.preventDefault()
        setPaymentMethod(paymentType)
        localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod))
        navigate('/placeorder')
    }
    return(
        <div>
            <h2>Payment Method</h2>
            <form onSubmit={submitHandler}>
                <input type="radio" 
                id="PayPal"
                value="PayPal"
                checked={}
                onChange={(e) => setPaymentMethod(e.target.value)}></input>
            </form>
        </div>
    )
}

export default PaymentMethod
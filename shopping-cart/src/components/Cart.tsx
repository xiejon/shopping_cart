import React from 'react'
import styles from '../styles/Cart.module.css'
import CartItem from './CartItem'

const Cart = () => {
    return(
        <div className={styles.container}>
            <h3>Cart</h3>
            {/* for each item in props 'cart' array, create a CartItem component */}
            
            <button>Check Out</button>
        </div>
    )
}

export default Cart
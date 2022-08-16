import React from 'react'
import styles from '../styles/CartItem.module.css'

const CartItem = () => {
    return(
        <div>
            <img>Img</img>
            <h5>Book</h5>
            <button className={styles.incrementBtn}></button>
            <input>3</input>
            <button className={styles.decrementBtn}></button>
        </div>
    )
}

export default CartItem
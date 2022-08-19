import React from 'react'
import styles from '../styles/CartItem.module.css'
import storeItems from '../data/items.json'
import { useCart } from '../contexts/CartContext'

type CartItemProps = {
    id: number,
    quantity: number
}

const CartItem = ({id, quantity}: CartItemProps) => {
    const { removeFromCart } = useCart()
    const item = storeItems.find(storeItem => storeItem.id === id)
    if (item == null) return null

    return(
        <div>
            <img src={item.url} alt="tea"></img>
            <h5>{item.name}</h5>
            <button className={styles.incrementBtn}></button>
            
            <button className={styles.decrementBtn}></button>
        </div>
    )
}

export default CartItem
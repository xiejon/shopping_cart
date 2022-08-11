import React from 'react'
import styles from '../styles/StoreItem.module.css'

type StoreItemProps = {
    id: number;
    name: string;
    price: number;
    url: string;
}

const StoreItem = ({id, name, price, url}: StoreItemProps) => {

    return(
        <div>
            <img className={styles.img} src={url} alt={name} ></img>
            <h4>{name}</h4>
            <p>${price}</p>
        </div>
    )
}

export default StoreItem
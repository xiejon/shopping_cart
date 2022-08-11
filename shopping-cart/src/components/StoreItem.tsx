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
        <div className={styles.item}>
            <img className={styles.img} src={url} alt={name} ></img>
            <div className={styles.info}>
                <h4 className={styles.title} >{name}</h4>
                <p className={styles.price} >${price}</p>
            </div>
        </div>
    )
}

export default StoreItem
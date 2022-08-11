import React from 'react'
import styles from '../styles/Store.module.css'
import storeItems from '../data/items.json'

const Store = () => {
    let items = storeItems.map(item => JSON.stringify(item))
    return(
        <div>
            <img className={styles.bg} src={require('../resources/images/store-bg.jpg')} alt="tea"></img>
            <div>{items}</div>
        </div>
    )
}

export default Store
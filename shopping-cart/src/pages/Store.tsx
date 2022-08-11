import React from 'react'
import styles from '../styles/Store.module.css'
import storeItems from '../data/items.json'
import StoreItem from '../components/StoreItem'

const Store = () => {
    // let items = storeItems.map(item => item.id)
    //                     // .map(item => {(
    //                     //     <StoreItem
    //                     //     id={item.id}>

    //                     //     </StoreItem>
                            
    //                     // )})


    return(
        <div>
            <img className={styles.bg} src={require('../resources/images/store-bg.jpg')} alt="tea"></img>
            <div>{storeItems.map(item => {
                return <div key={item.id}>
                        <StoreItem {...item}></StoreItem>
                    </div>
            })}</div>
        </div>
    )
}

export default Store
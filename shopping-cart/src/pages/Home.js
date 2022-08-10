import React from 'react'
import styles from '../styles/Home.module.css'

const Home = () => {
    return(
        <div className={styles.container}>
            <img className={styles.bg} src={require('../resources/images/home-bg.jpg')} alt="tea"></img>     
        </div>
    )
}

export default Home
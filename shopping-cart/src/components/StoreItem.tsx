import React from "react";
import styles from "../styles/StoreItem.module.css";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  url: string;
};

const StoreItem = ({ id, name, price, url }: StoreItemProps) => {
// const [quantity, setQuantity] = React.useState(0)
  const [isBtnShown, setIsBtnShown] = React.useState(false)
  
  function toggleBtn() {
    setIsBtnShown(prevBool => !prevBool)
  }
    
  return (
    <div className={styles.item}>
        <div className={styles.imgContainer}>
            <img 
              className={styles.img} 
              src={url} 
              alt={name}
              onMouseOver={toggleBtn}
              onMouseLeave={toggleBtn}
              ></img>
            <button 
              className={styles.addToCartBtn}
              style={isBtnShown ? {"display": "flex"} : {"display": "none"}}
              >Add To Cart</button>
        </div>
      <div className={styles.info}>
        <h4 className={styles.title}>{name}</h4>
        <p className={styles.price}>${price}</p>
      </div>
    </div>
  );
};

export default StoreItem;

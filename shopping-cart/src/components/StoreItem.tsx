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
  const [areBtnsShown, setAreBtnsShown] = React.useState(false)
  
  function showBtns() {
    setAreBtnsShown(true)
  }

  function hideBtns() {
    setAreBtnsShown(false)
  }
    
  return (
    <div className={styles.item}>
        <div 
          className={styles.imgContainer}
          onMouseOver={showBtns}
          onMouseLeave={hideBtns}
          ><img 
              className={styles.img} 
              src={url} 
              alt={name}
              ></img>
            <div 
              className={styles.btnsContainer} 

              onMouseOver={showBtns}
              onMouseLeave={hideBtns}
              
              style={areBtnsShown ? {"display": "flex"} : {"display": "none"}}
              ><div className={styles.qtyBtnsContainer}>
                <button className={styles.decrementBtn}>-</button>
                <div className={styles.quantity}>2</div>
                <button className={styles.incrementBtn}>+</button>
              </div>
              <button className={styles.addToCartBtn}>Add To Cart</button>
            </div>
        </div>
      <div className={styles.info}>
        <h4 className={styles.title}>{name}</h4>
        <p className={styles.price}>${price}</p>
      </div>
    </div>
  );
};

export default StoreItem;

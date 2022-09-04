import React from "react";
import { useCart } from "../contexts/CartContext";
import styles from "../styles/StoreItem.module.css";

type StoreItemProps = {
  _id: string;
  name: string;
  price: number;
  url: string;
};

const StoreItem = ({ _id, name, price, url }: StoreItemProps) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useCart();
  const [areBtnsShown, setAreBtnsShown] = React.useState(false);

  const quantity = getItemQuantity(_id);

  function showBtns() {
    setAreBtnsShown(true);
  }

  function hideBtns() {
    setAreBtnsShown(false);
  }

  return (
    <div className={styles.item}>
      <div
        className={styles.imgContainer}
        onMouseOver={showBtns}
        onMouseLeave={hideBtns}
      >
        <img className={styles.img} src={url} alt={name}></img>
        <div
          className={styles.btnsContainer}
          //
          onMouseOver={showBtns}
          onMouseLeave={hideBtns}
          style={areBtnsShown ? { display: "flex" } : { display: "none" }}
        >
          <div className={styles.qtyBtnsContainer}>
            {quantity === 0 ? (
              <button 
                className={styles.addToCartBtn}
                onClick={() => increaseCartQuantity(_id)}
              >+ Add To Cart</button>
            ) : (
              <>
                <button
                  className={styles.decrementBtn}
                  onClick={() => decreaseCartQuantity(_id)}
                >
                  -
                </button>
                <div className={styles.quantity}>{quantity}</div>
                <button
                  className={styles.incrementBtn}
                  onClick={() => increaseCartQuantity(_id)}
                >
                  +
                </button>
              </>
            )}
          </div>
        </div>
        <div 
          className={styles.info}
          style={!areBtnsShown ? { display: "flex" } : {display: "none" }}
        >
          <h4 className={styles.title}>{name}</h4>
          <p className={styles.price}>${price}</p>
        </div>
      </div>
    </div>
  );
};

export default StoreItem;

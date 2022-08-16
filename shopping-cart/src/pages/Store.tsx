import React from "react";
import styles from "../styles/Store.module.css";
import storeItems from "../data/items.json";
import StoreItem from "../components/StoreItem";

const Store = () => {
  return (
    <div className={styles.container}>
      <img
        className={styles.bg}
        src={require("../resources/images/store-bg.jpg")}
        alt="tea"
      ></img>
      <div className={styles.items}>
        {storeItems.map((item) => {
          return (
            <div className={styles.itemContainer} key={item.id}>
              <StoreItem {...item}></StoreItem>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Store;

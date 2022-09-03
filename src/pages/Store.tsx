import React from "react";
import axios from "axios";
import styles from "../styles/Store.module.css";
// import storeItems from "../data/items.json";
import StoreItem from "../components/StoreItem";

type Item = {
  id: number;
  name: string;
  price: number;
  url: string;
};

const Store = () => {
  const [items, setItems] = React.useState<Item[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/api/products");
      setItems(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <img
        className={styles.bg}
        src={require("../resources/images/store-bg.jpg")}
        alt="tea"
      ></img>
      <div className={styles.items}>
        {items.map((item) => {
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

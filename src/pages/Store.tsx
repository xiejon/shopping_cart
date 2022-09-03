import React from "react";
import axios from "axios";
import styles from "../styles/Store.module.css";
// import storeItems from "../data/items.json";
import StoreItem from "../components/StoreItem";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'FETCH_REQUEST': 
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, items: action.payload }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
  }
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}

const Store = () => {
  const [{loading, error, items}, dispatch] = React.useReducer(reducer, {
    items: [], loading: true, error: '',
  })

  React.useEffect(() => {
    const fetchData = async () => {
      dispatch({type: 'FETCH_REQUEST'})
      try {
        const result = await axios.get("/api/products");
        dispatch({type: 'FETCH_SUCCESS', payload: result.data})
      } catch (err) {
        dispatch({type: 'FETCH_FAIL', payload: getErrorMessage(err) })
      }
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
        {items.map((item: any) => {
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

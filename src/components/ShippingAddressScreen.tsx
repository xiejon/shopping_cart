import React from "react";
import styles from "../styles/ShippingAddressScreen.module.css"

const ShippingAddressScreen = () => {
  const [fullName, setFullName] = React.useState<String>("");

  const submitHandler = (e: any) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className={styles.field}>
          <label htmlFor="fullName">Name</label>
          <input
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Enter your first and last name"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default ShippingAddressScreen;

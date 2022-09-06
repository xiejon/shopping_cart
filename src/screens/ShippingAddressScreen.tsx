import React, { useState } from "react";
import styles from "../styles/ShippingAddressScreen.module.css";
import { useNavigate } from "react-router-dom";
import { useStore } from "../contexts/StoreContext";

type Address = {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
};

const ShippingAddressScreen = () => {
  const navigate = useNavigate();
  const { updateCartAddress, userInfo, shippingAddress } = useStore();

  const [address, setAddress] = React.useState<Address>({
    firstName: shippingAddress.firstName || "",
    lastName: shippingAddress.lastName || "",
    street: shippingAddress.street || "",
    city: shippingAddress.city || "",
    state: shippingAddress.state || "",
    zipCode: shippingAddress.zipCode || "",
  });

  React.useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  });

  const submitHandler = (e: any) => {
    e.preventDefault();
    updateCartAddress(address);
    navigate("/payment");
  };

  return (
    <div className={styles.container}>
      <img
        className={styles.bg}
        src={require("../resources/images/store-bg.jpg")}
        alt="tea"
      ></img>
      <div className={styles.main}>
        <h3>Shipping Address</h3>
        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.name}>
            <div className={styles.field}>
              <label htmlFor="firstName">First Name</label>
              <input
              value={address.firstName}
                onChange={(e) =>
                  setAddress({
                    ...address,
                    firstName: e.target.value,
                  } as Address)
                }
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="lastName">Last Name</label>
              <input
              value={address.lastName}
                onChange={(e) =>
                  setAddress({
                    ...address,
                    lastName: e.target.value,
                  } as Address)
                }
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="street">Street Address</label>
            <input
            value={address.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value } as Address)
              }
              type="text"
              id="street"
              name="street"
              placeholder="Enter your street address"
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="city">City</label>
            <input
            value={address.city}
              onChange={(e) =>
                setAddress({ ...address, city: e.target.value } as Address)
              }
              type="text"
              id="city"
              name="city"
              placeholder="Enter your city"
              required
            />
          </div>
          <div className={styles.stateAndZip}>
            <div className={styles.field}>
              <label htmlFor="state">State</label>
              <select
              value={address.state}
                className={styles.state}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value } as Address)
                }
                id="state"
                name="state"
                required
              >
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">Dist of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="zipCode">Zip Code</label>
              <input
              value={address.zipCode}
                onChange={(e) =>
                  setAddress({ ...address, zipCode: e.target.value } as Address)
                }
                type="text"
                id="zipCode"
                name="zipCode"
                placeholder="Enter your zip code"
                required
              />
            </div>
          </div>
          <button type="submit" className={styles.submitBtn}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingAddressScreen;

import React from "react";
import styles from "../styles/Profile.module.css";
import { useStore } from "../contexts/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from 'react-toastify'
import { getError } from "../utils";

const Profile = () => {
  const { userInfo, setUser } = useStore();
  const navigate = useNavigate();

  const [name, setName] = React.useState<string>(userInfo.name);
  const [email, setEmail] = React.useState<string>(userInfo.email);
  const [password, setPassword] = React.useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = React.useState<string>("");

  React.useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
  });

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      if (password !== confirmedPassword) {
        alert("Passwords do not match");
        return;
      }
      const { data } = await axios.put(
        "/api/users/profile",
        {
          name,
          email,
          password,
        },
        {
          headers: {
            authorization: `Bearer: ${userInfo.token}`,
          },
        }
      );
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast("Profile updated successfully")
    } catch (err) {
      toast(getError(err));
    }
  };

  return (
    <div className={styles.container}>
      <img
        className={styles.bg}
        src={require("../resources/images/store-bg.jpg")}
        alt="tea"
      ></img>
      <h2 className={styles.header}>Profile</h2>
      <form
        onSubmit={submitHandler}
        method="post"
        id="signin"
        className={styles.form}
      >
        <div className={styles.field}>
          <label htmlFor="email">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email address"
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Confirm Password</label>
          <input
            onChange={(e) => setConfirmedPassword(e.target.value)}
            type="password"
            id="confirmedPassword"
            name="confirmedPassword"
            placeholder="Enter your password again"
            required
          />
        </div>
        <div className={styles.submit}>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default Profile;

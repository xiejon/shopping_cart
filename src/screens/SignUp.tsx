import React from "react";
import styles from "../styles/SignUp.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "../contexts/StoreContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInURL = new URLSearchParams(search).get("redirect");
  const redirect = redirectInURL ? redirectInURL : "/";

  const { setUser } = useStore();

  const [name, setName] = React.useState<String>("");
  const [email, setEmail] = React.useState<String>("");
  const [password, setPassword] = React.useState<String>("");
  const [confirmedPassword, setConfirmedPassword] = React.useState<String>("");

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
        if (password !== confirmedPassword) {
            alert("Passwords do not match")
            return
        }
      const { data } = await axios.post("/api/users/signup", {
        name,
        email,
        password,
      });
      console.log(data)
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className={styles.container}>
      <img
        className={styles.bg}
        src={require("../resources/images/store-bg.jpg")}
        alt="tea"
      ></img>
      <h2 className={styles.header}>Create Account</h2>
      <form
        onSubmit={submitHandler}
        action="/signin"
        method="post"
        id="signin"
        className={styles.form}
      >
        <div className={styles.field}>
          <label htmlFor="email">Name</label>
          <input
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
          <button type="submit">Sign Up</button>
        </div>
        <div className={styles.createAccount}>
          <div></div>
          Already have an account?
          <Link to={`/signup?redirect=${redirect}`} className={styles.link}>
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

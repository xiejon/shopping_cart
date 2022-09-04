import React from "react";
import styles from "../styles/SignIn.module.css"
import { Link, useLocation } from "react-router-dom";

const SignIn = () => {
    const { search } = useLocation()
    const redirectInURL = new URLSearchParams(search).get('redirect')
    const redirect = redirectInURL ? redirectInURL : "/"

    return(
        <div className={styles.container}>
            <h2 className={styles.header}>Sign In</h2>
            <form action="/signin" method="post" id="signin">
                <div className={styles.field}>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" placeholder="Enter your email address" required/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="password">Password</label>
                    <input type="text" id="password" name="password" placeholder="Enter your password" required/>
                </div>
                <div className={styles.submit}>
                    <button type="submit">Sign In</button>
                </div>
                <div className={styles.createAccount}>
                    New Customer?
                    <Link to={`/signup?redirect=${redirect}`} />
                </div>
            </form>
        </div>
    )
}

export default SignIn
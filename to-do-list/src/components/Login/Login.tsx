import { useState, ChangeEvent, FormEvent } from "react";
import { signUp, login } from "../../utils/auth_api";
import styles from './Login.module.css';
import { getUserFromLocalStorage } from "../../utils/auth_services";

interface User {
  username: string;
  password: string;
}

export default function Login(props: any) {
  const [formData, setFormData] = useState<User>({ username: '', password: '' });
  const [newUser, setNewUser] = useState<User>({ username: '', password: '' });
  const [logging, setLogging] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>(null);

  async function tryLogin(e: FormEvent) {
    e.preventDefault();
    try {
      let token = await login(formData);
      localStorage.setItem('token', token);
      props.setUser(getUserFromLocalStorage()); 
    } catch (err) {
      console.log(err);
      setMessage('ERROR: Invalid username or password');
    }
  }

  async function trySignUp(e: FormEvent) {
    e.preventDefault();
    setMessage('Signed up');
    setLogging(true);
    await signUp(newUser)
      .catch(err => {
        console.log(err);
        setMessage('ERROR: Username already exists');
        setLogging(false);
      });
  }

  function handleChangeLogin(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  }

  function handleChangeSignUp(e: ChangeEvent<HTMLInputElement>) {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSwitch() {
    setLogging(!logging);
    setMessage(null);
  }

  function handleLogout() {
    localStorage.removeItem('token');
    props.setUser(null); 
    props.setCards([])
  }
  return props.user ? (
    <div className={styles.loginContainer}>
      <div>Logged in as: {props.user.username} </div>
      <button className={styles.btnCreate} onClick={handleLogout}>LOG OUT</button>
    </div>
  ) : (
    <div className={styles.loginContainer}>
      <section className={styles.login}>
        {logging ? (
          <>
            <h2>Login</h2>
            <div style={{ color: "red", fontSize: '1.15rem', fontWeight: '700' }}>{message}</div>
            <form onSubmit={tryLogin}>
              <label>Username: </label>
              <input className={styles.inputs} type="text" onChange={handleChangeLogin} name="username" />
              <br />
              <label>Password: </label>
              <input className={styles.inputs} type="password" onChange={handleChangeLogin} name="password" />
              <br />
              <button className={styles.btn}>Login</button>
            </form>
            <p>Don't have an account? <button className={styles.btnCreate} onClick={handleSwitch}>Sign Up</button></p>
          </>
        ) : (
          <>
            <h2>Sign Up</h2>
            <div style={{ color: "red", fontSize: '1.15rem', fontWeight: '700' }}>{message}</div>
            <form onSubmit={trySignUp}>
              <label>Username: </label>
              <input className={styles.inputs} type="text" onChange={handleChangeSignUp} name="username" />
              <br />
              <label>Password: </label>
              <input className={styles.inputs} type="password" onChange={handleChangeSignUp} name="password" />
              <br />
              <button className={styles.btn}>Sign Up</button>
            </form>
            <p>Have an account? <button className={styles.btnCreate} onClick={handleSwitch}>Login</button></p>
          </>
        )}
      </section>
    </div>
  );
}

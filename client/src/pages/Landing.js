import React from "react";
import { Link } from "react-router-dom";
import Navbar2 from "./Navbar2";

function Landing() {
  return (
    <>
    <Navbar2 />
    <div style={styles.page}>
    <div style={styles.container}>
      <h1 style={styles.title}>GearShift</h1>
      <p>Ride. Connect. Explore.</p>

      <div>
        <Link to="/login">
          <button style={styles.button}>Login</button>
        </Link>

        <Link to="/register">
          <button style={styles.button}>Register</button>
        </Link>
      </div>
    </div>
    </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: "84vh",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  },
 container: {
    width: "100%",
    maxWidth: "600px",
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(12px)",
    padding: "40px",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
    color: "white"
  },
  title: {
    fontSize: "3rem",
    marginBottom: "10px",
  },
  button: {
    margin: "10px",
    borderRadius: "10px",
    padding: "10px 20px",
    backgroundColor: "red",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
};

export default Landing;
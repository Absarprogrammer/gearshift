import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Navbar2 from "./Navbar2";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });

      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(res.data));
      alert("Login Successful ✅");

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login Failed");
    }
  };

  return (
    <>
      <Navbar2 />
      <div style={styles.page}>
        <div style={styles.container}>
          <h2>Login to GearShift</h2>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <input
            placeholder="Email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.button} onClick={handleLogin}>
            Login
          </button>
          <a href="/register" style={{ marginTop: "15px", color: "white" }}>
            Don't have an account? Register
          </a>
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
    display: "flex",
    flexDirection: "column",
    width: "85%",
    maxWidth: "600px",
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(12px)",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
    color: "white"
  },
  input: {
    width: "95%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "none",
    outline: "none"
  },
  button: {
    padding: "12px",
    marginTop: "15px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default Login;
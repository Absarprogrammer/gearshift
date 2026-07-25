import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/login");
    return null;
  }

  

  return (
    <>
      <Navbar />
    
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>👤 My Profile</h2>

        <div style={styles.card}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Bike Brand:</strong> {user.bikeBrand}</p>
          <p><strong>Bike Model:</strong> {user.bikeModel}</p>
        </div>

        <button style={styles.button} onClick={() => {
          localStorage.removeItem("user");
          navigate("/login");
        }}>
          Log out
        </button>
      </div>
    </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: "90%",
    maxWidth: "500px",
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(12px)",
    padding: "40px",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
    color: "white",
    textAlign: "center",
  },

  title: {
    marginBottom: "20px",
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "25px",
    textAlign: "left",
  },

  button: {
    padding: "12px 25px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  }
};

export default Profile;
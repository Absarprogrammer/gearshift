import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={styles.navbar}>
      <div style={styles.logoContainer} onClick={() => navigate("/dashboard")}>
        <span style={styles.logoIcon}>🏍</span>
        <span style={styles.logoText}>GearShift</span>
      </div>

      {user && (
        <div style={styles.profileContainer} onClick={() => navigate("/profile")}>
          <div style={styles.avatar}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <span style={styles.username}>{user.name}</span>
        </div>
      )}
    </div>
  );
}

const styles = {
  navbar: {
    width: "96%",
    padding: "15px 30px",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 1000
  },

  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer"
  },

  logoIcon: {
    fontSize: "38px",
    color: "white",
  },

  logoText: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "white",
    textShadow: "0 0 8px rgba(255,255,255,0.4)",
    
  },
  
  profileContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer"
  },

  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: "18px"
  },

  username: {
    color: "white",
    fontWeight: "500"
  }
};

export default Navbar;
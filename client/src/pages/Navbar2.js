import React from "react";
function Navbar2() {
  return (
    <div style={styles.navbar}>
      <div style={styles.logoContainer}>
        <span style={styles.logoIcon}>🏍</span>
        <span style={styles.logoText}>GearShift</span>
      </div>
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
    
  }
};

export default Navbar2;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Navbar2 from "./Navbar2";

function Register() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    bikeBrand: "",
    bikeModel: ""
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {
    try {
      if (!userData.name || !userData.email || !userData.password || !userData.bikeBrand || !userData.bikeModel) {
        setError("Please fill in all fields");
        return;
      }

      await API.post("/auth/register", userData);

      alert("Registered Successfully ✅");

      
      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.error || "Registration Failed");
    }
  };

  return (
    <>
      <Navbar2 />
      <div style={styles.page}>
        <div style={styles.container}>
          <h2>Register for GearShift</h2>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <input name="name" placeholder="Name" style={styles.input} onChange={handleInputChange} />
          <input name="email" placeholder="Email" style={styles.input} onChange={handleInputChange} />
          <input type="password" name="password" placeholder="Password" style={styles.input} onChange={handleInputChange} />

          <select name="bikeBrand" style={styles.select} onChange={handleInputChange}>
            <option value="">Select Bike Brand</option>
            <option value="Yamaha">Yamaha</option>
            <option value="Honda">Honda</option>
            <option value="Bajaj">Bajaj</option>
            <option value="KTM">KTM</option>
            <option value="BMW">BMW</option>
            <option value="Ducati">Ducati</option>
            <option value="Hero">Hero</option>
            <option value="Suzuki">Suzuki</option>
            <option value="TVS">TVS</option>
            <option value="Royal Enfield">Royal Enfield</option>
            <option value="Aprilia">Aprilia</option>
            <option value="Kawasaki">Kawasaki</option>
            <option value="Triumph">Triumph</option>
            <option value="Harley-Davidson">Harley-Davidson</option>
            <option value="Jawa">Jawa</option>
          </select>

          <input name="bikeModel" placeholder="Bike Model" style={styles.input} onChange={handleInputChange} />

          <button style={styles.button} onClick={handleRegister}>
            Register
          </button>
          <a href="/login" style={{ marginTop: "15px", color: "white" }}>
            Already have an account? Login
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
  },
  select: {
    width: "99%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "none"
  }
};

export default Register;
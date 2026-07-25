import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import API from "../api";

function CreateRide() {
  const navigate = useNavigate();
  const location = useLocation();

  const existingRide = location.state?.ride;
  const user = JSON.parse(localStorage.getItem("user"));

  const [rideData, setRideData] = useState({
    title: existingRide?.title || "",
    start: existingRide?.start || "",
    destination: existingRide?.destination || "",
    date: existingRide?.date || "",
    time: existingRide?.time || ""
  });

  const handleChange = (e) => {
    setRideData({
      ...rideData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      if (existingRide) {
        // 🔥 UPDATE RIDE
        await API.put(`/rides/${existingRide._id}`, rideData);
      } else {
        // 🔥 CREATE RIDE
        await API.post("/rides/create", {
          ...rideData,
          userId: user._id
        });
      }
      localStorage.setItem("refreshDashboard", "true");
      alert(existingRide ? "Ride Updated Successfully ✅" : "Ride Created Successfully ✅");
      
      navigate(`/my-rides`);

    } catch (error) {
      console.log("Create ride error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <div style={styles.container}>
          <h1>{existingRide ? "Edit Ride" : "Create New Ride"}</h1>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              style={styles.input}
              type="text"
              name="title"
              placeholder="Ride Title"
              value={rideData.title}
              onChange={handleChange}
              required
            />

            <input
              style={styles.input}
              type="text"
              name="start"
              placeholder="Start Location"
              value={rideData.start}
              onChange={handleChange}
              required
            />

            <input
              style={styles.input}
              type="text"
              name="destination"
              placeholder="Destination"
              value={rideData.destination}
              onChange={handleChange}
              required
            />

            <input
              style={styles.input}
              type="date"
              name="date"
              value={rideData.date}
              onChange={handleChange}
              required
            />

            <input
              style={styles.input}
              type="time"
              name="time"
              value={rideData.time}
              onChange={handleChange}
              required
            />

            <button style={styles.button} type="submit">
              {existingRide ? "Update Ride" : "Create Ride"}
            </button>
          </form>
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
    background: "rgba(0,0,0,0.4)",
    backdropFilter: "blur(10px)",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
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

export default CreateRide;
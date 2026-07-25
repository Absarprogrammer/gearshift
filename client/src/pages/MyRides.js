import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import API from "../api";

function MyRides() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [rides, setRides] = useState([]);

  // 🔥 Fetch user rides from backend
  useEffect(() => {
    const fetchMyRides = async () => {
      if (!user?._id) return;
      try {
        const res = await API.get(`/rides/${user._id}`);
        setRides(res.data);
      } catch (err) {
        console.log("Error fetching rides:", err);
      }
    };

    fetchMyRides();
  }, [user]);

  // Delete ride
  const deleteRide = async (rideId) => {
    try {
      await API.delete(`/rides/${rideId}`);
      setRides(prev => prev.filter(r => r._id !== rideId));
    } catch (err) {
      console.log("Error deleting ride:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <div style={styles.container}>
          <h1>My Rides</h1>

          {rides.length === 0 && <p>No rides created yet.</p>}

          {rides.map((ride) => (
            <div key={ride._id} style={styles.card}>
              <h2>{ride.title}</h2>
              <h3>{ride.start} → {ride.destination}</h3>
              <h3>{ride.date} at {ride.time}</h3>

              <button
                style={styles.button}
                onClick={() => navigate("/ride", { state: ride })}
              >
                View Ride
              </button>

              <button
                style={{ ...styles.button, backgroundColor: "gray", marginLeft: "10px" }}
                onClick={() => deleteRide(ride._id)}
              >
                Delete
              </button>

              <button
                style={{ ...styles.button, backgroundColor: "orange", marginLeft: "10px" }}
                onClick={() =>
                  navigate("/create-ride", { state: { ride, editMode: true } })
                }
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: "80vh",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px"
  },
  container: {
    alignItems: "center",
    width: "80%",
    maxWidth: "600px",
    background: "rgba(0,0,0,0.4)",
    backdropFilter: "blur(10px)",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
    color: "white"
  },
  button: {
    width: "50%",
    padding: "12px",
    marginTop: "25px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#ff3c3c",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    marginLeft: "10px"
  },
  card: {
    marginTop: "20px",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)"
  }
};

export default MyRides;
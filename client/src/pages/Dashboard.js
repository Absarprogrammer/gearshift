import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [rides, setRides] = useState([]);

  // 🔥 Fetch ALL rides (public feed)
 useEffect(() => {
  const fetchRides = async () => {
    try {
      const res = await API.get("/rides/all");
      setRides(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Check if we need to refresh
  const shouldRefresh = localStorage.getItem("refreshDashboard");
  if (shouldRefresh) {
    localStorage.removeItem("refreshDashboard");
    fetchRides();
  } else {
    fetchRides(); // initial load
  }
}, []);
 

  const upcoming = rides.filter(
    ride => new Date(`${ride.date} ${ride.time}`) > new Date()
  );

  const completed = rides.length - upcoming.length;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={styles.page}>
      
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>🏍 GearShift</h2>

        <button style={styles.sideBtn} onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>

        <button style={styles.sideBtn} onClick={() => navigate("/create-ride")}>
          Create Ride
        </button>

        <button style={styles.sideBtn} onClick={() => navigate("/my-rides")}>
          My Rides
        </button>

        <button style={styles.sideBtn} onClick={() => navigate("/profile")}>
          Profile
        </button>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        <h1>Welcome, {user?.name} 👋</h1>

        <p style={styles.bikeInfo}>
          🏍 {user?.bikeBrand} {user?.bikeModel}
        </p>

        {/* Stats */}
        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <h3>Total Rides</h3>
            <p>{rides.length}</p>
          </div>

          <div style={styles.statCard}>
            <h3>Upcoming</h3>
            <p>{upcoming.length}</p>
          </div>

          <div style={styles.statCard}>
            <h3>Completed</h3>
            <p>{completed}</p>
          </div>
        </div>

        {/* 🔥 Public Ride Feed */}
        <h2 style={{ marginTop: "40px" }}>All Rides</h2>

        {rides.length === 0 && <p>No rides available.</p>}

       {rides.map((ride) => {
  
  const hasJoined = ride.participants.map(id => id.toString()).includes(user._id);

  return (
    <div key={ride._id} style={styles.rideCard}>
      <h3>{ride.title}</h3>
      <p>{ride.start} → {ride.destination}</p>
      <p>{ride.date} at {ride.time}</p>
      <p> 👥 {ride.participants.length}</p>

      
      

      <button
        style={{ ...styles.actionBtn, background: hasJoined ? "#4caf50" : "#2196f3" }}
        onClick={async () => {
          const res = await API.put(`/rides/join/${ride._id}`, { userId: user._id });
          setRides(prev => prev.map(r => r._id === ride._id ? res.data : r));
        }}
      >
        {hasJoined ? "👥 Joined" : "Join"}
      </button>
     
      <button
                style={{ ...styles.actionBtn }}
                onClick={() => navigate("/ride", { state: ride })}
              >
                View Ride
              </button>
    </div>
  );
        })}
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    color: "white"
  },

  sidebar: {
    width: "250px",
    background: "rgba(0,0,0,0.4)",
    backdropFilter: "blur(10px)",
    padding: "30px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    borderRight: "1px solid rgba(255,255,255,0.1)"
  },

  logo: {
    marginBottom: "30px"
  },

  sideBtn: {
    padding: "10px",
    background: "rgba(255,255,255,0.08)",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer"
  },

  logoutBtn: {
    marginTop: "auto",
    padding: "10px",
    background: "#ff4b2b",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer"
  },

  content: {
    flex: 1,
    padding: "40px"
  },

  bikeInfo: {
    marginBottom: "30px",
    color: "#4CAF50"
  },

  statsContainer: {
    display: "flex",
    gap: "20px",
    marginTop: "30px"
  },

  statCard: {
    flex: 1,
    background: "rgba(255,255,255,0.08)",
    padding: "20px",
    borderRadius: "15px",
    border: "1px solid rgba(255,255,255,0.1)"
  },

  rideCard: {
    marginTop: "20px",
    padding: "20px",
    borderRadius: "15px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)"
  },

  actionBtn: {
    marginRight: "10px",
    marginTop: "10px",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "#ff416c",
    color: "white"
  }
};

export default Dashboard;
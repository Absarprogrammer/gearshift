import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

function RideDetails() {
  const location = useLocation();
  const rideData = location.state;

  const user = JSON.parse(localStorage.getItem("user"));

  const [restaurants, setRestaurants] = useState([]);
  const [services, setServices] = useState([]);

  if (!rideData) {
    return (
      <div style={styles.page}>
        <h2>No Ride Data Found 🚫</h2>
        <p>Please go back and create a ride first.</p>
      </div>
    );
  }

  const findNearby = () => {
    const dummyData = [
      // 🍴 Restaurants
      { name: "Highway Cafe", type: "Restaurant", distance: "1.2 km" },
      { name: "Biker's Dhaba", type: "Restaurant", distance: "2.5 km" },

      // 🛠 Service Centers
      { name: "Yamaha Authorized Service", type: "Service", brand: "Yamaha", distance: "3.1 km" },
      { name: "Honda Bike Service Hub", type: "Service", brand: "Honda", distance: "2.2 km" },
      { name: "Bajaj Service Center", type: "Service", brand: "Bajaj", distance: "1.8 km" },
      { name: "KTM Orange Service Hub", type: "Service", brand: "KTM", distance: "2.4 km" },
      { name: "BMW Motorrad Service", type: "Service", brand: "BMW", distance: "4.5 km" },
      { name: "Ducati Performance Center", type: "Service", brand: "Ducati", distance: "5.1 km" },
      { name: "Hero Bike Care", type: "Service", brand: "Hero", distance: "1.6 km" },
      { name: "Suzuki Two Wheeler Service", type: "Service", brand: "Suzuki", distance: "2.9 km" },
      { name: "TVS Authorized Service", type: "Service", brand: "TVS", distance: "3.3 km" },
      { name: "Royal Enfield Service Point", type: "Service", brand: "Royal Enfield", distance: "2.7 km" },
      { name: "Aprilia Service Center", type: "Service", brand: "Aprilia", distance: "4.0 km" },
      { name: "Kawasaki Service Hub", type: "Service", brand: "Kawasaki", distance: "3.8 km" },
      { name: "Triumph Service Center", type: "Service", brand: "Triumph", distance: "5.3 km" },
      { name: "Harley-Davidson Service", type: "Service", brand: "Harley-Davidson", distance: "4.7 km" },
      { name: "Jawa Service Center", type: "Service", brand: "Jawa", distance: "2.1 km" },

      { name: "Local Bike Mechanic", type: "Service", brand: "Universal", distance: "0.9 km" }
    ];

    // Restaurants (no filtering)
    const rest = dummyData.filter(item => item.type === "Restaurant");

    // 🔥 Filter services based on user's bike brand
    const serv = dummyData.filter(item =>
      item.type === "Service" &&
      (
        item.brand === "Universal" ||
        item.brand?.toLowerCase().trim() === user?.bikeBrand?.toLowerCase().trim()
      )
    );

    setRestaurants(rest);
    setServices(serv);
  };

  return (
    <>
    <Navbar />
    <div style={styles.page}>
      <div style={styles.container}>
      <h1>{rideData.title} 🏍️</h1>
      <p>Start: {rideData.start}</p>
      <p>Destination: {rideData.destination}</p>
      <p>Date: {rideData.date} at {rideData.time}</p>

      {user && (
        <p style={styles.bikeInfo}>
          Your Bike: {user.bikeBrand} {user.bikeModel}
        </p>
      )}

      <button style={styles.findBtn} onClick={findNearby}>
        🧭 Find Nearby
      </button>

      {restaurants.length > 0 && (
        <>
          <h2 style={styles.sectionTitle}>🍴 Restaurants</h2>
          {restaurants.map((place, index) => (
            <PlaceCard key={index} place={place} />
          ))}
        </>
      )}

      {services.length > 0 && (
        <>
          <h2 style={styles.sectionTitle}>🛠️ Service Centers</h2>
          {services.map((place, index) => (
            <PlaceCard key={index} place={place} />
          ))}
        </>
      )}
    </div></div>
    </>
  );
}

function PlaceCard({ place }) {
  return (
    <div style={styles.card}>
      <h3>{place.name}</h3>
      <p>Distance: {place.distance}</p>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button style={styles.mapBtn}>
          Open in Google Maps
        </button>
      </a>
    </div>
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
    maxWidth: "750px",
    background: "rgba(0,0,0,0.4)",
    backdropFilter: "blur(10px)",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
    color: "white"
  },

  bikeInfo: {
    marginTop: "10px",
    color: "#4CAF50",
    fontWeight: "bold"
  },

  findBtn: {
    padding: "12px 25px",
    backgroundColor: "#ff3c3c",
    border: "none",
    color: "white",
    cursor: "pointer",
    marginTop: "20px",
    borderRadius: "10px",
    fontWeight: "bold",
    transition: "0.3s"
  },

  sectionTitle: {
    marginTop: "35px",
    borderBottom: "1px solid rgba(255,255,255,0.2)",
    paddingBottom: "8px"
  },

  card: {
    background: "rgba(255,255,255,0.06)",
    padding: "20px",
    marginTop: "15px",
    borderRadius: "15px",
    border: "1px solid rgba(255,255,255,0.1)",
    transition: "0.3s"
  },

  mapBtn: {
    marginTop: "10px",
    padding: "8px 15px",
    backgroundColor: "#00c6FF",
    border: "none",
    color: "white",
    cursor: "pointer",
    borderRadius: "8px",
    fontWeight: "bold"
  }
};
export default RideDetails;
import { useEffect, useState } from "react";
import { fetchFlights } from "../api/flightAPI";
import FlightTable from "../components/FlightList";
import { Flight } from "../type";
import Navbar from "../components/Navbar";

const FlightBoard = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const loadFlights = async () => {
      try {
        const data = await fetchFlights();
        setFlights(data);
        setFilteredFlights(data);
      } catch (err) {
        setError("Error fetching flight data");
      }
    };

    loadFlights();
    const interval = setInterval(loadFlights, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (flightNumber: string) => {
    if (!flightNumber) {
      setFilteredFlights(flights);
    } else {
      const filtered = flights.filter((flight) =>
        flight.flightNumber.toLowerCase().includes(flightNumber.toLowerCase())
      );
      setFilteredFlights(filtered);
    }
  };

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  if (error) {
    return (
      <div
        className={`container mt-5 ${
          darkMode ? "bg-dark text-light" : "bg-light text-dark"
        }`}
      >
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`container mt-5 rounded-4 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
      style={{ minHeight: "100vh" }}
    >
      <Navbar
        onSearch={handleSearch}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <h1 className=" mb-4 px-3 pt-3 display-5">
            Flight Status...
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40px"
              viewBox="0 -960 960 960"
              width="40px"
              fill="#9b959d"
            >
              <path d="M394.33-117.67 298-298.33l-181.33-97 63-62.67 147 26.33L442-546.33 118.33-684l76-76.67L586.67-692l130-130q21.66-21.67 52.66-21.67 31 0 52.67 21.67t21.67 52.5q0 30.83-21.67 52.5L691.67-586.67l68.66 392L684-118.33 546-442 431.33-326.67l26 146-63 63Z" />
            </svg>
          </h1>
          <FlightTable flights={filteredFlights} darkMode={darkMode} />{" "}
        </div>
      </div>
    </div>
  );
};

export default FlightBoard;

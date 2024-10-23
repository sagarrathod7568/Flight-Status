import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFlightDetails } from "../api/flightAPI";
import { FlightDetail } from "../type";
import Navbar from "../components/Navbar";

const FlightDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [flight, setFlight] = useState<FlightDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFlight = async () => {
      try {
        const data = await fetchFlightDetails(id!);
        setFlight(data);
      } catch (err) {
        setError("Error fetching flight details");
      }
    };

    loadFlight();
  }, [id]);

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return flight ? (
    <div className="container mt-5">
    <Navbar/>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4 text-center">
            Flight {flight.flightNumber} Details
          </h2>
          <p>
            <strong>Airline:</strong> {flight.airline}
          </p>
          <p>
            <strong>Origin:</strong> {flight.origin}
          </p>
          <p>
            <strong>Destination:</strong> {flight.destination}
          </p>
          <p>
            <strong>Departure Time:</strong>{" "}
            {new Date(flight.departureTime).toLocaleString()}
          </p>
          <p>
            <strong>Arrival Time:</strong>{" "}
            {new Date(flight.arrivalTime).toLocaleString()}
          </p>
          <p>
            <strong>Status:</strong> {flight.status}
          </p>

          {flight.delayInfo && (
            <p className="text-danger">
              <strong>Delay Info:</strong> {flight.delayInfo}
            </p>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="container mt-5">
      <div className="d-flex justify-content-center align-items-center ">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailPage;

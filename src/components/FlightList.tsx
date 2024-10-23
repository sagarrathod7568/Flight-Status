import React from "react";
import { Flight } from "../type";
import FlightRow from "./FlightRow";
import "bootstrap/dist/css/bootstrap.min.css";

interface FlightTableProps {
  flights: Flight[];
  darkMode: boolean;
}

const FlightTable: React.FC<FlightTableProps> = ({ flights, darkMode }) => {
  return (
    <div
      className={`container ${
        darkMode ? "bg-dark text-light  " : "bg-light text-dark"
      }`}
      style={{ minHeight: "100vh" }}
    >
      <div className="table-responsive ">
        <table
          className={`table table-striped table-hover ${
            darkMode ? "table-dark" : "table-light"
          }`}
        >
          <thead className={darkMode ? "thead-dark" : "thead-light"}>
            <tr>
              <th>Flight Number</th>
              <th>Airline</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Departure Time</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <FlightRow key={flight.id} flight={flight} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlightTable;

import React from "react";
import { Flight } from "../type";
import { Link } from "react-router-dom";

interface FlightRowProps {
  flight: Flight;
}

const FlightRow: React.FC<FlightRowProps> = ({ flight }) => {
  return (
    <tr className="border border-dark ">
      <td>{flight.flightNumber}</td>
      <td>{flight.airline}</td>
      <td>{flight.origin}</td>
      <td>{flight.destination}</td>
      <td>{new Date(flight.departureTime).toLocaleTimeString()}</td>
      <td>{flight.status}</td>
      <td className=" ">
        <Link className="text-decoration-none" to={`/flight/${flight.id}`}>
          See Details
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#9b959d"
          >
            <path d="m240-408 79-192h-99l-52 72H96l48-132-48-132h72l52 72h89l-69-168h72l125 168h151q25 0 42.5 17.5T648-660q0 25-17.5 42.5T588-600H455L312-408h-72ZM624-72 516-240H372q-25 0-42.5-17.5T312-300q0-25 17.5-42.5T372-360h128l124-192h72l-60 192h104l52-72h72l-48 132 48 132h-72l-52-72h-96l52 168h-72Z" />
          </svg>
        </Link>
      </td>
    </tr>
  );
};

export default FlightRow;

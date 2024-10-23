import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/flight.jpg";
import "./Navbar.css";

const Navbar: React.FC<{
  onSearch: (flightNumber: string) => void;
  darkMode: boolean;
  toggleTheme: () => void;
}> = ({ onSearch, darkMode, toggleTheme }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
    setSearchTerm("");
    navigate(`/search?flightNumber=${searchTerm}`);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      } shadow-sm fixed-top`}
    >
      <div className="container justify-content-between">
        <a className="navbar-brand" href="/">
          <img
            className="rounded-circle"
            src={logo}
            alt="Logo"
            width="50"
            height="50"
          />
        </a>
        <form className="d-flex flex-grow-1" onSubmit={handleSearch}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search Flight Number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="btn btn-outline-success bg-success text-light"
            type="submit"
          >
            Search
          </button>
        </form>
        <button
          className="btn btn-outline-secondary ms-2 bg-text-body-tertiary"
          onClick={toggleTheme}
        >
          {darkMode ? (
            <span className="bi bi-sun"></span>
          ) : (
            <span className="bi bi-moon-fill"></span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

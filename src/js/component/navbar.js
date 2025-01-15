import React from "react";
import { Link } from "react-router-dom";

export const Navbar = ({ favorites = [], removeFavorite }) => {
  return (
    <nav className="navbar bg-dark text-light px-3">
      <Link to="/" className="navbar-brand text-light">
        Star Wars Blog
      </Link>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="favoritesDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Favorites ({favorites.length})
        </button>
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="favoritesDropdown">
          {favorites.length === 0 ? (
            <li className="dropdown-item text-muted">No favorites added</li>
          ) : (
            favorites.map((fav, index) => (
              <li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
                <Link
                  to={`/info${fav.type.toLowerCase()}/${fav.uid}`} 
                  className="text-decoration-none"
                >
                  {fav.name} ({fav.type})
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFavorite(fav)}
                >
                  Remove
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </nav>
  );
};

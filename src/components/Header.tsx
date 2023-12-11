import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Pink Penguin Studio
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/pages/MainPage" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/pages/ColorModelsPage" className="nav-link">
                  Color Models
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/pages/AffinePage" className="nav-link">
                  Affine Transformation
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  to="#"
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Fractals
                </Link>
                <ul
                  className="dropdown-menu dropdown-menu-dark"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <Link
                      to="/pages/HFractalPage"
                      className="dropdown-item text-white"
                    >
                      H fractal
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/pages/JuliaFractalPage"
                      className="dropdown-item text-white"
                    >
                      Julia fractal
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <Link
                  to="#"
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Learn more
                </Link>
                <ul
                  className="dropdown-menu dropdown-menu-dark"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <Link
                      to="/pages/LearnFractalsPage"
                      className="dropdown-item text-white"
                    >
                      Fractals
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/pages/LearnColorsPage"
                      className="dropdown-item text-white"
                    >
                      Color models
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/pages/LearnAffinePage"
                      className="dropdown-item text-white"
                    >
                      Affine
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

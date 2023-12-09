export default function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand">Pink Penguin Studio</a>
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
                <a className="nav-link" href="/pages/MainPage">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/pages/ColorModelsPage">
                  Color Models
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/pages/AffinePage">
                  Affine Transformation
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Fractals
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-dark"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <a
                      className="dropdown-item text-white"
                      href="/pages/HFractalPage"
                    >
                      H fraction
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item text-white"
                      href="/pages/JuliaFractalPage"
                    >
                      Julia fraction
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Learn more
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-dark"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <a
                      className="dropdown-item text-white"
                      href="/pages/LearnFractalsPage"
                    >
                      Fractals
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item text-white"
                      href="/pages/LearnColorsPage"
                    >
                      Color models
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item text-white"
                      href="/pages/LearnAffinePage"
                    >
                      Affine
                    </a>
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

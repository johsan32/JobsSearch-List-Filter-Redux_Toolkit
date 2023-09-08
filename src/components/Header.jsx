import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <img src="./picture/logo.png" alt="" style={{ width: "150px" }} />
      </Link>
      <div className="nav">
        <NavLink to="/add_job">
          <div className="nav-title">
            <img src="/picture/paper.png" alt="" />
            <p>Add Job</p>
          </div>{" "}
        </NavLink>
        <NavLink to="/">
          <div className="nav-title">
            <img src="/picture/list.png" alt="" />
            <p>Jobs List</p>
          </div>{" "}
        </NavLink>
        <NavLink to="/favorite">
          <div className="nav-title">
            <img src="/picture/favorites.png" alt="" />
            <p>Favorites</p>
          </div>{" "}
        </NavLink>
        <NavLink to="/apply">
          <div className="nav-title">
            <img src="/picture/accept.png" alt="" />
            <p>Apply</p>
          </div>{" "}
        </NavLink>
      </div>
    </header>
  );
};

export default Header;

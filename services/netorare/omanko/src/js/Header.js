import logo from "../assets/logo.png";
import "../css/Header.scss";
import { useLocation, Link } from "react-router-dom";

function Header() {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  return (
    <div className="Header">
      <div className="HeaderContainer">
        <img className="Logo" src={logo} />
        <div className="Right">
          {query.get("username") == "pwner" && (
            <>
            <div className="Username">Welcome pwner</div>
            <Link
              to={{
                pathname: "/form?username=pwner",
              }}
            >
              <button className="Button">Create New Exploit</button>
            </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;

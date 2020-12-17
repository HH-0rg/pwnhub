import "../css/Login.scss";
import img from "../assets/login.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [usernameInput, setUsernameInput] = useState("");
  return (
    <div className="Login">
      <div className="Text">
        <img src={img}></img>
        
      </div>
      <div className="Form">
        <div className="Title">Login</div>
        <div className="Subtitle">Access your Pwner/Corporate Account here</div>
        <form>
          <input
            type="text"
            id="username"
            value={usernameInput}
            onChange={e => setUsernameInput(e.target.value)}
            placeholder="Username"
          />
          <input type="password" placeholder="Password" />
          <div className="Buttons">
            <Link
              id="LoginButton"
              to={{
                pathname: "/home?username="+usernameInput,
              }}
            >
              Log In
            </Link>
            <div className="Signup">
              Or&ensp;
              <span className="SignupLink">Sign Up</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

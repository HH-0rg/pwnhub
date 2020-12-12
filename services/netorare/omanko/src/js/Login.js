import logo from "../assets/logo.png";
import "../css/Login.scss";

function Login() {
  return (
    <div className="Login">
      <div className="Text">
        Welcome back Pwner
        <br />
        Get ready to Pwn
      </div>
      <div className="Form">
        <div className="Title">Login</div>
        <div className="Subtitle">Access your Pwner/Corporate Account here</div>
        <form>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <div className="Buttons">
            <button>Log In</button>
            <div className="Signup">
              Or&ensp;
              <span className="SignupLink">
                Sign Up
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

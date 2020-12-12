import logo from '../assets/logo.png';
import '../css/Header.scss';

function Header() {
  return (
    <div className="Header">
      <img className="Logo" src={logo} />
    </div>
  );
}

export default Header;

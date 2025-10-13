import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/orders" className="nav-link">
          Orders
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
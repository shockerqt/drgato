import { NavLink, Outlet } from 'react-router-dom';
import { Constraints } from '../App';

import { Logo } from '../utils/icons';
import SearchBar from '../components/SearchBar';
import './Layout.scss';

const Layout = ({ constraints }: { constraints: Constraints }) => {

  return (
    <div className="layout">

      <nav className="navbar">

        <NavLink className="navbar-home" to="/">
          <Logo className="navbar-drgato-logo" />
        </NavLink>

        <NavLink className="navbar-categories" to="/remedios">
          <span className="navbar-categories-text">Cat</span>
          <span className="navbar-categories-text-decoration">egorías</span>
        </NavLink>

        <SearchBar className="navbar-searchbar" />

      </nav>

      <Outlet />

    </div>
  );
};

export default Layout;

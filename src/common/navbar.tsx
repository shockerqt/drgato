import '../styles/navbar.scss';

import {
  Logo,
  MenuIcon,
  SearchIcon,
} from '.';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <Logo className="navbar-logo" />
      <SearchIcon />
      <MenuIcon />
    </nav>
  );
};
